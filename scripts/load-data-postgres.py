#!/usr/bin/env python3
"""
Complete PostgreSQL Data Loader for Giger
Loads all JSON files from /data/mongo directly into PostgreSQL.
"""

import json
import psycopg2
import sys
import os
import uuid

# Configuration
DB_HOST = os.getenv('POSTGRES_HOST', 'localhost')
DB_PORT = os.getenv('POSTGRES_PORT', '5432')
DB_NAME = os.getenv('POSTGRES_DB', 'giger')
DB_USER = os.getenv('POSTGRES_USER', 'giger')
DB_PASSWORD = os.getenv('POSTGRES_PASSWORD', 'giger')
DATA_DIR = os.getenv('DATA_DIR', './data/mongo')

# Colors
GREEN, RED, YELLOW, NC = '\033[0;32m', '\033[0;31m', '\033[1;33m', '\033[0m'

def log_info(msg): print(f"{GREEN}[INFO]{NC} {msg}")
def log_error(msg): print(f"{RED}[ERROR]{NC} {msg}", file=sys.stderr)
def log_warn(msg): print(f"{YELLOW}[WARN]{NC} {msg}")

def get_db_connection():
    try:
        return psycopg2.connect(host=DB_HOST, port=DB_PORT, dbname=DB_NAME, 
                               user=DB_USER, password=DB_PASSWORD)
    except Exception as e:
        log_error(f"Failed to connect to database: {e}")
        sys.exit(1)

def convert_id(mongo_id):
    if isinstance(mongo_id, dict) and '$oid' in mongo_id:
        return mongo_id['$oid']
    return str(mongo_id) if mongo_id else str(uuid.uuid4())

def load_json_file(file_path):
    if not os.path.exists(file_path):
        return None
    with open(file_path, 'r') as f:
        return json.load(f)

def load_auths(conn, data):
    cursor = conn.cursor()
    success, failed = 0, 0
    for item in data:
        try:
            cursor.execute("""
                INSERT INTO "Auths" ("Id", "Username", "HackerName", "Password", "AuthToken")
                VALUES (%s, %s, %s, %s, %s) ON CONFLICT ("Id") DO NOTHING
            """, (convert_id(item.get('_id')), item.get('Username', ''),
                 item.get('HackerName'), item.get('Password', ''), item.get('AuthToken')))
            success += 1
        except Exception as e:
            log_error(f"Auth {item.get('Username')}: {e}")
            failed += 1
    conn.commit()
    return success, failed

def load_networks(conn, data):
    cursor = conn.cursor()
    success, failed = 0, 0
    for item in data:
        try:
            cursor.execute("""
                INSERT INTO "Networks" ("Id", "Name", "Tier", "Faction", "Type")
                VALUES (%s, %s, %s, %s, %s) ON CONFLICT ("Id") DO NOTHING
            """, (convert_id(item.get('_id')), item.get('Name', ''),
                 item.get('Tier', 0), item.get('Faction', ''), item.get('Type', '')))
            success += 1
        except Exception as e:
            log_error(f"Network {item.get('Name')}: {e}")
            failed += 1
    conn.commit()
    return success, failed

def load_subnetworks(conn, data):
    cursor = conn.cursor()
    success, failed = 0, 0
    for item in data:
        try:
            cursor.execute("""
                INSERT INTO "Subnetworks" 
                ("Id", "Name", "NetworkId", "Users", "Firewall", "OperatingSystem", "Ice", "PastHacks")
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s) ON CONFLICT ("Id") DO NOTHING
            """, (convert_id(item.get('_id')), item.get('Name', ''),
                 item.get('NetworkId', ''), json.dumps(item.get('Users', [])),
                 item.get('Firewall', ''), item.get('OperatingSystem', ''),
                 json.dumps(item.get('Ice', [])), json.dumps(item.get('PastHacks', []))))
            success += 1
        except Exception as e:
            log_error(f"Subnetwork {item.get('Name')}: {e}")
            failed += 1
    conn.commit()
    return success, failed

def load_users(conn, data):
    cursor = conn.cursor()
    success, failed = 0, 0
    for user in data:
        try:
            user_id = convert_id(user.get('_id'))
            cursor.execute("""
                INSERT INTO "UsersPublic" 
                ("Id", "Handle", "HackerName", "Name", "Surname", "TypePublic", "TypeActual",
                 "WealthLevel", "Vibe", "Faction")
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s) 
                ON CONFLICT ("Id") DO NOTHING
            """, (user_id, user.get('Handle', ''), user.get('HackerName', ''),
                 user.get('Name', ''), user.get('Surname', ''), user.get('TypePublic', ''),
                 user.get('TypeActual', ''), user.get('WealthLevel', ''),
                 user.get('Vibe', ''), user.get('Faction', '')))
            success += 1
        except Exception as e:
            log_error(f"User {user.get('Handle')}: {e}")
            failed += 1
    conn.commit()
    return success, failed

