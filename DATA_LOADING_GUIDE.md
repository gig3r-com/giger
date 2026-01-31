# Data Loading Guide 📊

## Overview

The backend **automatically loads data from JSON files** on first startup. This guide explains how data loading works and how to control it.

## 🚀 Quick Start

### First Time Setup
```bash
# Just start docker-compose - data loads automatically!
docker-compose up -d

# Wait 30 seconds for data to load
sleep 30

# Check what was loaded
./check-data.sh
```

### Reload Data (Development)
```bash
# Option 1: Use the helper script
./reload-data.sh

# Option 2: Manual reload
FORCE_DATA_RELOAD=true docker-compose up -d --force-recreate backend

# Option 3: Complete fresh start
./fresh-start.sh
```

## 📁 Data Files Location

JSON files are loaded from: `data/mongo/`

Supported files:
- ✅ **Auths.json** (31KB) - Authentication credentials
- ✅ **Networks.json** (2.1KB) - Network definitions
- ✅ **Subnetworks.json** (11KB) - Subnetwork configurations  
- ✅ **HackConfigs.json** (233KB) - Hacking configurations
- ✅ **ProgramCodesMap.json** (12KB) - Program code mappings
- ✅ **ObscuredCodesMap.json** (96KB) - Obscured code mappings
- ✅ **Accounts.json** (191KB) - Bank accounts
- ✅ **Logs.json** (460B) - System logs
- ✅ **Conversations.json** (1.2MB) - Chat conversations
- ✅ **Gigs.json** (223KB) - Available gigs
- ✅ **Anonymized.json** (131B) - Anonymized users
- ⏸️  **Users.json** (2.2MB) - User profiles (commented out - needs special handling)
- ⏸️  **GigerConfig.json** (115B) - System config (not yet implemented)
- ⏸️  **Implants.json** (4.9KB) - Implants (not yet implemented)

## 🎯 How It Works

### On Startup

1. Backend starts and connects to PostgreSQL
2. Creates database schema automatically (EF Core)
3. Checks if data already exists
4. If database is empty:
   - Reads JSON files from `/data` directory
   - Converts MongoDB format (`_id` → `Id`)
   - Loads data into PostgreSQL tables
   - Logs summary of loaded records

### Data Loading Logic

```csharp
// Check if data exists
if (context.Auths.Any()) {
    // Skip loading
    return;
}

// Load from JSON files
JsonDataLoader.LoadFromJsonFiles(context, logger, "/data");
```

## 🔄 Reloading Data

### Method 1: Environment Variable (Recommended)

Set `FORCE_DATA_RELOAD=true` to clear and reload data:

```bash
FORCE_DATA_RELOAD=true docker-compose up -d --force-recreate backend
```

This will:
1. Truncate all data tables
2. Reload from JSON files
3. Log the reload process

### Method 2: Helper Script

```bash
./reload-data.sh
```

Automatically handles the reload and shows results.

### Method 3: Fresh Start

For a completely clean slate:

```bash
./fresh-start.sh
```

This removes database volumes and rebuilds everything.

### Method 4: Manual Database Reset

```bash
# Connect to database
docker exec -it giger-postgres-1 psql -U giger -d giger

# Clear specific tables
TRUNCATE TABLE "Auths", "Accounts", "Networks" CASCADE;

# Or drop and recreate database
DROP DATABASE giger;
CREATE DATABASE giger;

# Then restart backend
docker-compose restart backend
```

## 📊 Checking Data

### Quick Check

```bash
./check-data.sh
```

Shows counts for all tables and sample data.

### Manual Queries

```bash
# Connect to database
docker exec -it giger-postgres-1 psql -U giger -d giger

# Count records
SELECT COUNT(*) FROM "Auths";

# View sample data
SELECT * FROM "Auths" LIMIT 5;

# Get all table counts
SELECT 
    'Auths' as table, COUNT(*) as count FROM "Auths"
UNION ALL SELECT 'Networks', COUNT(*) FROM "Networks"
UNION ALL SELECT 'Gigs', COUNT(*) FROM "Gigs";
```

### Check Logs

```bash
# See data loading logs
docker-compose logs backend | grep -E "Loading|Successfully|Data loaded"

# Real-time log watching
docker-compose logs -f backend
```

## 🔧 Helper Scripts

Three scripts are provided in the project root:

### `check-data.sh`
Shows what data is currently in the database.

```bash
./check-data.sh
```

