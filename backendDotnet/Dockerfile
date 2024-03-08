FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine3.19 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0-alpine3.19 AS build
WORKDIR /src
COPY ["Giger.csproj", ""]
RUN dotnet restore "./Giger.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "Giger.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Giger.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Giger.dll"]