def load_accounts(conn, data):
    cursor = conn.cursor()
    success, failed = 0, 0
    for item in data:
        try:
            cursor.execute("""
                INSERT INTO "Accounts" 
                ("Id", "UserId", "AccountNumber", "Balance", "Type")
                VALUES (%s, %s, %s, %s, %s) ON CONFLICT ("Id") DO NOTHING
            """, (convert_id(item.get('_id')), item.get('UserId', ''),
                 item.get('AccountNumber', ''), item.get('Balance', 0),
                 item.get('Type', '')))
            success += 1
        except Exception as e:
            log_error(f"Account {item.get('AccountNumber')}: {e}")
            failed += 1
    conn.commit()
    return success, failed

def load_hack_configs(conn, data):
    cursor = conn.cursor()
    success, failed = 0, 0
    for item in data:
        try:
            cursor.execute("""
                INSERT INTO "HackConfig" ("Id", "Config")
                VALUES (%s, %s) ON CONFLICT ("Id") DO NOTHING
            """, (convert_id(item.get('_id')), item.get('Config', '')))
            success += 1
        except Exception as e:
            log_error(f"HackConfig {item.get('_id')}: {e}")
            failed += 1
    conn.commit()
    return success, failed

def load_program_codes(conn, data):
    cursor = conn.cursor()
    success, failed = 0, 0
    for item in data:
        try:
            cursor.execute("""
                INSERT INTO "ProgramCodes" ("Id", "ProgramCode", "IsUsed")
                VALUES (%s, %s, %s) ON CONFLICT ("Id") DO NOTHING
            """, (convert_id(item.get('_id')), item.get('ProgramCode', ''),
                 item.get('IsUsed', False)))
            success += 1
        except Exception as e:
            log_error(f"ProgramCode: {e}")
            failed += 1
    conn.commit()
    return success, failed

def load_obscured_codes(conn, data):
    cursor = conn.cursor()
    success, failed = 0, 0
    for item in data:
        try:
            cursor.execute("""
                INSERT INTO "ObscuredCodesMap" 
                ("Id", "ObscurableId", "Username", "ExpectedRevealCode", "IsUsed")
                VALUES (%s, %s, %s, %s, %s) ON CONFLICT ("Id") DO NOTHING
            """, (convert_id(item.get('_id')), item.get('ObscurableId', ''),
                 item.get('Username', ''), item.get('ExpectedRevealCode', ''),
                 item.get('IsUsed', False)))
            success += 1
        except Exception as e:
            log_error(f"ObscuredCode: {e}")
            failed += 1
    conn.commit()
    return success, failed

def load_gigs(conn, data):
    cursor = conn.cursor()
    success, failed = 0, 0
    # Map string enum values to integers
    category_map = {'KILLER': 0, 'CORPO': 1, 'RIPPERDOC': 2, 'FIXER': 3, 'NETRUNNER': 4, 'TECH': 5}
    status_map = {'AVAILABLE': 0, 'TAKEN': 1, 'COMPLETED': 2, 'CANCELLED': 3}
    
    for item in data:
        try:
            rep_level = item.get('ReputationRequired', {}).get('Level', 0)
            category = category_map.get(item.get('Category', 'KILLER'), 0)
            subcategory = 0  # Default, would need subcategory mapping
            status = status_map.get(item.get('Status', 'AVAILABLE'), 0)
            
            cursor.execute("""
                INSERT INTO "Gigs" 
                ("Id", "Payout", "Title", "Description", "DescriptionDetailed", 
                 "ConversationId", "Category", "Subcategory", "ReputationRequired",
                 "IsAnonymizedAuthor", "Status", "AuthorId", "AuthorName", 
                 "TakenById", "ClientAccountNumber", "ProviderAccountNumber",
                 "CreatedAt", "Mode", "IsRevealedByClient")
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, 
                        CURRENT_TIMESTAMP, 0, false)
                ON CONFLICT ("Id") DO NOTHING
            """, (convert_id(item.get('_id')), item.get('Payout', 0),
                 item.get('Title', ''), item.get('Description', ''),
                 item.get('DescriptionDetailed', ''), item.get('ConversationId'),
                 category, subcategory, rep_level,
                 item.get('IsAnonymizedAuthor', False), status,
                 item.get('AuthorId', ''), item.get('AuthorName', ''),
                 item.get('TakenById'), item.get('ClientAccountNumber'),
                 item.get('ProviderAccountNumber')))
            success += 1
        except Exception as e:
            log_error(f"Gig {item.get('Title')}: {e}")
            failed += 1
    conn.commit()
    return success, failed

