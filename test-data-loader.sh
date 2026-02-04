#!/bin/bash
# Test script for auto-load functionality

set -e

echo "=== Testing Data Auto-Load Container ==="
echo ""

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "Error: docker-compose not found"
    exit 1
fi

echo "1. Checking docker-compose configuration..."
if docker-compose config > /dev/null 2>&1; then
    echo "   ✓ Configuration valid"
else
    echo "   ✗ Configuration has errors"
    docker-compose config
    exit 1
fi

echo ""
echo "2. Checking data-loader service exists in docker-compose.yaml..."
if grep -q "data-loader:" docker-compose.yaml; then
    echo "   ✓ data-loader service found"
else
    echo "   ✗ data-loader service not found"
    exit 1
fi

echo ""
echo "3. Checking data files exist..."
if [ -d "data/mongo" ]; then
    file_count=$(ls -1 data/mongo/*.json 2>/dev/null | wc -l | tr -d ' ')
    if [ "$file_count" -gt 0 ]; then
        echo "   ✓ Found $file_count JSON files in data/mongo/"
    else
        echo "   ✗ No JSON files found in data/mongo/"
        exit 1
    fi
else
    echo "   ✗ data/mongo directory not found"
    exit 1
fi

echo ""
echo "4. Building data-loader image..."
if docker-compose build data-loader 2>&1 | tail -5; then
    echo "   ✓ Image built successfully"
else
    echo "   ✗ Build failed"
    exit 1
fi

echo ""
echo "=== All checks passed! ==="
echo ""
echo "To test auto-load (with backend running):"
echo "  # Start backend first:"
echo "  docker-compose up -d backend"
echo ""
echo "  # Then run data-loader:"
echo "  export AUTO_LOAD_DATA=true"
echo "  docker-compose up -d data-loader"
echo "  docker-compose logs -f data-loader"
echo ""
echo "To run manually (standalone):"
echo "  docker-compose run --rm -e AUTO_LOAD_DATA=true data-loader"
