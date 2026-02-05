# Data Loader Container

Automatically loads data from JSON files directly into PostgreSQL on startup.

## Environment Variables

- `AUTO_LOAD_DATA` (default: `true`) - Enable/disable automatic data loading
- `CLEANUP_DATABASE` (default: `false`) - Truncate all tables before loading

## Usage

### Normal startup (load if empty):
```bash
docker-compose up
```

### Force reload (cleanup first):
```bash
CLEANUP_DATABASE=true docker-compose up data-loader
```

### Disable auto-loading:
```bash
AUTO_LOAD_DATA=false docker-compose up
```

## How it works

1. Waits for PostgreSQL to be ready
2. If `CLEANUP_DATABASE=true`, truncates all tables
3. Checks if data exists (if no cleanup)
4. Loads data from `/data` volume using Python script
5. Exits when done (restart: "no")

## Files

- `Dockerfile` - Container image definition
- `entrypoint.sh` - Startup logic with environment checks
- Uses: `scripts/load-data-postgres.py` for actual data loading
