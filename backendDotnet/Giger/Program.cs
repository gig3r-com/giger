using Giger;
using Giger.Connections.Handlers;
using Giger.Connections.SocketsManagment;
using Giger.Controllers;
using Giger.Converters;
using System.Net;
using Giger.Services.Extensions;
using Microsoft.EntityFrameworkCore;
using Giger.Services;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        // Convert null strings to empty strings in API responses
        options.JsonSerializerOptions.Converters.Add(new NullToEmptyStringConverter());
    });
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(config =>
{
    config.OperationFilter<SwaggerHeaderFilter>();
});

builder.Services.AddMvc().AddControllersAsServices();

// Build connection string from environment variables if provided, otherwise use appsettings.json
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
var dbHost = builder.Configuration["GigerDB:Host"];
if (!string.IsNullOrEmpty(dbHost))
{
    var dbPort = builder.Configuration["GigerDB:Port"] ?? "5432";
    var dbName = builder.Configuration["GigerDB:DatabaseName"] ?? "giger";
    var dbUser = builder.Configuration["GigerDB:Username"] ?? "giger";
    var dbPassword = builder.Configuration["GigerDB:Password"] ?? "giger";
    connectionString = $"Host={dbHost};Port={dbPort};Database={dbName};Username={dbUser};Password={dbPassword};";
    Console.WriteLine($"Using connection string from environment: Host={dbHost}, Database={dbName}");
}

// Configure Npgsql data source with JSON support
var dataSourceBuilder = new Npgsql.NpgsqlDataSourceBuilder(connectionString);
dataSourceBuilder.EnableDynamicJson();  // Required for Dictionary<string, string> in EF Core 9
var dataSource = dataSourceBuilder.Build();

builder.Services.AddDbContext<GigerDbContext>(options => options.UseNpgsql(dataSource));
builder.Services.AddDbServices();

builder.Services.AddWebSocketManager();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                      });
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<GigerDbContext>();
    db.Database.EnsureCreated();
    
    // Note: Database seeding is handled by PostgreSQL itself via docker-entrypoint-initdb.d
    // The seed files are automatically executed when the postgres container initializes
    // No need to manually seed here as it would cause duplicate key violations
    
    var usersCount = await db.Users.CountAsync();
    var gigsCount = await db.Gigs.CountAsync();
    Console.WriteLine($"Database ready. Contains {usersCount} users and {gigsCount} gigs.");
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

var webSocketOptions = new WebSocketOptions() { KeepAliveInterval = TimeSpan.FromSeconds(120) };
app.UseWebSockets(webSocketOptions);
app.MapSockets("/ws1337", app.Services.GetService<ConversationMessageHandler>());
app.MapSockets("/ws2137", app.Services.GetService<NotificationsSocketHandler>());
app.UseStaticFiles();
app.UseCors(MyAllowSpecificOrigins);
app.MapControllers();

app.Use(async (context, next) =>
{
#if DEBUG
    if (!AuthController.AuthEnabled)
    {
        await next();
        return;
    }
#endif

    if (context.Request.Headers.TryGetValue("AuthToken", out var authTokenString))
    {
        await next();
        return;
    }

    if (context.Request.Path.StartsWithSegments("/api/Login"))
    {
        await next();
        return;
    }
    

    if (context.Request.Path.StartsWithSegments("/api/HealthCheck"))
    {
        await next();
        return;
    }

    context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
    await context.Response.WriteAsync("Unauthorized. Please login.");
});

app.Run();
