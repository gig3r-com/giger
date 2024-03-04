using Giger.Connections.Handlers;
using Giger.Connections.SocketsManagment;
using Giger.Models;
using Giger.Services;
using System.Diagnostics;
using System.Net;
using System.Net.WebSockets;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.Configure<GigerDbSettings>(builder.Configuration.GetSection("GigerDb"));
builder.Services.AddSingleton<UserService>();
builder.Services.AddSingleton<GigService>();
builder.Services.AddSingleton<AccountService>();
builder.Services.AddSingleton<TransactionService>();
builder.Services.AddSingleton<ConversationService>();
builder.Services.AddSingleton<EventService>();



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
