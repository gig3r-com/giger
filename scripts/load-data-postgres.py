#!/usr/bin/env python3
"""
Direct PostgreSQL Data Loader for Giger
Loads JSON files directly into PostgreSQL database bypassing the API.
"""

import json
import psycopg2
import sys
import os
from datetime import datetime
import uuid

# Configuration from environment variables
DB_HOST = os.getenv('POSTGRES_HOST', 'localhost')
DB_PORT = os.getenv('POSTGRES_PORT', '5432')
DB_NAME = os.getenv('POSTGRES_DB', 'giger')
DB_USER = os.getenv('POSTGRES_USER', 'giger')
DB_PASSWORD = os.getenv('POSTGRES_PASSWORD', 'giger')
DATA_DIR = os.getenv('DATA_DIR', './data/mongo')

# Color output
GREEN = '\033[0;32m'
RED = '\033[0;31m'
YELLOW = '\033[1;33m'
BLUE = '\033[0;34m'
NC = '\033[0m'  # No Color


def log_info(msg):
    print(f"{GREEN}[INFO]{NC} {msg}")


def log_error(msg):
    print(f"{RED}[ERROR]{NC} {msg}", file=sys.stderr)


def log_warn(msg):
    print(f"{YELLOW}[WARN]{NC} {msg}")


def log_progress(msg):
    print(f"{BLUE}[PROGRESS]{NC} {msg}")


def get_db_connection():
    """Create database connection."""
    try:
        conn = psycopg2.connect(
            host=DB_HOST,
            port=DB_PORT,
            dbname=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD
        )
        return conn
    except Exception as e:
        log_error(f"Failed to connect to database: {e}")
        sys.exit(1)


def convert_id(mongo_id):
    """Convert MongoDB _id to PostgreSQL Id format."""
    if isinstance(mongo_id, dict) and '$oid' in mongo_id:
        return mongo_id['$oid']
    return str(mongo_id) if mongo_id else str(uuid.uuid4())


def load_auths(conn, file_path):
    """Load Auths table."""
    log_info(f"Loading Auths from {file_path}...")
    
    with open(file_path, 'r') as f:
        auths = json.load(f)
    
    cursor = conn.cursor()
    success = 0
    failed = 0
    
    for auth in auths:
        try:
            auth_id = convert_id(auth.get('_id'))
            cursor.execute("""
                INSERT INTO "Auths" ("Id", "Name", "AccessLevel", "UserId")
                VALUES (%s, %s, %s, %s)
                ON CONFLICT ("Id") DO NOTHING
            """, (
                auth_id,
                auth.get('Name', ''),
                auth.get('AccessLevel', 0),
                auth.get('UserId', '')
            ))
            success += 1
        except Exception as e:
            log_error(f"Failed to insert auth {auth.get('_id')}: {e}")
            failed += 1
    
    conn.commit()
    log_info(f"✓ Auths: {success} loaded, {failed} failed")
    return success, failed


def load_networks(conn, file_path):
    """Load Networks table."""
    log_info(f"Loading Networks from {file_path}...")
    
    with open(file_path, 'r') as f:
        networks = json.load(f)
    
    cursor = conn.cursor()
    success = 0
    failed = 0
    
    for network in networks:
        try:
            network_id = convert_id(network.get('_id'))
            cursor.execute("""
                INSERT INTO "Networks" ("Id", "Name", "Tier", "Faction", "Type")
                VALUES (%s, %s, %s, %s, %s)
                ON CONFLICT ("Id") DO NOTHING
            """, (
                network_id,
                network.get('Name', ''),
                network.get('Tier', 0),
                network.get('Faction', ''),
                network.get('Type', '')
            ))
            success += 1
        except Exception as e:
            log_error(f"Failed to insert network {network.get('_id')}: {e}")
            failed += 1
    
    conn.commit()
    log_info(f"✓ Networks: {success} loaded, {failed} failed")
    return success, failed


