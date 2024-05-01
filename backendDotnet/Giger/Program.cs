using Giger;
using Giger.Connections.Handlers;
using Giger.Connections.SocketsManagment;
using Giger.Models;
using Giger.Controllers;
using System.Net;
using Giger.Services.Extensions;

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

builder.Services.Configure<GigerDbSettings>(builder.Configuration.GetSection("GigerDb"));
builder.Services.AddMvc().AddControllersAsServices();
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

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

var webSocketOptions = new WebSocketOptions() { KeepAliveInterval = TimeSpan.FromSeconds(120) };
app.UseWebSockets(webSocketOptions);
app.MapSockets("/ws", app.Services.GetService<WebSocketsMessageHandler>());
app.UseStaticFiles();
app.UseCors(MyAllowSpecificOrigins);
app.MapControllers();
app.UseAuthorization();

app.Use(async (context, next) =>
{
#if DEBUG
    if (!AuthController.AuthEnabled)
    {
        await next();
        return;
    }
#endif

    if (context.Request.Path.StartsWithSegments("/api/Login"))
    {
        await next();
        return;
    }

    if (context.Request.Headers.TryGetValue("AuthToken", out var authTokenString))
    {
        await next();
        return;
    }

    context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
    await context.Response.WriteAsync("Unauthorized. Please login.");
});

app.Run();
