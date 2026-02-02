#!/bin/bash

# Data loading script for Giger backend
# This script loads data from JSON files in the data submodule via the API

set -e

# Configuration
API_BASE="${API_BASE:-http://localhost:8080/api/DataLoad}"
DATA_DIR="${DATA_DIR:-./data/mongo}"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

# Check if data directory exists
if [ ! -d "$DATA_DIR" ]; then
    log_error "Data directory not found: $DATA_DIR"
    exit 1
fi

log_info "Using API: $API_BASE"
log_info "Using data directory: $DATA_DIR"

# Function to load data file
load_data() {
    local endpoint=$1
    local file=$2
    local name=$3

    if [ ! -f "$file" ]; then
        log_warn "File not found: $file, skipping..."
        return
    fi

    log_info "Loading $name from $file..."
    
    http_code=$(curl -s -w "%{http_code}" -X POST "$API_BASE/$endpoint" \
        -H "Content-Type: application/json" \
        -d @"$file" \
        -o /tmp/load_response.json)
    
    if [ "$http_code" -eq 200 ]; then
        count=$(grep -o '"count":[0-9]*' /tmp/load_response.json | grep -o '[0-9]*' || echo "unknown")
        log_info "✓ Loaded $count $name"
    else
        log_error "✗ Failed to load $name (HTTP $http_code)"
        cat /tmp/load_response.json
    fi
    rm -f /tmp/load_response.json
}

# Check API status
log_info "Checking API status..."
if ! curl -s -f "$API_BASE/status" > /dev/null; then
    log_error "API is not accessible at $API_BASE"
    log_error "Make sure the backend is running"
    exit 1
fi

log_info "API is accessible"

# Ask for confirmation to clear existing data
read -p "Do you want to clear existing data before loading? (y/N) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    log_warn "Clearing all existing data..."
    curl -s -X POST "$API_BASE/clear-all" > /dev/null
    log_info "Data cleared"
fi

# Load data in correct order (respecting foreign key dependencies)
log_info "Starting data load..."

load_data "load-auths" "$DATA_DIR/Auths.json" "auths"
load_data "load-users" "$DATA_DIR/Users.json" "users"
load_data "load-accounts" "$DATA_DIR/Accounts.json" "accounts"
load_data "load-networks" "$DATA_DIR/Networks.json" "networks"
load_data "load-subnetworks" "$DATA_DIR/Subnetworks.json" "subnetworks"
load_data "load-hackconfigs" "$DATA_DIR/HackConfigs.json" "hack configs"
load_data "load-programcodes" "$DATA_DIR/ProgramCodesMap.json" "program codes"
load_data "load-obscuredcodes" "$DATA_DIR/ObscuredCodesMap.json" "obscured codes"
load_data "load-gigs" "$DATA_DIR/Gigs.json" "gigs"
load_data "load-conversations" "$DATA_DIR/Conversations.json" "conversations"
load_data "load-anonymized" "$DATA_DIR/Anonymized.json" "anonymized users"
load_data "load-logs" "$DATA_DIR/Logs.json" "logs"

# Show final status
log_info "Data loading complete! Final status:"
curl -s "$API_BASE/status" | python3 -m json.tool || curl -s "$API_BASE/status"

log_info "Done!"
