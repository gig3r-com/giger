#!/bin/sh
set -e

echo "=== Data Loader Container Starting ==="
echo "AUTO_LOAD: ${AUTO_LOAD_DATA:-false}"

# Exit early if auto load is disabled
if [ "${AUTO_LOAD_DATA:-false}" != "true" ]; then
    echo "AUTO_LOAD_DATA is not set to 'true', skipping data load"
    exit 0
fi

echo "Waiting for backend to be ready..."
MAX_RETRIES=60
RETRY_COUNT=0

# Wait for backend health
while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    if curl -f -s "http://backend:8080/api/DataLoad/status" -u "${DATALOAD_USERNAME}:${DATALOAD_PASSWORD}" > /dev/null 2>&1; then
        echo "✓ Backend is ready!"
        break
    fi
    RETRY_COUNT=$((RETRY_COUNT + 1))
    echo "Waiting for backend... ($RETRY_COUNT/$MAX_RETRIES)"
    sleep 2
done

if [ $RETRY_COUNT -eq $MAX_RETRIES ]; then
    echo "✗ Backend failed to start in time"
    exit 1
fi

# Give backend a moment to fully initialize
sleep 3

echo "Starting data load..."

# Configuration
API_BASE="http://backend:8080/api/DataLoad"
DATA_DIR="/data"
AUTH="${DATALOAD_USERNAME}:${DATALOAD_PASSWORD}"

# Helper function to load data
load_data() {
    endpoint=$1
    file=$2
    name=$3
    
    echo "[INFO] Loading $name from $file..."
    
    response=$(curl -s -u "$AUTH" -X POST "$API_BASE/$endpoint" \
        -H "Content-Type: application/json" \
        -d @"$file")
    
    # Check if response contains error
    if echo "$response" | grep -q '"message":"Error'; then
        echo "[ERROR] Failed to load $name"
        echo "$response"
        return 1
    else
        count=$(echo "$response" | grep -o '"count":[0-9]*' | head -1 | cut -d: -f2)
        echo "[INFO] ✓ Loaded ${count:-?} $name"
        return 0
    fi
}

# Load data in correct order (respecting foreign key dependencies)
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

echo ""
echo "=== Data loading complete! ==="
echo ""
echo "Final status:"
curl -s -u "$AUTH" "$API_BASE/status" 2>/dev/null || echo "Status check failed (this is OK)"

echo ""
echo "✓ Data loader container finished successfully"
exit 0
