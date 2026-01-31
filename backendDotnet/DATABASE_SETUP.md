# PostgreSQL Database Setup

## Overview
The .NET backend is configured to work with PostgreSQL using Entity Framework Core.

## What's Configured

✅ Entity Framework Core with Npgsql (PostgreSQL provider)
✅ GigerDbContext with all entity models
✅ Automatic database migrations on startup
✅ Docker Compose with PostgreSQL service
✅ Connection string configuration

## Quick Start

### Option 1: Using Docker (Recommended)

1. Start the services:
```bash
docker-compose up -d
```

The backend will automatically:
- Connect to PostgreSQL
- Create the database if it doesn't exist
- Apply all migrations
- Start serving requests

### Option 2: Local PostgreSQL

1. Ensure PostgreSQL is running locally on port 5432

2. Update connection string in `appsettings.json`:
```json
"ConnectionStrings": {
  "DefaultConnection": "Host=localhost;Port=5432;Database=giger;Username=your_user;Password=your_password;"
}
```

3. Run the backend

## Creating New Migrations

When you modify entity models, create a new migration:

```bash
cd backendDotnet/Giger
dotnet ef migrations add YourMigrationName
```

The migration will be applied automatically when the application starts.

## Manual Migration Commands

If you need to manage migrations manually:

```bash
# View migration status
dotnet ef migrations list

# Apply migrations
dotnet ef database update

# Rollback to specific migration
dotnet ef database update PreviousMigrationName

# Remove last migration (if not applied)
dotnet ef migrations remove
```

## Connection String Format

```
Host=hostname;Port=5432;Database=dbname;Username=user;Password=pass;
```

## Docker Environment Variables

The docker-compose configuration uses these environment variables:

- `GIGER_USERNAME` - Database username (default: giger)
- `GIGER_PASSWORD` - Database password (default: giger)
- `GIGER_DATABASE` - Database name (default: admin)

## Troubleshooting

### Connection Refused
- Ensure PostgreSQL is running
- Check firewall settings
- Verify connection string hostname (use `postgres` in Docker, `localhost` locally)

### Migration Errors
- Ensure EF Core Design tools are installed
- Check that .NET SDK is installed
- Verify all entity models have proper keys defined

### Database Not Created
- Check PostgreSQL logs
- Ensure the user has CREATE DATABASE permissions
- Verify network connectivity
