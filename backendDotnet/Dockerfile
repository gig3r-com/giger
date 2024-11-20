FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine3.20 AS base
WORKDIR /app
EXPOSE 80

FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:8.0-alpine3.20 AS build

ARG TARGETPLATFORM
ARG TARGETOS
ARG TARGETARCH
ARG TARGETVARIANT
ARG BUILDPLATFORM
ARG BUILDOS
ARG BUILDARCH
ARG BUILDVARIANT

RUN echo "Building on $BUILDPLATFORM, targeting $TARGETPLATFORM"
RUN echo "Building on ${BUILDOS} and ${BUILDARCH} with optional variant ${BUILDVARIANT}"
RUN echo "Targeting ${TARGETOS} and ${TARGETARCH} with optional variant ${TARGETVARIANT}"

ARG ASPNETCORE_CONFIGURATION=Release
WORKDIR /src
COPY ["Giger.csproj", ""]
RUN dotnet restore -a $TARGETARCH "./Giger.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "Giger.csproj" -c $ASPNETCORE_CONFIGURATION -o /app/build

FROM build AS publish
RUN dotnet publish -a $TARGETARCH "Giger.csproj" -c $ASPNETCORE_CONFIGURATION -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Giger.dll"]