def load_users(conn, file_path):
    """Load Users table (UsersPublic and UsersPrivate)."""
    log_info(f"Loading Users from {file_path}...")
    
    with open(file_path, 'r') as f:
        users = json.load(f)
    
    cursor = conn.cursor()
    success = 0
    failed = 0
    
    for user in users:
        try:
            user_id = convert_id(user.get('_id'))
            
            # Insert into UsersPublic (base table)
            cursor.execute("""
                INSERT INTO "UsersPublic" (
                    "Id", "Handle", "HackerName", "Name", "Surname",
                    "TypePublic", "TypeActual", "WealthLevel", "Vibe",
                    "Faction", "Implants", "Skills", "Personality"
                )
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                ON CONFLICT ("Id") DO NOTHING
            """, (
                user_id,
                user.get('Handle', ''),
                user.get('HackerName', ''),
                user.get('Name', ''),
                user.get('Surname', ''),
                user.get('TypePublic', ''),
                user.get('TypeActual', ''),
                user.get('WealthLevel', ''),
                user.get('Vibe', ''),
                user.get('Faction', ''),
                json.dumps(user.get('Implants', [])),
                json.dumps(user.get('Skills', {})),
                json.dumps(user.get('Personality', {}))
            ))
            
            success += 1
        except Exception as e:
            log_error(f"Failed to insert user {user.get('Handle', user.get('_id'))}: {e}")
            failed += 1
    
    conn.commit()
    log_info(f"✓ Users: {success} loaded, {failed} failed")
    return success, failed


def load_accounts(conn, file_path):
    """Load Accounts (banking) table."""
    log_info(f"Loading Accounts from {file_path}...")
    
    with open(file_path, 'r') as f:
        accounts = json.load(f)
    
    cursor = conn.cursor()
    success = 0
    failed = 0
    
    for account in accounts:
        try:
            account_id = convert_id(account.get('_id'))
            cursor.execute("""
                INSERT INTO "Accounts" (
                    "Id", "UserId", "AccountNumber", "Balance", "Type"
                )
                VALUES (%s, %s, %s, %s, %s)
                ON CONFLICT ("Id") DO NOTHING
            """, (
                account_id,
                account.get('UserId', ''),
                account.get('AccountNumber', ''),
                account.get('Balance', 0),
                account.get('Type', '')
            ))
            success += 1
        except Exception as e:
            log_error(f"Failed to insert account {account.get('_id')}: {e}")
            failed += 1
    
    conn.commit()
    log_info(f"✓ Accounts: {success} loaded, {failed} failed")
    return success, failed


def main():
    """Main data loading function."""
    log_info("=" * 60)
    log_info("Starting Direct PostgreSQL Data Load")
    log_info("=" * 60)
    
    # Check if data directory exists
    if not os.path.exists(DATA_DIR):
        log_error(f"Data directory not found: {DATA_DIR}")
        sys.exit(1)
    
    # Connect to database
    conn = get_db_connection()
    log_info(f"Connected to PostgreSQL at {DB_HOST}:{DB_PORT}/{DB_NAME}")
    
    total_success = 0
    total_failed = 0
    
    # Load data in order to respect foreign key dependencies
    data_files = [
        ('Auths.json', load_auths),
        ('Networks.json', load_networks),
        ('Users.json', load_users),
        ('Accounts.json', load_accounts),
    ]
    
    for filename, loader_func in data_files:
        file_path = os.path.join(DATA_DIR, filename)
        if os.path.exists(file_path):
            try:
                success, failed = loader_func(conn, file_path)
                total_success += success
                total_failed += failed
            except Exception as e:
                log_error(f"Error loading {filename}: {e}")
                total_failed += 1
        else:
            log_warn(f"File not found: {file_path}, skipping...")
    
    conn.close()
    
    log_info("=" * 60)
    log_info(f"Data Load Complete")
    log_info(f"Total: {total_success} records loaded, {total_failed} failed")
    log_info("=" * 60)
    
    return 0 if total_failed == 0 else 1


if __name__ == '__main__':
    sys.exit(main())
