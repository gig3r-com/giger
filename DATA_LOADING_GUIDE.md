# Data Loading Guide

This document explains how to load data into the Giger backend using the API-based approach.

## Overview

Data loading has been redesigned to use API endpoints instead of direct database access. This provides several benefits:

- **No Docker volume mounting required** - Data is loaded from the local `data` submodule
- **Better control** - Load data only when needed, not on every startup
- **API-based** - Uses standard HTTP endpoints with proper error handling
- **Selective loading** - Load specific data types independently
- **Status tracking** - Check what data is currently loaded
- **Secure** - Protected with Basic Authentication

## Prerequisites

1. Backend must be running (`docker compose up backend`)
2. Data submodule must be initialized (`git submodule update --init`)

## Authentication

All data loading endpoints require Basic Authentication. Default credentials:

- **Username**: `admin`
- **Password**: `changeme`

### Configuring Credentials

Set environment variables in docker-compose or .env file:

```bash
DATALOAD_USERNAME=your_username
DATALOAD_PASSWORD=your_secure_password
```

Or in docker-compose.yaml:
```yaml
environment:
  - DataLoad__Username=your_username
  - DataLoad__Password=your_secure_password
```

**IMPORTANT**: Change the default password in production!

## Quick Start

The easiest way to load data is using the provided script:

```bash
./load-data.sh
```

This script will:
1. Check if the API is accessible
2. Ask if you want to clear existing data
3. Load all data files in the correct order
4. Show the final data status

### Environment Variables

You can customize the script behavior:

```bash
# Use different API endpoint (for remote servers)
API_BASE=https://dev.giger.com/api/DataLoad ./load-data.sh

# Use different data directory
DATA_DIR=./my-data ./load-data.sh

# Use custom credentials
DATALOAD_USERNAME=myuser DATALOAD_PASSWORD=mypass ./load-data.sh
```

## Manual Loading

You can also load data manually using curl (include -u for authentication):

### Check Current Status

```bash
curl -u admin:changeme http://localhost:8080/api/DataLoad/status
```

### Clear All Data

```bash
curl -X POST -u admin:changeme http://localhost:8080/api/DataLoad/clear-all
```

### Load Specific Data Types

Load data files individually:

```bash
# Load authentication data
curl -X POST -u admin:changeme http://localhost:8080/api/DataLoad/load-auths \
  -H "Content-Type: application/json" \
  -d @./data/mongo/Auths.json

# Load users
curl -X POST -u admin:changeme http://localhost:8080/api/DataLoad/load-users \
  -H "Content-Type: application/json" \
  -d @./data/mongo/Users.json
```

## Available Endpoints

All endpoints are under `/api/DataLoad` and require Basic Authentication:

- `POST /load-auths` - Load authentication records
- `POST /load-users` - Load user profiles
- `POST /load-accounts` - Load bank accounts
- `POST /load-gigs` - Load gigs
- `POST /load-networks` - Load networks
- `POST /load-subnetworks` - Load subnetworks
- `POST /load-hackconfigs` - Load hacking configurations
- `POST /load-programcodes` - Load program codes
- `POST /load-obscuredcodes` - Load obscured code mappings
- `POST /load-conversations` - Load conversations and messages
- `POST /load-anonymized` - Load anonymized user data
- `POST /load-logs` - Load system logs
- `POST /clear-all` - Clear all data from database
- `GET /status` - Get count of records in each table

## Loading Order

Data must be loaded in a specific order to respect foreign key relationships. The `load-data.sh` script handles this automatically.

## Troubleshooting

### API Not Accessible

Make sure the backend is running:
```bash
docker compose ps backend
docker compose logs backend
```

### Foreign Key Errors

Ensure data is loaded in the correct order. Use the script to avoid this issue.

## Production Considerations

⚠️ **Security Warning**: These endpoints are marked `[AllowAnonymous]` for development convenience. 

For production:
1. Remove `[AllowAnonymous]` attribute from endpoints
2. Add proper authentication/authorization
3. Consider making endpoints admin-only

## Comparison with Old Approach

### Old Approach (Direct DB Access)
- ❌ Required Docker volume mount (`/data`)
- ❌ Data loaded automatically on every startup
- ❌ No control over when data loads

### New Approach (API-Based)
- ✅ Reads from local `data` submodule
- ✅ Load data only when needed
- ✅ Full control via API
- ✅ Can be used from CI/CD pipelines
