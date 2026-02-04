# Automatic Data Loading with Docker Compose

## Overview

The data loader is a separate container that automatically loads initial data into the database on startup. It runs once, loads all data via the API, and then exits.

## Quick Start

### Option 1: With Auto-Load (Recommended for Development)

Start services with automatic data loading:

```bash
# Using profile
docker-compose --profile auto-load up -d

# Or set environment variable
AUTO_LOAD_DATA=true docker-compose --profile auto-load up -d
```

The data-loader container will:
1. Wait for backend to be ready
2. Load all data files in the correct order
3. Exit when complete

### Option 2: Without Auto-Load (Production/Manual Control)

Start services normally:

```bash
docker-compose up -d
```

Then load data manually when needed:

```bash
./scripts/load-data.sh
```

## Configuration

### Environment Variables

Create a `.env` file (copy from `.env.example`):

```bash
# Enable/disable auto-load
AUTO_LOAD_DATA=true

# Data loading API credentials
DATALOAD_USERNAME=admin
DATALOAD_PASSWORD=changeme

# Database password
POSTGRES_PASSWORD=giger123
```

### How It Works

1. **data-loader service**: 
   - Lightweight Alpine Linux container with curl and jq
   - Mounts data files from `./data/mongo`
   - Runs the `load-on-startup.sh` script
   - Uses the same API as manual loading (`load-data.sh`)

2. **Profile-based activation**:
   - Service uses `profiles: [auto-load]`
   - Only starts when `--profile auto-load` is specified
   - This prevents accidental data reloading in production

3. **One-time execution**:
   - `restart: "no"` ensures it only runs once
   - Container exits after loading is complete
   - Check logs with: `docker-compose logs data-loader`

## Checking Data Loader Status

```bash
# View data loader logs
docker-compose logs data-loader

# Follow logs in real-time
docker-compose logs -f data-loader

# Check if data loaded successfully
docker-compose logs data-loader | grep "✓"
```

Expected output:
```
✓ Backend is ready!
[INFO] ✓ Loaded 195 auths
[INFO] ✓ Loaded 196 users
[INFO] ✓ Loaded 225 accounts
...
✓ Data loader container finished successfully
```

## Troubleshooting

### Data Loader Fails to Start

If the container exits immediately:

```bash
# Check logs
docker-compose logs data-loader

# Verify environment variables
docker-compose config | grep -A 5 data-loader

# Ensure profile is active
docker-compose --profile auto-load ps
```

### Backend Not Ready

If "Waiting for backend..." times out:

```bash
# Check backend status
docker-compose logs backend

# Restart services
docker-compose restart backend
sleep 10
docker-compose restart data-loader
```

### Authentication Fails

If you see "authentication failed" errors:

```bash
# Verify credentials match between services
docker-compose exec backend env | grep DataLoad
docker-compose logs data-loader | grep AUTH
```

### Data Already Exists

The loader skips existing data:
- Existing records are not duplicated
- Only new records are inserted
- Check output: `[INFO] ✓ Loaded 0 auths` means data already exists

To reload fresh data:

```bash
# Stop and remove volumes
docker-compose down -v

# Start with auto-load
docker-compose --profile auto-load up -d
```

## Comparison: Auto-Load vs Manual Load

### Auto-Load Container (Recommended for Dev)

**Pros:**
- ✅ Automatic on first startup
- ✅ Integrated into docker-compose workflow
- ✅ Consistent and reproducible
- ✅ No manual intervention needed
- ✅ Profile-based control prevents accidents

**Cons:**
- ⚠️ Requires profile flag: `--profile auto-load`
- ⚠️ Less visible (check logs to see progress)

**Best for:**
- Local development
- CI/CD pipelines
- New developer onboarding
- Automated testing

### Manual Load Script

**Pros:**
- ✅ Explicit control
- ✅ Interactive feedback
- ✅ Can reload anytime
- ✅ No profile flags needed

**Cons:**
- ⚠️ Requires manual execution
- ⚠️ Easy to forget
- ⚠️ Separate command to remember

**Best for:**
- Production deployments
- Data refresh/reload operations
- Troubleshooting
- When you want to see detailed progress

## Architecture

```
┌─────────────────────────────────────────────┐
│  Docker Compose Stack                       │
├─────────────────────────────────────────────┤
│                                             │
│  ┌──────────┐    ┌──────────┐             │
│  │ postgres │◄───│ backend  │             │
│  └──────────┘    └────┬─────┘             │
│                       │                     │
│                       │ API                 │
│                       │                     │
│  ┌──────────────┐    │                     │
│  │ data-loader  │────┘                     │
│  │              │                           │
│  │ - waits for  │    ┌─────────────┐      │
│  │   backend    │    │ data files  │      │
│  │ - calls API  │◄───│ (mounted)   │      │
│  │ - exits      │    └─────────────┘      │
│  └──────────────┘                          │
│   restart: "no"                            │
│   profile: auto-load                       │
└─────────────────────────────────────────────┘
```

## Files

- `docker/data-loader/Dockerfile` - Container definition
- `docker/data-loader/load-on-startup.sh` - Loading script
- `.env` or `.env.example` - Configuration
- `docker-compose.yaml` - Service definition

## Production Recommendations

For production deployments:

1. **Disable auto-load** by not using the `--profile auto-load` flag
2. **Use manual loading** for controlled data initialization
3. **Backup before reload**: Always backup database before loading new data
4. **Change default passwords**: Update `DATALOAD_PASSWORD` in production
5. **Separate credentials**: Use different credentials than development

Example production startup:

```bash
# Start without auto-load
docker-compose up -d

# Wait for services to be healthy
sleep 30

# Load data manually when ready
./scripts/load-data.sh

# Verify data loaded
curl -s http://localhost:8080/api/user/public/all | jq length
```

## Migration from Manual Loading

If you've been using `./load-data.sh`:

1. **Keep using it**: The manual script still works
2. **Try auto-load**: For convenience in dev environments
3. **Both work**: They use the same API endpoints
4. **No conflicts**: The loader detects existing data

To switch to auto-load:

```bash
# Stop current services
docker-compose down

# Start with auto-load
docker-compose --profile auto-load up -d

# Check it worked
docker-compose logs data-loader
```
