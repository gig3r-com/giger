#!/bin/bash
set -e

# This script runs before docker-entrypoint-initdb.d scripts
# Configure psql to continue on errors during data loading
export PSQL_OPTIONS="--set ON_ERROR_STOP=off"

echo "PostgreSQL initialization: Will continue loading data despite constraint violations"
