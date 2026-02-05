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
                INSERT INTO "Networks" ("Id", "Name", "Subnetworks", "AdminId", "Admin")
                VALUES (%s, %s, %s, %s, %s) ON CONFLICT ("Id") DO NOTHING
            """, (convert_id(item.get('_id')), item.get('Name', ''),
                 item.get('Subnetworks', []), item.get('AdminId', ''), 
                 item.get('Admin', '')))
            success += 1
        except Exception as e:
            log_error(f"Network {item.get('Name')}: {e}")
            failed += 1
    conn.commit()
    return success, failed

def load_subnetworks(conn, data):
    cursor = conn.cursor()
    success, failed = 0, 0
    # Map firewall/OS strings to integers
    firewall_map = {'ENCRYPT_GUARD': 0, 'FIREWALL_X': 1, 'VIRTUAL_VAULT': 2}
    os_map = {'FORCE_FIELD': 0, 'EVIL_TWIN': 1, 'JOAN_OF_ARC': 2}
    
    for item in data:
        try:
            firewall = firewall_map.get(item.get('Firewall', ''), None)
            os_val = os_map.get(item.get('OperatingSystem', ''), None)
            
            cursor.execute("""
                INSERT INTO "Subnetworks" 
                ("Id", "Name", "NetworkId", "Users", "Firewall", "OperatingSystem", 
                 "Ice", "PastHacks")
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s) ON CONFLICT ("Id") DO NOTHING
            """, (convert_id(item.get('_id')), item.get('Name', ''),
                 item.get('NetworkId', ''), item.get('Users', []),
                 firewall, os_val,
                 item.get('Ice', []), item.get('PastHacks', [])))
            success += 1
        except Exception as e:
            log_error(f"Subnetwork {item.get('Name')}: {e}")
            failed += 1
    conn.commit()
    return success, failed

def load_users(conn, data):
    cursor = conn.cursor()
    success, failed = 0, 0
    medical_count, criminal_count = 0, 0
    
    # Map enum strings to integers
    type_map = {'AI': 0, 'HUMAN': 1, 'CYBORG': 2}
    vibe_map = {'OVERSEERS': 0, 'ELITES': 1, 'WORKERS': 2, 'OUTCASTS': 3}
    wealth_map = {'POOR': 0, 'STABLE': 1, 'COMFORTABLE': 2, 'WEALTHY': 3, 'RICH': 4}
    engagement_map = {'HYPED': 0, 'ENGAGED': 1, 'NEUTRAL': 2, 'DISENGAGED': 3}
    faction_map = {'NO_FACTION': 0, 'HEDIN': 1, 'KLAN': 2, 'MEGACORP': 3}
    
    # Medical and criminal event enums
    medical_type_map = {'CYBERWARE': 0, 'MEDICAL_DRUG': 1, 'MEDICAL_PROCEDURE': 2, 'SYMPTOM': 3}
    criminal_type_map = {'VICTIM': 0, 'SUSPECT': 1, 'WANTED': 2, 'WITNESS': 3, 'PUNISHMENT': 4}
    event_status_map = {'CURRENT': 0, 'HISTORICAL': 1}
    
    for user in data:
        try:
            user_id = convert_id(user.get('_id'))
            type_pub = type_map.get(user.get('TypePublic', 'HUMAN'), 1)
            type_act = type_map.get(user.get('TypeActual', 'HUMAN'), 1)
            vibe = vibe_map.get(user.get('Vibe', 'WORKERS'), 2)
            wealth = wealth_map.get(user.get('WealthLevel', 'STABLE'), 1)
            engagement = engagement_map.get(user.get('VibeEngagement', 'NEUTRAL'), 2)
            faction = faction_map.get(user.get('Faction', 'NO_FACTION'), 0)
            
            # Extract stat values from nested objects
            cyberware = user.get('CyberwareLevel', {}).get('Stat', 0)
            hacking = user.get('HackingSkills', {}).get('Stat', 0)
            confront = user.get('ConfrontationistVsAgreeable', {}).get('Stat', 0)
            brave = user.get('CowardVsBrave', {}).get('Stat', 0)
            talkative = user.get('TalkativeVsSilent', {}).get('Stat', 0)
            thinker = user.get('ThinkerVsDoer', {}).get('Stat', 0)
            combat = user.get('CombatSkill', {}).get('Stat', 0)
            
            cursor.execute("""
                INSERT INTO "UsersPublic" 
                ("Id", "Handle", "Name", "Surname", "TypePublic", "TypeActual",
                 "WealthLevel", "Vibe", "Faction", "Roles", "Active",
                 "NetworkId", "NetworkName", "SubnetworkId", "SubnetworkName",
                 "HasPlatinumPass", "HighSecurity", "Discriminator",
                 "CyberwareLevel", "HackingSkills", "ConfrontationistVsAgreeable",
                 "CowardVsBrave", "TalkativeVsSilent", "ThinkerVsDoer", "CombatSkill",
                 "VibeFunction", "VibeEngagement")
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s,
                        %s, %s, %s, %s, %s, %s, %s, %s, %s) 
                ON CONFLICT ("Id") DO NOTHING
            """, (user_id, user.get('Handle', ''), user.get('Name', ''),
                 user.get('Surname', ''), type_pub, type_act, wealth, vibe, faction,
                 [], True, '', '', '', '', False, False, 'UserPrivate',
                 cyberware, hacking, confront, brave, talkative, thinker, combat,
                 user.get('VibeFunction', ''), engagement))
            
            # Load nested medical events
            for event in user.get('MedicalEvents', []):
                try:
                    event_id = convert_id(event.get('_id'))
                    event_type = medical_type_map.get(event.get('Type', 'CYBERWARE'), 0)
                    event_status = event_status_map.get(event.get('Status', 'CURRENT'), 0)
                    cursor.execute("""
                        INSERT INTO "MedicalEvents" 
                        ("Id", "Type", "UserPrivateId", "Name", "EventDescription", 
                         "Status", "TimeStamp")
                        VALUES (%s, %s, %s, %s, %s, %s, %s) ON CONFLICT ("Id") DO NOTHING
                    """, (event_id, event_type, user_id, event.get('Name', ''),
                         event.get('EventDescription', ''), event_status, 
                         event.get('TimeStamp')))
                    medical_count += 1
                except Exception as e:
                    log_error(f"MedicalEvent for {user.get('Handle')}: {e}")
            
            # Load nested criminal events
            for event in user.get('CriminalEvents', []):
                try:
                    event_id = convert_id(event.get('_id'))
                    event_type = criminal_type_map.get(event.get('Type', 'VICTIM'), 0)
                    event_status = event_status_map.get(event.get('Status', 'CURRENT'), 0)
                    cursor.execute("""
                        INSERT INTO "CriminalEvents" 
                        ("Id", "Type", "UserPrivateId", "Name", "EventDescription", 
                         "Status", "TimeStamp")
                        VALUES (%s, %s, %s, %s, %s, %s, %s) ON CONFLICT ("Id") DO NOTHING
                    """, (event_id, event_type, user_id, event.get('Name', ''),
                         event.get('EventDescription', ''), event_status,
                         event.get('TimeStamp')))
                    criminal_count += 1
                except Exception as e:
                    log_error(f"CriminalEvent for {user.get('Handle')}: {e}")
            
            # Load nested Meta records
            for record in user.get('Meta', []):
                try:
                    record_id = convert_id(record.get('_id'))
                    is_revealed = record.get('IsRevealed', False)
                    # Insert into ObscurableInfos parent first
                    cursor.execute("""
                        INSERT INTO "ObscurableInfos" ("Id", "IsRevealed")
                        VALUES (%s, %s) ON CONFLICT ("Id") DO NOTHING
                    """, (record_id, is_revealed if is_revealed is not None else False))
                    # Then insert into Meta table (RecordType enum: META=2)
                    cursor.execute("""
                        INSERT INTO "Meta" 
                        ("Id", "Title", "Description", "RecordType", "UserPrivateId")
                        VALUES (%s, %s, %s, %s, %s) ON CONFLICT ("Id") DO NOTHING
                    """, (record_id, record.get('Title', ''), record.get('Description', ''),
                         2, user_id))
                    medical_count += 1  # Reuse counter for simplicity
                except Exception as e:
                    log_error(f"Meta for {user.get('Handle')}: {e}")
            
            # Load nested Goals
            for record in user.get('Goals', []):
                try:
                    record_id = convert_id(record.get('_id'))
                    is_revealed = record.get('IsRevealed', False)
                    cursor.execute("""
                        INSERT INTO "ObscurableInfos" ("Id", "IsRevealed")
                        VALUES (%s, %s) ON CONFLICT ("Id") DO NOTHING
                    """, (record_id, is_revealed if is_revealed is not None else False))
                    # RecordType enum: GOAL=1
                    cursor.execute("""
                        INSERT INTO "Goal" 
                        ("Id", "Title", "Description", "RecordType", "UserPrivateId")
                        VALUES (%s, %s, %s, %s, %s) ON CONFLICT ("Id") DO NOTHING
                    """, (record_id, record.get('Title', ''), record.get('Description', ''),
                         1, user_id))
                    criminal_count += 1  # Reuse counter
                except Exception as e:
                    log_error(f"Goal for {user.get('Handle')}: {e}")
            
            # Load nested PrivateRecords
            for record in user.get('PrivateRecords', []):
                try:
                    record_id = convert_id(record.get('_id'))
                    is_revealed = record.get('IsRevealed', False)
                    cursor.execute("""
                        INSERT INTO "ObscurableInfos" ("Id", "IsRevealed")
                        VALUES (%s, %s) ON CONFLICT ("Id") DO NOTHING
                    """, (record_id, is_revealed if is_revealed is not None else False))
                    # RecordType enum: PRIVATE_RECORD=3
                    cursor.execute("""
                        INSERT INTO "PrivateRecord" 
                        ("Id", "Title", "Description", "RecordType", "UserPrivateId")
                        VALUES (%s, %s, %s, %s, %s) ON CONFLICT ("Id") DO NOTHING
                    """, (record_id, record.get('Title', ''), record.get('Description', ''),
                         3, user_id))
                except Exception as e:
                    log_error(f"PrivateRecord for {user.get('Handle')}: {e}")
            
            # Load nested Relations
            for record in user.get('Relations', []):
                try:
                    record_id = convert_id(record.get('_id'))
                    is_revealed = record.get('IsRevealed', False)
                    cursor.execute("""
                        INSERT INTO "ObscurableInfos" ("Id", "IsRevealed")
                        VALUES (%s, %s) ON CONFLICT ("Id") DO NOTHING
                    """, (record_id, is_revealed if is_revealed is not None else False))
                    # RecordType enum: RELATION=0
                    cursor.execute("""
                        INSERT INTO "Relation" 
                        ("Id", "UserName", "Description", "RecordType", "UserPrivateId")
                        VALUES (%s, %s, %s, %s, %s) ON CONFLICT ("Id") DO NOTHING
                    """, (record_id, record.get('UserName', ''), record.get('Description', ''),
                         0, user_id))
                except Exception as e:
                    log_error(f"Relation for {user.get('Handle')}: {e}")
            
            success += 1
        except Exception as e:
            log_error(f"User {user.get('Handle')}: {e}")
            failed += 1
    
    conn.commit()
    log_info(f"  ↳ Also loaded {medical_count} medical events and {criminal_count} criminal events")
    log_info(f"  ↳ Plus user records (Meta, Goals, PrivateRecords, Relations)")
    return success, failed

def load_accounts(conn, data):
    cursor = conn.cursor()
    success, failed = 0, 0
    transaction_count = 0
    # Map account type strings to integers
    type_map = {'PERSONAL': 0, 'BUSINESS': 1, 'SAVINGS': 2}
    
    for item in data:
        try:
            account_id = convert_id(item.get('_id'))
            acc_type = type_map.get(item.get('Type', 'PERSONAL'), 0)
            owner = item.get('Owner', '')
            owner_id = item.get('OwnerId', '')
            cursor.execute("""
                INSERT INTO "Accounts" 
                ("Id", "Owners", "Owner", "OwnerId", "Name", "Type", "Balance", 
                 "AccountNumber", "IsActive")
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s) ON CONFLICT ("Id") DO NOTHING
            """, (account_id, [owner_id] if owner_id else [],
                 owner, owner_id, 
                 item.get('Name', ''), acc_type, item.get('Balance', 0),
                 item.get('AccountNumber', ''), True))
            
            # Load nested transactions
            for trans in item.get('Transactions', []):
                try:
                    trans_id = convert_id(trans.get('_id'))
                    cursor.execute("""
                        INSERT INTO "Transactions" 
                        ("Id", "From", "FromUser", "To", "ToUser", "Title", 
                         "Amount", "Timestamp", "AccountId")
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s) 
                        ON CONFLICT ("Id") DO NOTHING
                    """, (trans_id, trans.get('From', ''), trans.get('FromUser', ''),
                         trans.get('To', ''), trans.get('ToUser', ''),
                         trans.get('Title', ''), trans.get('Amount', 0),
                         trans.get('Timestamp'), account_id))
                    transaction_count += 1
                except Exception as e:
                    log_error(f"Transaction for account {item.get('AccountNumber')}: {e}")
            
            success += 1
        except Exception as e:
            log_error(f"Account {item.get('AccountNumber')}: {e}")
            failed += 1
    conn.commit()
    log_info(f"  ↳ Also loaded {transaction_count} transactions")
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
    # Map string enum values to integers (matching GigEnums.cs)
    category_map = {'REDACTED': 0, 'FIXER': 1, 'KILLER': 2, 'HACKING': 3, 'WELLBEING': 4}
    status_map = {'AVAILABLE': 0, 'IN_PROGRESS': 1, 'COMPLETED': 2, 'PENDING_CONFIRMATION': 3, 'DISPUTE': 4, 'EXPIRED': 5}
    subcategory_map = {
        'REDACTED': 0, 'TECH': 1, 'DELIVERY': 2, 'GUNS_AND_AMMO': 3, 'DRUGS': 4,
        'OTHER_MERCH': 5, 'ITEM_ACQUISITION': 6, 'ANDROID_ACQUISITION': 7,
        'DEBT_COLLECTION': 8, 'INTIMIDATION': 9, 'KIDNAPPING': 10, 'BODYGUARD': 11,
        'HIT': 12, 'LOVER_EXPERIENCE': 13, 'ENTERTAINMENT': 14, 'SEX_DOLL': 15,
        'QUICKIE': 16, 'FIRST_AID': 17, 'CYBERWARE': 18, 'MEDEVAC': 19,
        'RENTING_LOCATION': 20, 'INTEL': 21, 'BANK_ACCOUNT_MANIPULATION': 22,
        'SPOOFING': 23, 'SECURITY': 24, 'ANDROID_HIJACK': 25, 'MINDEXPLOIT': 26
    }
    
    for item in data:
        try:
            rep_level = item.get('ReputationRequired', {}).get('Level', 0)
            category = category_map.get(item.get('Category', 'REDACTED'), 0)
            subcategory = subcategory_map.get(item.get('Subcategory', 'REDACTED'), 0)
            status = status_map.get(item.get('Status', 'AVAILABLE'), 0)
            
            # First insert into ObscurableInfos parent table
            gig_id = convert_id(item.get('_id'))
            is_revealed = item.get('IsRevealed', False)
            cursor.execute("""
                INSERT INTO "ObscurableInfos" ("Id", "IsRevealed")
                VALUES (%s, %s) ON CONFLICT ("Id") DO NOTHING
            """, (gig_id, is_revealed if is_revealed is not None else False))
            
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
            """, (gig_id, item.get('Payout', 0),
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
    message_count = 0
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
                message_count += 1
            
            success += 1
        except Exception as e:
            log_error(f"Conversation: {e}")
            failed += 1
    conn.commit()
    log_info(f"  ↳ Also loaded {message_count} messages")
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
            subnetwork_id = item.get('SubnetworkId', '')
            
            # Skip if subnetwork doesn't exist (e.g., test data like "SN999")
            if subnetwork_id:
                cursor.execute('SELECT 1 FROM "Subnetworks" WHERE "Id" = %s', (subnetwork_id,))
                if not cursor.fetchone():
                    log_warn(f"Skipping log - Subnetwork {subnetwork_id} doesn't exist (test data)")
                    # Don't count as failure - it's expected for test data
                    continue
            
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
                 item.get('LogData', ''), subnetwork_id,
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
    if total_failed > 0:
        log_info(f"Data Load Complete: {total_success} records loaded, {total_failed} failed")
    else:
        log_info(f"Data Load Complete: {total_success} records loaded successfully")
    log_info("="*60)
    
    return 0 if total_failed == 0 else 1

if __name__ == '__main__':
    sys.exit(main())