**Output:**
- Table record counts
- Sample auth users
- Summary statistics

### `reload-data.sh`
Reloads data from JSON files.

```bash
./reload-data.sh
```

**What it does:**
- Sets FORCE_DATA_RELOAD=true
- Restarts backend
- Waits for reload
- Shows results

### `fresh-start.sh`  
Complete fresh start (⚠️ destructive).

```bash
./fresh-start.sh
```

**What it does:**
- Stops all containers
- Removes database volumes
- Rebuilds backend
- Loads fresh data

## 🎛️ Environment Variables

Configure data loading behavior in `docker-compose.yaml`:

```yaml
environment:
  # Force reload on every startup
  - FORCE_DATA_RELOAD=false  # Set to 'true' to reload
  
  # Database connection
  - ConnectionStrings__DefaultConnection=Host=postgres;Port=5432;...
```

You can also set via `.env` file:

```bash
# .env file
FORCE_DATA_RELOAD=false
```

## 🐛 Troubleshooting

### No Data Loaded

**Symptoms:** Tables are empty after startup

**Solutions:**
1. Check data volume is mounted:
   ```bash
   docker exec giger-backend-1 ls -la /data/
   ```

2. Check JSON files exist:
   ```bash
   ls -lh data/mongo/*.json
   ```

3. Check backend logs:
   ```bash
   docker-compose logs backend | grep "Loading data"
   ```

4. Ensure data submodule is initialized:
   ```bash
   git submodule update --init
   ```

### Data Doesn't Reload

**Symptoms:** Old data persists after changes

**Solution:**
```bash
# Force reload
FORCE_DATA_RELOAD=true docker-compose up -d --force-recreate backend

# Or use fresh start
./fresh-start.sh
```

### Backend Won't Start

**Symptoms:** Backend keeps restarting

**Solutions:**
1. Check PostgreSQL is healthy:
   ```bash
   docker ps | grep postgres
   ```

2. Check connection logs:
   ```bash
   docker logs giger-backend-1
   ```

3. Verify connection string in appsettings.json

### Partial Data Load

**Symptoms:** Some tables have data, others don't

**Reasons:**
- JSON file errors (check logs)
- Foreign key constraints
- Data format issues

**Solution:**
```bash
# Check specific file loading errors
docker-compose logs backend | grep "Error loading"

# Try loading in correct order (already implemented)
```

## 📝 Adding New Data Files

To load additional JSON files:

1. Add file to `data/mongo/` directory
2. Update `JsonDataLoader.cs`:

```csharp
LoadJsonFile<YourModel>(context, logger, Path.Combine(dataPath, "YourFile.json"),
    context.YourDbSet, options);
```

3. Ensure model has `Id` property
4. Reload data

## 🔒 Production Considerations

### Security
- Change default passwords
- Use proper password hashing (bcrypt/argon2)
- Don't commit sensitive data to git

### Performance
- Data loading happens synchronously on startup
- Large files (Users.json = 2.2MB) may need batching
- Consider indexes for frequently queried fields

### Reliability
- Implement data validation
- Add error recovery
- Log detailed statistics

### Automation
- Set `FORCE_DATA_RELOAD=false` in production
- Use database backups instead of JSON reloads
- Implement proper migrations for schema changes

## 📚 Additional Resources

- [Entity Framework Core Documentation](https://docs.microsoft.com/en-us/ef/core/)
- [PostgreSQL Docker Hub](https://hub.docker.com/_/postgres)
- [Npgsql Documentation](https://www.npgsql.org/doc/)

## ✅ Success Checklist

- [ ] Data submodule initialized (`git submodule update --init`)
- [ ] JSON files exist in `data/mongo/`
- [ ] Docker Compose running (`docker-compose up -d`)
- [ ] Backend started successfully (check logs)
- [ ] Tables created (17 tables)
- [ ] Data loaded (check with `./check-data.sh`)
- [ ] Sample queries work

## 🎉 Expected Results

After successful startup, you should see:

```bash
$ ./check-data.sh

📋 Table Counts:

table_name       | count
-----------------+-------
Accounts         |     0
AnonymizedUsers  |     0
Auths            |   195
Conversations    |     0
Gigs             |     0
HackConfig       |     0
Logs             |     0
Messages         |     0
Networks         |     7
ObscuredCodesMap |     0
ProgramCodes     |     0
Subnetworks      |     0
Transactions     |     0
UsersPublic      |     0
```

(Exact counts depend on your JSON files)
