#!/bin/bash

echo "=== Detailed Database Inspection ==="
echo ""

echo "1. List all tables in database:"
docker exec giger-postgres-1 psql -U giger -d giger -c "\dt"
echo ""

echo "2. Check table names with counts:"
docker exec giger-postgres-1 psql -U giger -d giger -c "
SELECT 
  schemaname, tablename, 
  (xpath('/row/cnt/text()', xml_count))[1]::text::int as row_count
FROM (
  SELECT 
    schemaname, tablename,
    query_to_xml(format('select count(*) as cnt from %I.%I', schemaname, tablename), false, true, '') as xml_count
  FROM pg_tables
  WHERE schemaname = 'public'
) t
ORDER BY tablename;
"
echo ""

echo "3. Check last 20 lines of backend logs for errors:"
docker-compose logs backend | tail -20
echo ""

echo "=== End Inspection ==="
