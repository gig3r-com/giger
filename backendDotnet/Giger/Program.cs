using Giger;
using Giger.Connections.Handlers;
using Giger.Connections.SocketsManagment;
using Giger.Controllers;
using System.Net;
using Giger.Services.Extensions;
using Microsoft.EntityFrameworkCore;
using Giger.Services;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(config =>
{
    config.OperationFilter<SwaggerHeaderFilter>();
});

builder.Services.AddMvc().AddControllersAsServices();

builder.Services.AddDbContext<GigerDbContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
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

    if (!db.Users.Any())
    {
        var seedPath = Path.Combine(AppContext.BaseDirectory, "seed-data.sql");
        if (!File.Exists(seedPath))
            seedPath = "/app/seed-data.sql";
        if (File.Exists(seedPath))
        {
            Console.WriteLine("Database is empty, seeding data from " + seedPath);
            var sql = File.ReadAllText(seedPath);
            db.Database.ExecuteSqlRaw(sql);
            Console.WriteLine("Database seeded successfully.");
        }
        else
        {
            Console.WriteLine("Database is empty but no seed file found.");
        }
    }
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