def load_conversations(conn, data):
    cursor = conn.cursor()
    success, failed = 0, 0
    for item in data:
        try:
            conv_id = convert_id(item.get('_id'))
            participants = item.get('Participants', [])
            cursor.execute("""
                INSERT INTO "Conversations" 
                ("Id", "Participants", "AnonymizedUsers", "Hackers", "GigConversation")
                VALUES (%s, %s, %s, %s, %s) ON CONFLICT ("Id") DO NOTHING
            """, (conv_id, participants, [], [], item.get('GigConversation', False)))
            
            # Load messages for this conversation
            for msg in item.get('Messages', []):
                msg_id = convert_id(msg.get('_id'))
                cursor.execute("""
                    INSERT INTO "Messages" 
                    ("Id", "ConversationId", "Date", "Sender", "Text", "ReadBy")
                    VALUES (%s, %s, %s, %s, %s, %s) ON CONFLICT ("Id") DO NOTHING
                """, (msg_id, conv_id, msg.get('Date'), msg.get('Sender', ''),
                     msg.get('Text', ''), []))
            
            success += 1
        except Exception as e:
            log_error(f"Conversation: {e}")
            failed += 1
    conn.commit()
    return success, failed

def load_anonymized(conn, data):
    cursor = conn.cursor()
    success, failed = 0, 0
    for item in data:
        try:
            cursor.execute("""
                INSERT INTO "AnonymizedUsers" ("Id", "UserId", "DisplyedAs")
                VALUES (%s, %s, %s) ON CONFLICT ("Id") DO NOTHING
            """, (convert_id(item.get('_id')), item.get('UserId', ''),
                 item.get('DisplyedAs', '')))
            success += 1
        except Exception as e:
            log_error(f"AnonymizedUser: {e}")
            failed += 1
    conn.commit()
    return success, failed

def load_logs(conn, data):
    cursor = conn.cursor()
    success, failed = 0, 0
    # Map log type strings to integers
    log_type_map = {'Transfer': 0, 'Hack': 1, 'Access': 2, 'System': 3}
    
    for item in data:
        try:
            log_type = log_type_map.get(item.get('LogType', 'System'), 3)
            cursor.execute("""
                INSERT INTO "Logs" 
                ("Id", "Timestamp", "SourceUserId", "SourceUserName", "SourceHackerName",
                 "TargetUserId", "TargetUserName", "LogType", "LogData", 
                 "SubnetworkId", "SubnetworkName")
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                ON CONFLICT ("Id") DO NOTHING
            """, (convert_id(item.get('_id')), item.get('Timestamp'),
                 item.get('SourceUserId', ''), item.get('SourceUserName', ''),
                 item.get('SourceHackerName'), item.get('TargetUserId', ''),
                 item.get('TargetUserName', ''), log_type,
                 item.get('LogData', ''), item.get('SubnetworkId', ''),
                 item.get('SubnetworkName', '')))
            success += 1
        except Exception as e:
            log_error(f"Log: {e}")
            failed += 1
    conn.commit()
    return success, failed

def main():
    log_info("="*60)
    log_info("Direct PostgreSQL Data Loader")
    log_info("="*60)
    
    if not os.path.exists(DATA_DIR):
        log_error(f"Data directory not found: {DATA_DIR}")
        sys.exit(1)
    
    conn = get_db_connection()
    log_info(f"Connected to PostgreSQL at {DB_HOST}:{DB_PORT}/{DB_NAME}\n")
    
    total_success, total_failed = 0, 0
    
    # Load order respects foreign key dependencies
    loaders = [
        ('Auths.json', load_auths, 'auths'),
        ('Networks.json', load_networks, 'networks'),
        ('Subnetworks.json', load_subnetworks, 'subnetworks'),
        ('Users.json', load_users, 'users'),
        ('Accounts.json', load_accounts, 'accounts'),
        ('HackConfigs.json', load_hack_configs, 'hack configs'),
        ('ProgramCodesMap.json', load_program_codes, 'program codes'),
        ('ObscuredCodesMap.json', load_obscured_codes, 'obscured codes'),
        ('Gigs.json', load_gigs, 'gigs'),
        ('Conversations.json', load_conversations, 'conversations'),
        ('Anonymized.json', load_anonymized, 'anonymized users'),
        ('Logs.json', load_logs, 'logs'),
    ]
    
    for filename, loader_func, name in loaders:
        file_path = os.path.join(DATA_DIR, filename)
        data = load_json_file(file_path)
        
        if data is None:
            log_warn(f"File not found: {filename}, skipping...")
            continue
        
        log_info(f"Loading {name} from {filename}...")
        try:
            success, failed = loader_func(conn, data)
            log_info(f"✓ Loaded {success} {name}")
            total_success += success
            total_failed += failed
        except Exception as e:
            log_error(f"Failed to load {name}: {e}")
            total_failed += 1
    
    conn.close()
    
    log_info("")
    log_info("="*60)
    log_info(f"Data Load Complete: {total_success} records loaded, {total_failed} failed")
    log_info("="*60)
    
    return 0 if total_failed == 0 else 1

if __name__ == '__main__':
    sys.exit(main())
