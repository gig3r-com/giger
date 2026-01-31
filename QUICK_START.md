# Quick Start Guide - Data Loading 🚀

## TL;DR

```bash
# Start everything (data loads automatically on first startup)
docker-compose up -d

# Check what was loaded
./check-data.sh

# Reload data (development)
./reload-data.sh

# Complete fresh start
./fresh-start.sh
```

## What Happens Automatically

✅ **On first `docker-compose up`:**
1. PostgreSQL starts
2. Backend connects (with 15 retries if needed)
3. Database schema auto-created (17 tables)
4. JSON files loaded from `data/mongo/`
5. ~195 auth records + networks, etc. imported

✅ **Data is loaded ONCE per database**
- Won't reload on restart (data persists)
- Set `FORCE_DATA_RELOAD=true` to reload

## Data Files (Auto-Loaded)

From `data/mongo/`:
- ✅ Auths.json → 195 records
- ✅ Networks.json → 7 networks  
- ✅ Subnetworks.json
- ✅ HackConfigs.json
- ✅ ProgramCodesMap.json
- ✅ ObscuredCodesMap.json
- ✅ Accounts.json
- ✅ Logs.json
- ✅ Conversations.json (1.2MB)
- ✅ Gigs.json
- ✅ Anonymized.json

## Helper Scripts

### `check-data.sh` - See what's loaded
```bash
./check-data.sh
```
Shows table counts and sample data.

### `reload-data.sh` - Reload from JSON
```bash
./reload-data.sh
```
Clears and reloads all data.

### `fresh-start.sh` - Complete reset
```bash
./fresh-start.sh
```
⚠️ Removes everything and starts fresh.

## Manual Control

### Reload Data
```bash
FORCE_DATA_RELOAD=true docker-compose up -d --force-recreate backend
```

### Check Database
```bash
# Connect to DB
docker exec -it giger-postgres-1 psql -U giger -d giger

# Count records
SELECT COUNT(*) FROM "Auths";

# View data
SELECT * FROM "Auths" LIMIT 5;
```

### View Logs
```bash
# See data loading
docker-compose logs backend | grep Loading

# Watch live
docker-compose logs -f backend
```

## Environment Variables

In `docker-compose.yaml`:
```yaml
environment:
  - FORCE_DATA_RELOAD=false  # Set to 'true' to reload every time
```

Or create `.env` file:
```bash
FORCE_DATA_RELOAD=false
```

## Troubleshooting

### No data loaded?
```bash
# Check data files exist
ls -lh data/mongo/

# Check volume is mounted
docker exec giger-backend-1 ls /data/

# Check logs
docker-compose logs backend | grep "Loading data"
```

### Want to reload?
```bash
./reload-data.sh
```

### Start fresh?
```bash
./fresh-start.sh
```

## Full Documentation

See `DATA_LOADING_GUIDE.md` for complete details.
