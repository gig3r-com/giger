#!/bin/bash

# Wrapper script for direct PostgreSQL data loading
# This script loads data from JSON files directly into PostgreSQL

set -e

# Configuration
POSTGRES_HOST="${POSTGRES_HOST:-localhost}"
POSTGRES_PORT="${POSTGRES_PORT:-5432}"
POSTGRES_DB="${POSTGRES_DB:-giger}"
POSTGRES_USER="${POSTGRES_USER:-giger}"
POSTGRES_PASSWORD="${POSTGRES_PASSWORD:-giger}"
DATA_DIR="${DATA_DIR:-./data/mongo}"

# Get script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}Giger Direct PostgreSQL Data Loader${NC}"
echo -e "${GREEN}================================${NC}"
echo ""
echo "Database: ${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}"
echo "Data Directory: ${DATA_DIR}"
echo ""

# Check if Python is available
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}ERROR: python3 not found. Please install Python 3.${NC}"
    exit 1
fi

# Check if psycopg2 is installed
if ! python3 -c "import psycopg2" 2>/dev/null; then
    echo -e "${YELLOW}WARNING: psycopg2 not installed. Installing...${NC}"
    pip3 install psycopg2-binary
fi

# Export environment variables for Python script
export POSTGRES_HOST
export POSTGRES_PORT
export POSTGRES_DB
export POSTGRES_USER
export POSTGRES_PASSWORD
export DATA_DIR

# Run the Python data loader
python3 "${SCRIPT_DIR}/load-data-postgres.py"

exit_code=$?

if [ $exit_code -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✓ Data loading completed successfully!${NC}"
else
    echo ""
    echo -e "${RED}✗ Data loading failed with errors.${NC}"
fi

exit $exit_code
