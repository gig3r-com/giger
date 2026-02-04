#!/bin/bash

# Script to check what data is loaded in the database

echo "📊 Database Statistics"
echo "====================="
echo ""

docker exec giger-postgres-1 psql -U giger -d giger << 'SQL'
\echo '📋 Table Counts:'
\echo ''
SELECT 
    'Auths' as table_name, COUNT(*) as count FROM "Auths"
UNION ALL SELECT 'Networks', COUNT(*) FROM "Networks"
UNION ALL SELECT 'Subnetworks', COUNT(*) FROM "Subnetworks"
UNION ALL SELECT 'Accounts', COUNT(*) FROM "Accounts"
UNION ALL SELECT 'Gigs', COUNT(*) FROM "ObscurableInfos" WHERE "Discriminator" = 'Gig'
UNION ALL SELECT 'Conversations', COUNT(*) FROM "Conversations"
UNION ALL SELECT 'Messages', COUNT(*) FROM "Messages"
UNION ALL SELECT 'HackConfig', COUNT(*) FROM "HackConfig"
UNION ALL SELECT 'ProgramCodes', COUNT(*) FROM "ProgramCodes"
UNION ALL SELECT 'ObscuredCodesMap', COUNT(*) FROM "ObscuredCodesMap"
UNION ALL SELECT 'Logs', COUNT(*) FROM "Logs"
UNION ALL SELECT 'AnonymizedUsers', COUNT(*) FROM "AnonymizedUsers"
UNION ALL SELECT 'UsersPublic', COUNT(*) FROM "UsersPublic"
UNION ALL SELECT 'Transactions', COUNT(*) FROM "Transactions"
ORDER BY table_name;

\echo ''
\echo '🔐 Sample Auth Users:'
SELECT "Username", "HackerName" FROM "Auths" LIMIT 5;
SQL
