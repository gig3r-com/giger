# Data Loader Container

This directory contains a Docker container that automatically loads initial data into the Giger application on startup.

## Files

- `Dockerfile` - Alpine-based image with curl and jq
- `load-on-startup.sh` - Shell script that waits for backend and loads data

## How It Works

1. Container starts with the `auto-load` profile
2. Waits for backend to be healthy (max 120 seconds)
3. Calls data loading API endpoints in correct order
4. Exits when complete (restart: "no")

## Usage

### Enable Auto-Load

```bash
# Set environment variable
export AUTO_LOAD_DATA=true

# Start all services (data-loader will run automatically due to profile)
docker-compose up -d data-loader

# Check logs
docker-compose logs -f data-loader
```

### Disable Auto-Load (Default)

```bash
# Normal startup - skips data loader (profile not activated)
docker-compose up -d
```

### Manual One-Time Load

```bash
# Run data-loader manually without profile
docker-compose run --rm -e AUTO_LOAD_DATA=true data-loader
```

## Environment Variables

- `AUTO_LOAD_DATA` - Set to `true` to enable (default: `false`)
- `DATALOAD_USERNAME` - API auth username (default: `admin`)
- `DATALOAD_PASSWORD` - API auth password (default: `changeme`)

## Data Loading Order

The script loads data in this order to respect foreign keys:

1. Auths
2. Users
3. Accounts
4. Networks
5. Subnetworks
6. HackConfigs
7. ProgramCodes
8. ObscuredCodes
9. Gigs
10. Conversations
11. Anonymized
12. Logs

## Troubleshooting

### Check if data loader ran
```bash
docker-compose logs data-loader
```

### Force rebuild
```bash
docker-compose build data-loader
```

### Test manually
```bash
docker-compose run --rm data-loader
```

### Common Issues

**"Backend failed to start in time"**
- Backend took too long to start
- Check backend logs: `docker-compose logs backend`
- Increase MAX_RETRIES in script if needed

**"Failed to load X"**
- Check if data files exist in `./data/mongo/`
- Verify file format is valid JSON
- Check backend logs for detailed error

**Container keeps restarting**
- This shouldn't happen (restart: "no")
- If it does, check exit code in logs

## Profile Behavior

The data-loader service uses a `profiles` configuration:
- When you run `docker-compose up -d`, it will NOT start the data-loader (profile not active)
- To start data-loader, you must explicitly: `docker-compose up -d data-loader`
- This prevents accidental data loading on every startup

## Docker Compose Version Note

- **Newer versions (v2.x+)**: Use `--profile auto-load` flag
  ```bash
  docker-compose --profile auto-load up -d
  ```
- **Older versions**: Specify service name directly
  ```bash
  docker-compose up -d data-loader
  ```

## Technical Details

- **Base Image**: Alpine Linux 3.19 (lightweight)
- **Dependencies**: curl, jq, bash
- **Restart Policy**: no (runs once only)
- **Profile**: auto-load (prevents accidental activation)
- **Volume**: `./data/mongo:/data:ro` (read-only mount)
