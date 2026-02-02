using Giger;
using Giger.Connections.Handlers;
using Giger.Connections.SocketsManagment;
using Giger.Models;
using Giger.Controllers;
using System.Net;
using Giger.Services.Extensions;
using Microsoft.EntityFrameworkCore;
using Giger.Services;
using Giger.Data;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
    });
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(config =>
{
    config.OperationFilter<SwaggerHeaderFilter>();
});

builder.Services.Configure<GigerDbSettings>(builder.Configuration.GetSection("GigerDb"));
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

// Apply migrations automatically on startup with retry logic
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<GigerDbContext>();
    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
    
    var maxRetries = 15;
    var delay = TimeSpan.FromSeconds(5);
    
    for (int i = 0; i < maxRetries; i++)
    {
        try
        {
            logger.LogInformation($"Attempting to connect to database (attempt {i + 1}/{maxRetries})...");
            
            // Use EnsureCreated to create database schema automatically
            // This creates all tables based on the DbContext model
            dbContext.Database.EnsureCreated();
            logger.LogInformation("Database schema created successfully.");
            
            // Skip automatic seeding - data will be loaded via API
            logger.LogInformation("Automatic data seeding disabled. Use /api/DataLoad endpoints to load data.");
            break; // Success, exit retry loop
        }
        catch (Exception ex) when (i < maxRetries - 1)
        {
            logger.LogWarning(ex, $"Failed to connect to database. Retrying in {delay.TotalSeconds} seconds...");
            Thread.Sleep(delay);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "An error occurred while creating the database after all retries.");
            throw;
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
