# Data Loading: Startup Behavior and CI/CD Configuration

## Overview

The data loading system supports two modes:

1. **Automatic Mode (Development)**: Data loads automatically on first startup via `AUTO_LOAD_DATA=true`
2. **Manual Mode (Production)**: Data must be loaded explicitly via API or script with `AUTO_LOAD_DATA=false`

## Startup Behavior

### 1. Initial Docker Compose Startup (Empty Database) - DEVELOPMENT MODE

When you run `docker-compose up` for the first time **with AUTO_LOAD_DATA=true (default)**:

```bash
docker-compose up -d
```

**What happens:**
1. ✅ PostgreSQL container starts and creates an empty database
2. ✅ Backend container waits for PostgreSQL health check
3. ✅ Backend connects to database and runs `EnsureCreated()` - creates all tables/schema
4. ✅ Backend detects `AUTO_LOAD_DATA=true` and empty database
5. ✅ Backend automatically loads data from `/data` directory (mounted volume)
6. ✅ Backend logs: "Data loaded successfully via AUTO_LOAD_DATA."
7. ✅ **Database has tables AND data - ready to use!**

**No additional steps needed** - just wait ~30 seconds for data to load.

### 1b. Initial Startup - PRODUCTION MODE

When you run with `AUTO_LOAD_DATA=false`:

```bash
AUTO_LOAD_DATA=false docker-compose up -d
```

**What happens:**
1. ✅ PostgreSQL container starts and creates an empty database
2. ✅ Backend container waits for PostgreSQL health check
3. ✅ Backend connects to database and runs `EnsureCreated()` - creates all tables/schema
4. ✅ Backend logs: "Automatic data loading disabled. Use /api/DataLoad endpoints to load data manually."
5. ⚠️ **Database has tables but NO DATA**

**Next step - Manual data loading:**
```bash
./load-data.sh
```

### 2. Subsequent Restarts (With Existing Data)

When you restart containers with existing data:

```bash
docker-compose restart
# or
docker-compose down && docker-compose up -d
```

**What happens:**
1. ✅ PostgreSQL container starts with existing data in `./volumes/postgres`
2. ✅ Backend connects to database
3. ✅ Backend verifies schema (no changes needed)
4. ✅ Backend does NOT touch existing data
5. ✅ Application starts normally with all existing data intact

**Note:** PostgreSQL data persists in `./volumes/postgres` directory, so it survives container restarts.

### 3. Complete Reset (Fresh Start)

To completely reset and reload data:

```bash
# Stop containers
docker-compose down

# Delete database volume (THIS DELETES ALL DATA!)
rm -rf ./volumes/postgres

# Start fresh
docker-compose up -d

# Wait for backend to be ready
sleep 10

# Load data
./load-data.sh
```

## Environment Variables

### Docker Compose Configuration

Key environment variables in `docker-compose.yaml`:

```yaml
environment:
  # Database connection
  - GigerDB__Host=postgres
  - GigerDB__Port=5432
  - GigerDB__Username=${GIGER_USERNAME:-giger}
  - GigerDB__Password=${GIGER_PASSWORD:-giger}
  - GigerDB__DatabaseName=${GIGER_DATABASE:-giger}
  
  # Auto-load data on first startup (default: true for development)
  - AUTO_LOAD_DATA=${AUTO_LOAD_DATA:-true}
  
  # Data loading API authentication (for manual loading)
  - DataLoad__Username=${DATALOAD_USERNAME:-admin}
  - DataLoad__Password=${DATALOAD_PASSWORD:-changeme}
  
  # Legacy: FORCE_DATA_RELOAD (deprecated, use AUTO_LOAD_DATA instead)
  - FORCE_DATA_RELOAD=${FORCE_DATA_RELOAD:-false}
```

### Optional .env File

Create `.env` file in project root to customize:

```bash
# Auto-load behavior
AUTO_LOAD_DATA=true  # true for dev, false for production

# Database credentials
GIGER_USERNAME=giger
GIGER_PASSWORD=giger
GIGER_DATABASE=giger

# Data loading API credentials
DATALOAD_USERNAME=admin
DATALOAD_PASSWORD=your_secure_password_here

# Debug logging
GIGER_DEBUG_LOGGING=false
VITE_DEBUG_LOGGING=false

# Application port
APP_PORT=3000
```

## CI/CD Configuration

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy and Load Data

on:
  push:
    branches: [main, staging]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          submodules: recursive  # Important: fetch data submodule
      
      - name: Set up environment variables
        run: |
          echo "DATALOAD_USERNAME=${{ secrets.DATALOAD_USERNAME }}" >> $GITHUB_ENV
          echo "DATALOAD_PASSWORD=${{ secrets.DATALOAD_PASSWORD }}" >> $GITHUB_ENV
      
      - name: Build and start containers
        run: |
          docker-compose up -d --build
      
      - name: Wait for backend to be ready
        run: |
          echo "Waiting for backend to start..."
          for i in {1..30}; do
            if curl -f -u "$DATALOAD_USERNAME:$DATALOAD_PASSWORD" http://localhost:8080/api/DataLoad/status &>/dev/null; then
              echo "Backend is ready!"
              break
            fi
            echo "Attempt $i/30..."
            sleep 5
          done
      
      - name: Load data
        run: |
          # Make script executable
          chmod +x ./load-data.sh
          
          # Load data non-interactively (skip clear-all prompt)
          # Option 1: Auto-clear and load
          echo "y" | ./load-data.sh
          
          # Option 2: Load only (no clear)
          # echo "n" | ./load-data.sh
      
      - name: Verify data loaded
        run: |
          curl -u "$DATALOAD_USERNAME:$DATALOAD_PASSWORD" \
            http://localhost:8080/api/DataLoad/status
      
      - name: Run tests (optional)
        run: |
          # Add your tests here
          docker-compose exec -T backend dotnet test
