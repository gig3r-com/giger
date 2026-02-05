#!/bin/bash

# Data Loader Container Entrypoint
# Controls whether to load data and whether to clean database first

set -e

# Configuration from environment
AUTO_LOAD_DATA="${AUTO_LOAD_DATA:-true}"
CLEANUP_DATABASE="${CLEANUP_DATABASE:-false}"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() {
    echo -e "${GREEN}[DATA-LOADER]${NC} $1"
}

log_error() {
    echo -e "${RED}[DATA-LOADER]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[DATA-LOADER]${NC} $1"
}

log_info "=========================================="
log_info "Giger Data Loader Container"
log_info "=========================================="
log_info "AUTO_LOAD_DATA: ${AUTO_LOAD_DATA}"
log_info "CLEANUP_DATABASE: ${CLEANUP_DATABASE}"
log_info ""

# Check if data loading is enabled
if [ "$AUTO_LOAD_DATA" != "true" ]; then
    log_info "AUTO_LOAD_DATA is not 'true'. Skipping data load."
    exit 0
fi

# Wait for backend to create schema (EF Core migrations)
log_info "Waiting for backend to initialize database schema..."
sleep 10

# Wait for PostgreSQL to be ready
log_info "Waiting for PostgreSQL to be ready..."
max_attempts=30
attempt=0

while [ $attempt -lt $max_attempts ]; do
    if python3 -c "
import psycopg2
import os
try:
    conn = psycopg2.connect(
        host=os.getenv('POSTGRES_HOST', 'postgres'),
        port=os.getenv('POSTGRES_PORT', '5432'),
        dbname=os.getenv('POSTGRES_DB', 'giger'),
        user=os.getenv('POSTGRES_USER', 'giger'),
        password=os.getenv('POSTGRES_PASSWORD', 'giger')
    )
    conn.close()
    exit(0)
except Exception as e:
    print(f'Connection error: {e}', flush=True)
    exit(1)
" 2>&1; then
        log_info "PostgreSQL is ready!"
        break
    fi
    
    attempt=$((attempt + 1))
    if [ $attempt -eq $max_attempts ]; then
        log_error "PostgreSQL is not ready after ${max_attempts} attempts. Exiting."
        exit 1
    fi
    
    sleep 2
done

# Check if database should be cleaned up first
if [ "$CLEANUP_DATABASE" = "true" ]; then
    log_warn "CLEANUP_DATABASE is enabled. Truncating all tables..."
    
    python3 << 'EOF'
import psycopg2
import os

try:
    conn = psycopg2.connect(
        host=os.getenv('POSTGRES_HOST', 'postgres'),
        port=os.getenv('POSTGRES_PORT', '5432'),
        dbname=os.getenv('POSTGRES_DB', 'giger'),
        user=os.getenv('POSTGRES_USER', 'giger'),
        password=os.getenv('POSTGRES_PASSWORD', 'giger')
    )
    cursor = conn.cursor()
    
    # Get all table names (excluding system tables)
    cursor.execute("""
        SELECT tablename FROM pg_tables 
        WHERE schemaname = 'public'
    """)
    tables = cursor.fetchall()
    
    if tables:
        print(f"Found {len(tables)} tables to truncate")
        # Truncate all tables with CASCADE to handle foreign keys
        table_names = ', '.join([f'"{t[0]}"' for t in tables])
        cursor.execute(f"TRUNCATE TABLE {table_names} CASCADE")
        conn.commit()
        print("✓ All tables truncated successfully")
    else:
        print("No tables found to truncate")
    
    cursor.close()
    conn.close()
except Exception as e:
    print(f"Error during cleanup: {e}")
    exit(1)
EOF
    
    if [ $? -ne 0 ]; then
        log_error "Database cleanup failed!"
        exit 1
    fi
    
    log_info "✓ Database cleaned successfully"
    echo ""
fi

# Check if data already exists (unless cleanup was just done)
if [ "$CLEANUP_DATABASE" != "true" ]; then
    log_info "Checking if data already exists..."
    
    data_exists=$(python3 -c "
import psycopg2
import os
try:
    conn = psycopg2.connect(
        host=os.getenv('POSTGRES_HOST', 'postgres'),
        port=os.getenv('POSTGRES_PORT', '5432'),
        dbname=os.getenv('POSTGRES_DB', 'giger'),
        user=os.getenv('POSTGRES_USER', 'giger'),
        password=os.getenv('POSTGRES_PASSWORD', 'giger')
    )
    cursor = conn.cursor()
    cursor.execute('SELECT COUNT(*) FROM \"Auths\"')
    count = cursor.fetchone()[0]
    conn.close()
    print('true' if count > 0 else 'false')
except:
    print('false')
" 2>/dev/null)
    
    if [ "$data_exists" = "true" ]; then
        log_info "Database already contains data. Skipping load."
        log_info "Set CLEANUP_DATABASE=true to force reload."
        exit 0
    fi
fi

# Run the data loader
log_info "Starting data load..."
echo ""

python3 /app/load-data-postgres.py

exit_code=$?

if [ $exit_code -eq 0 ]; then
    log_info ""
    log_info "=========================================="
    log_info "✓ Data loading completed successfully!"
    log_info "=========================================="
else
    log_error ""
    log_error "=========================================="
    log_error "✗ Data loading failed!"
    log_error "=========================================="
fi

exit $exit_code