```

### Required GitHub Secrets

Set these in your repository settings (`Settings > Secrets and variables > Actions`):

```
DATALOAD_USERNAME = your_ci_username
DATALOAD_PASSWORD = your_secure_ci_password
```

### Alternative: Manual Data Load in CI

If you want more control, skip the shell script and load data directly:

```yaml
- name: Load data manually
  run: |
    # Set variables
    API_BASE="http://localhost:8080/api/DataLoad"
    USERNAME="${{ secrets.DATALOAD_USERNAME }}"
    PASSWORD="${{ secrets.DATALOAD_PASSWORD }}"
    
    # Clear existing data
    curl -X POST -u "$USERNAME:$PASSWORD" "$API_BASE/clear-all"
    
    # Load data in order
    curl -X POST -u "$USERNAME:$PASSWORD" "$API_BASE/load-auths" \
      -H "Content-Type: application/json" -d @./data/mongo/Auths.json
    
    curl -X POST -u "$USERNAME:$PASSWORD" "$API_BASE/load-users" \
      -H "Content-Type: application/json" -d @./data/mongo/Users.json
    
    curl -X POST -u "$USERNAME:$PASSWORD" "$API_BASE/load-accounts" \
      -H "Content-Type: application/json" -d @./data/mongo/Accounts.json
    
    # ... continue for all data types
    
    # Verify
    curl -u "$USERNAME:$PASSWORD" "$API_BASE/status"
```

## Production Deployment

### Security Checklist

- [ ] **Change default credentials** - Set strong `DATALOAD_USERNAME` and `DATALOAD_PASSWORD`
- [ ] **Restrict network access** - Data load endpoints should only be accessible from trusted networks
- [ ] **Use environment variables** - Never commit credentials to git
- [ ] **Database backups** - Set up automated backups before data operations
- [ ] **Use HTTPS** - Always use TLS/SSL in production
- [ ] **API rate limiting** - Consider adding rate limiting to data load endpoints

### Recommended Production Setup

```yaml
# docker-compose.prod.yml
services:
  backend:
    environment:
      - DataLoad__Username=${DATALOAD_USERNAME}  # Set via secrets manager
      - DataLoad__Password=${DATALOAD_PASSWORD}  # Set via secrets manager
      - ASPNETCORE_ENVIRONMENT=Production
```

Deploy with:
```bash
# Load secrets from AWS Secrets Manager / Azure Key Vault / etc
export DATALOAD_USERNAME=$(aws secretsmanager get-secret-value --secret-id prod/giger/dataload-user --query SecretString --output text)
export DATALOAD_PASSWORD=$(aws secretsmanager get-secret-value --secret-id prod/giger/dataload-pass --query SecretString --output text)

# Deploy
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Load data (one-time or on deploy)
./load-data.sh
```

## Troubleshooting

### Data Not Loading

```bash
# Check if backend is running
docker-compose ps

# Check backend logs
docker-compose logs backend

# Verify API is accessible
curl -u admin:changeme http://localhost:8080/api/DataLoad/status

# Check authentication
curl -v -u admin:changeme http://localhost:8080/api/DataLoad/status
# Should see HTTP 200, not 401
```

### Database Already Has Data

If you want to reload data:

```bash
# Clear existing data first
curl -X POST -u admin:changeme http://localhost:8080/api/DataLoad/clear-all

# Then reload
./load-data.sh
```

### CI/CD Authentication Failing

```bash
# Check if secrets are set
echo $DATALOAD_USERNAME
echo $DATALOAD_PASSWORD

# Test authentication locally
curl -v -u "$DATALOAD_USERNAME:$DATALOAD_PASSWORD" http://localhost:8080/api/DataLoad/status
```

## Key Differences from Old System

| Aspect | Old System | New System |
|--------|-----------|------------|
| **Startup** | Auto-loads data on startup | Never auto-loads data |
| **Trigger** | `FORCE_DATA_RELOAD=true` | Manual API calls or script |
| **Source** | Docker volume mount `/data` | HTTP API with JSON body |
| **Security** | None | Basic Authentication |
| **Control** | Environment variable | Explicit API calls |
| **CI/CD** | Set env var, restart | Run load-data.sh script |

## Summary

**For Development:**
1. `docker-compose up -d` - starts with empty tables
2. `./load-data.sh` - loads data once

**For CI/CD:**
1. Set `DATALOAD_USERNAME` and `DATALOAD_PASSWORD` secrets
2. Build and start containers
3. Run `./load-data.sh` in non-interactive mode
4. Verify with `/api/DataLoad/status`

**For Production:**
1. Use strong credentials
2. Load data once after deployment
3. Data persists in PostgreSQL volume
4. No automatic reloading on restart
