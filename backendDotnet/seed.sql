-- =============================================
-- EXTENSIONS
-- =============================================
CREATE EXTENSION IF NOT EXISTS hstore;

-- =============================================
-- CREATE TABLES
-- =============================================

CREATE TABLE IF NOT EXISTS "Auths" (
    "Id"          VARCHAR(50)  PRIMARY KEY,
    "Username"    VARCHAR(50)  NOT NULL,
    "HackerName"  VARCHAR(50)  NULL,
    "Password"    VARCHAR(255) NOT NULL,
    "AuthToken"   VARCHAR(255) NULL
);

CREATE TABLE IF NOT EXISTS "Users" (
    "Id"                          VARCHAR(50)  PRIMARY KEY,
    "Roles"                       TEXT[]       NOT NULL DEFAULT '{}',
    "Handle"                      VARCHAR(100) NOT NULL,
    "Summary"                     TEXT         NULL,
    "Active"                      BOOLEAN      NOT NULL DEFAULT TRUE,
    "Name"                        VARCHAR(100) NULL,
    "Surname"                     VARCHAR(100) NULL,
    "Faction"                     VARCHAR(100) NULL,
    "FactionRankPublic"           VARCHAR(100) NULL,
    "FactionRankActual"           VARCHAR(100) NULL,
    "SpeciesPublic"               VARCHAR(100) NULL,
    "SpeciesActual"               VARCHAR(100) NULL,
    "Vibe"                        VARCHAR(100) NULL,
    "VibeLevel"                   INT          NOT NULL DEFAULT 0,
    "ConfrontationistVsAgreeable" INT          NOT NULL DEFAULT 0,
    "CowardVsBrave"               INT          NOT NULL DEFAULT 0,
    "TalkativeVsSilent"           INT          NOT NULL DEFAULT 0,
    "ThinkerVsDoer"               INT          NOT NULL DEFAULT 0,
    "Affiliation"                 VARCHAR(100) NULL,
    "Profession"                  VARCHAR(100) NULL,
    "Wealth"                      VARCHAR(50)  NULL,
    "CyberwareLevel"              INT          NOT NULL DEFAULT 0,
    "Network"                     VARCHAR(100) NULL,
    "Subnetwork"                  VARCHAR(100) NULL,
    "CombatSkill"                 INT          NOT NULL DEFAULT 0,
    "HackerSkill"                 INT          NOT NULL DEFAULT 0,
    "FavoriteUsers"               TEXT[]       NOT NULL DEFAULT '{}',
    "MainAccount"                 VARCHAR(50)  NULL,
    "PersonalIce"                 INT          NOT NULL DEFAULT 0,
    "HackerName"                  VARCHAR(100) NULL,
    "Exploits"                    TEXT[]       NOT NULL DEFAULT '{}',
    "EpsilonNotes"                TEXT         NULL,
    "EpsilonBankingNotes"         TEXT         NULL,
    "EpsilonConversationNotes"    TEXT         NULL,
    "EpsilonConversationsNotes"   TEXT         NULL,
    "EpsilonPlots"                TEXT         NULL,
    "GigReputationDb"             JSONB        NOT NULL DEFAULT '{}',
    "GigReputationTrack"          JSONB        NOT NULL DEFAULT '{}',
    "EpsilonData"                 JSONB        NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS "Accounts" (
    "Id"            VARCHAR(50)    PRIMARY KEY,
    "Type"          VARCHAR(20)    NOT NULL,
    "Name"          VARCHAR(100)   NULL,
    "AccountNumber" VARCHAR(50)    NOT NULL UNIQUE,
    "Balance"       DECIMAL(18,2)  NOT NULL DEFAULT 0,
    "Owners"        TEXT[]         NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS "Transactions" (
    "Id"           VARCHAR(50)   PRIMARY KEY,
    "From"         VARCHAR(50)   NULL,
    "To"           VARCHAR(50)   NULL,
    "Amount"       DECIMAL(18,2) NOT NULL,
    "Timestamp"    TIMESTAMP     NULL,
    "Title"        TEXT          NULL,
    "OrderingUser" VARCHAR(100)  NULL,
    "HackData"     TEXT          NULL
);

CREATE TABLE IF NOT EXISTS "Conversations" (
    "Id"               VARCHAR(50) PRIMARY KEY,
    "Title"            TEXT        NULL,
    "Participants"     TEXT[]      NOT NULL DEFAULT '{}',
    "AnonymizedUsers"  TEXT[]      NOT NULL DEFAULT '{}',
    "GigConversation"  BOOLEAN     NOT NULL DEFAULT FALSE,
    "Hackers"          TEXT[]      NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS "Messages" (
    "Id"               VARCHAR(50)  PRIMARY KEY,
    "Timestamp"        TIMESTAMP    NOT NULL,
    "Sender"           VARCHAR(100) NOT NULL,
    "Type"             VARCHAR(50)  NULL,
    "Data"             TEXT         NOT NULL,
    "ReadBy"           TEXT[]       NOT NULL DEFAULT '{}',
    "Hacker"           VARCHAR(100) NULL,
    "EpsilonNote"      TEXT         NULL,
    "ConversationId"   VARCHAR(50)  NOT NULL REFERENCES "Conversations"("Id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "Gigs" (
    "Id"                  VARCHAR(50)   PRIMARY KEY,
    "Title"               TEXT          NOT NULL,
    "Description"         TEXT          NULL,
    "DescriptionDetailed" TEXT          NULL,
    "Payout"              DECIMAL(18,2) NOT NULL,
    "Status"              VARCHAR(50)   NOT NULL,
    "Category"            VARCHAR(100)  NULL,
    "Subcategory"         VARCHAR(100)  NULL,
    "ReputationRequired"  INT           NOT NULL DEFAULT 0,
    "IsAnonymizedAuthor"  BOOLEAN       NOT NULL DEFAULT FALSE,
    "Mode"                VARCHAR(50)   NOT NULL,
    "IsRevealedTo"        TEXT[]        NOT NULL DEFAULT '{}',
    "AuthorId"            VARCHAR(50)   NULL,
    "AuthorHandle"        VARCHAR(100)  NULL,
    "WorkerId"            VARCHAR(50)   NULL,
    "WorkerHandle"        VARCHAR(100)  NULL,
    "WorkerAccountNumber" VARCHAR(50)   NULL,
    "ClientHandle"        VARCHAR(100)  NULL,
    "ClientAccountNumber" VARCHAR(50)   NULL,
    "ConversationId"      VARCHAR(50)   NULL,
    "CreatedAt"           TIMESTAMP     NOT NULL,
    "ComplaintReason"     TEXT          NULL
);

CREATE TABLE IF NOT EXISTS "GigUpdates" (
    "Id"            VARCHAR(50)  PRIMARY KEY,
    "From"          VARCHAR(50)  NOT NULL,
    "To"            VARCHAR(50)  NOT NULL,
    "Date"          TIMESTAMP    NOT NULL,
    "SourceHandlle" VARCHAR(100) NULL,
    "GigFK"         VARCHAR(50)  NOT NULL REFERENCES "Gigs"("Id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "Networks" (
    "Id"                 VARCHAR(50)  PRIMARY KEY,
    "Name"               VARCHAR(100) NOT NULL,
    "Admin"              VARCHAR(100) NULL,
    "Subnetworks"        TEXT[]       NOT NULL DEFAULT '{}',
    "Nodes"              HSTORE       NOT NULL DEFAULT '',
    "Data"               HSTORE       NOT NULL DEFAULT '',
    "EpsilonDescription" TEXT         NULL
);

CREATE TABLE IF NOT EXISTS "Subnetworks" (
    "Id"              VARCHAR(50)  PRIMARY KEY,
    "Name"            VARCHAR(100) NOT NULL,
    "Network"         VARCHAR(100) NOT NULL,
    "Users"           TEXT[]       NOT NULL DEFAULT '{}',
    "Firewall"        VARCHAR(100) NULL,
    "OperatingSystem" VARCHAR(100) NULL,
    "Ice"             TEXT[]       NOT NULL DEFAULT '{}',
    "AccessPoint"     VARCHAR(100) NULL,
    "PastHacks"       TEXT[]       NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS "Logs" (
    "Id"         VARCHAR(50)  PRIMARY KEY,
    "Timestamp"  TIMESTAMP    NOT NULL,
    "SourceUser" VARCHAR(100) NULL,
    "TargetUser" VARCHAR(100) NULL,
    "LogType"    VARCHAR(100) NOT NULL,
    "LogData"    TEXT         NULL,
    "Subnetwork" VARCHAR(100) NULL
);

CREATE TABLE IF NOT EXISTS "RecordTypes" (
    "Id"             VARCHAR(50)  PRIMARY KEY,
    "Type"           VARCHAR(50)  NOT NULL,
    "User"           VARCHAR(100) NOT NULL,
    "Category"       VARCHAR(100) NULL,
    "SubCategory"    VARCHAR(100) NULL,
    "Title"          TEXT         NOT NULL,
    "Data"           TEXT         NULL,
    "Timestamp"      TIMESTAMP    NULL,
    "IsRevealed"     BOOLEAN      NOT NULL DEFAULT FALSE,
    "RevealCode"     VARCHAR(100) NULL,
    "IsEncrypted"    BOOLEAN      NOT NULL DEFAULT FALSE,
    "EncryptionCode" VARCHAR(100) NULL,
    "HackData"       TEXT         NULL
);

CREATE TABLE IF NOT EXISTS "Plots" (
    "Id"          VARCHAR(50)  PRIMARY KEY,
    "Name"        VARCHAR(200) NOT NULL,
    "Description" TEXT         NULL,
    "Users"       TEXT[]       NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS "ProgramCodes" (
    "Id"      VARCHAR(50)  PRIMARY KEY,
    "Code"    VARCHAR(100) NOT NULL,
    "Program" VARCHAR(100) NOT NULL,
    "IsUsed"  BOOLEAN      NOT NULL DEFAULT FALSE,
    "Creator" VARCHAR(100) NULL,
    "Owner"   VARCHAR(100) NULL
);

CREATE TABLE IF NOT EXISTS "HackConfig" (
    "Id"     VARCHAR(50) PRIMARY KEY,
    "Config" TEXT        NOT NULL
);

CREATE TABLE IF NOT EXISTS "RecordsHashes" (
    "Id"             VARCHAR(50) PRIMARY KEY,
    "HardRecords"    INT         NOT NULL DEFAULT 0,
    "OffGameRecords" INT         NOT NULL DEFAULT 0,
    "MindRecords"    INT         NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS "GigerConfig" (
    "Id"                              VARCHAR(50) PRIMARY KEY,
    "MaxGigsPerUser"                  INT         NOT NULL DEFAULT 5,
    "GigFeePercentage"                INT         NOT NULL DEFAULT 10,
    "ModeratorCommissionPercentage"   INT         NOT NULL DEFAULT 5
);

-- =============================================
-- INDEXES
-- =============================================
CREATE INDEX IF NOT EXISTS idx_users_handle         ON "Users"        ("Handle");
CREATE INDEX IF NOT EXISTS idx_accounts_number      ON "Accounts"     ("AccountNumber");
CREATE INDEX IF NOT EXISTS idx_transactions_from    ON "Transactions" ("From");
CREATE INDEX IF NOT EXISTS idx_transactions_to      ON "Transactions" ("To");
CREATE INDEX IF NOT EXISTS idx_messages_conv        ON "Messages"     ("ConversationId");
CREATE INDEX IF NOT EXISTS idx_gigupdates_gigfk     ON "GigUpdates"   ("GigFK");
CREATE INDEX IF NOT EXISTS idx_records_user         ON "RecordTypes"  ("User");
CREATE INDEX IF NOT EXISTS idx_logs_subnetwork      ON "Logs"         ("Subnetwork");
CREATE INDEX IF NOT EXISTS idx_plots_name           ON "Plots"        ("Name");

-- =============================================
-- AUTHS
-- =============================================
INSERT INTO "Auths" ("Id", "Username", "HackerName", "Password", "AuthToken") VALUES
('auth-001', 'shadowbyte', 'gh0st', 'hashed_pass_1', NULL),
('auth-002', 'ironclad', NULL, 'hashed_pass_2', NULL),
('auth-003', 'vexmira', 'vex_null', 'hashed_pass_3', NULL);

-- =============================================
-- USERS
-- =============================================
INSERT INTO "Users" (
    "Id", "Roles", "Handle", "Summary", "Active", "Name", "Surname",
    "Faction", "FactionRankPublic", "FactionRankActual",
    "SpeciesPublic", "SpeciesActual", "Vibe", "VibeLevel",
    "ConfrontationistVsAgreeable", "CowardVsBrave", "TalkativeVsSilent", "ThinkerVsDoer",
    "Affiliation", "Profession", "Wealth", "CyberwareLevel",
    "Network", "Subnetwork", "CombatSkill", "HackerSkill",
    "FavoriteUsers", "MainAccount", "PersonalIce", "HackerName", "Exploits",
    "EpsilonNotes", "EpsilonBankingNotes", "EpsilonConversationNotes",
    "EpsilonConversationsNotes", "EpsilonPlots",
    "GigReputationDb", "EpsilonData"
) VALUES
(
    'user-001', ARRAY['PLAYER'], 'shadowbyte', 'A ghost in the machine.', true,
    'Sam', 'Voss', 'Gunners', 'Soldier', 'Lieutenant',
    'Human', 'Human', 'Cool', 7,
    3, 7, 5, 6,
    'Free Corps', 'Mercenary', 'Comfortable', 4,
    'DarkNet', 'ShadowSub', 8, 5,
    ARRAY['vexmira'], 'ACC-1001', 3, 'gh0st', ARRAY['ice_breaker'],
    'Test epsilon note', 'Banking note', 'Conv note',
    '[{"participants":["shadowbyte","ironclad"],"notes":"test"}]', 'Plot notes',
    '{"combat":5,"hacking":3}'::jsonb, '{"key1":"val1"}'::jsonb
),
(
    'user-002', ARRAY['PLAYER', 'MODERATOR'], 'ironclad', 'Built like a tank.', true,
    'Rex', 'Muller', 'Corps', 'Enforcer', 'Captain',
    'Human', 'Cyborg', 'Aggressive', 9,
    8, 6, 3, 4,
    'Ironworks', 'Security', 'Affluent', 7,
    'CorpNet', 'CorpSub1', 9, 2,
    ARRAY['shadowbyte'], 'ACC-2001', 5, NULL, ARRAY[]::text[],
    NULL, NULL, NULL, NULL, NULL,
    '{"combat":8}'::jsonb, '{}'::jsonb
),
(
    'user-003', ARRAY['PLAYER'], 'vexmira', 'Digital phantom.', true,
    'Mira', 'Vex', 'Hackers', 'Operative', 'Ghost',
    'Human', 'Human', 'Mysterious', 6,
    2, 5, 8, 9,
    'Null Syndicate', 'Hacker', 'Struggling', 2,
    'DarkNet', 'ShadowSub', 3, 10,
    ARRAY[]::text[], 'ACC-3001', 8, 'vex_null', ARRAY['deep_scan', 'trace_kill'],
    NULL, NULL, NULL, NULL, NULL,
    '{"hacking":9,"recon":7}'::jsonb, '{"hidden":"data"}'::jsonb
);

-- =============================================
-- ACCOUNTS
-- =============================================
INSERT INTO "Accounts" ("Id", "Type", "Name", "AccountNumber", "Balance", "Owners") VALUES
('acc-001', 'PRIVATE', 'Sam Voss Account',    'ACC-1001', 1500.00, ARRAY['shadowbyte']),
('acc-002', 'PRIVATE', 'Rex Muller Account',  'ACC-2001', 8200.00, ARRAY['ironclad']),
('acc-003', 'PRIVATE', 'Mira Vex Account',    'ACC-3001', 320.50,  ARRAY['vexmira']),
('acc-004', 'BUSINESS','Gunners Corp Fund',   'ACC-9001', 50000.00,ARRAY['ironclad', 'shadowbyte']);

-- =============================================
-- TRANSACTIONS
-- =============================================
INSERT INTO "Transactions" ("Id", "From", "To", "Amount", "Timestamp", "Title", "OrderingUser", "HackData") VALUES
('trx-001', 'ACC-1001', 'ACC-3001', 200.00,  '2025-01-10 12:00:00', 'Gig payout',      'shadowbyte', NULL),
('trx-002', 'ACC-9001', 'ACC-2001', 1000.00, '2025-01-11 09:30:00', 'Salary',          'ironclad',   NULL),
('trx-003', 'ACC-2001', 'ACC-3001', 150.00,  '2025-01-12 17:45:00', 'Debt repayment',  NULL,         NULL),
('trx-004', 'ACC-3001', 'ACC-1001', 50.00,   '2025-01-13 08:00:00', 'Hacked transfer', 'vexmira',    'HACKED::trace_kill');

-- =============================================
-- CONVERSATIONS
-- =============================================
INSERT INTO "Conversations" ("Id", "Title", "Participants", "AnonymizedUsers", "GigConversation", "Hackers") VALUES
('conv-001', 'Job Discussion',    ARRAY['shadowbyte', 'ironclad'], ARRAY[]::text[], false, ARRAY[]::text[]),
('conv-002', 'Gig #1 Chat',       ARRAY['shadowbyte', 'vexmira'],  ARRAY['vexmira'], true,  ARRAY[]::text[]),
('conv-003', 'Encrypted Channel', ARRAY['vexmira', 'ironclad'],    ARRAY[]::text[], false, ARRAY['vexmira']);

-- =============================================
-- MESSAGES
-- =============================================
INSERT INTO "Messages" ("Id", "Timestamp", "Sender", "Type", "Data", "ReadBy", "Hacker", "EpsilonNote", "ConversationId") VALUES
('msg-001', '2025-01-10 10:00:00', 'shadowbyte', 'TEXT', 'Hey, are you in for the gig?',    ARRAY['shadowbyte', 'ironclad'], NULL,       NULL,           'conv-001'),
('msg-002', '2025-01-10 10:05:00', 'ironclad',   'TEXT', 'Sure, what is the payout?',       ARRAY['ironclad'],               NULL,       NULL,           'conv-001'),
('msg-003', '2025-01-11 14:00:00', 'vexmira',    'TEXT', 'Package delivered.',              ARRAY['vexmira'],                NULL,       'Epsilon note', 'conv-002'),
('msg-004', '2025-01-12 22:00:00', 'vexmira',    'HACK', 'I am in your system.',            ARRAY[]::text[],                 'vexmira',  NULL,           'conv-003');

-- =============================================
-- GIGS
-- =============================================
INSERT INTO "Gigs" (
    "Id", "Title", "Description", "DescriptionDetailed", "Payout",
    "Status", "Category", "Subcategory", "ReputationRequired",
    "IsAnonymizedAuthor", "Mode", "IsRevealedTo",
    "AuthorId", "AuthorHandle", "WorkerId", "WorkerHandle", "WorkerAccountNumber",
    "ClientHandle", "ClientAccountNumber", "ConversationId", "CreatedAt", "ComplaintReason"
) VALUES
(
    'gig-001', 'Data Retrieval', 'Retrieve data from CorpNet.', 'Detailed: Get files from server X.', 500.00,
    'AVAILABLE', 'HACKING', 'DATA_THEFT', 3,
    false, 'authorIsHiring', ARRAY['shadowbyte', 'vexmira'],
    'user-001', 'shadowbyte', NULL, NULL, NULL,
    'shadowbyte', 'ACC-1001', NULL, '2025-01-09 08:00:00', NULL
),
(
    'gig-002', 'Escort Mission', 'Escort the VIP safely.', NULL, 800.00,
    'IN_PROGRESS', 'COMBAT', 'ESCORT', 5,
    false, 'authorIsHiring', ARRAY['ironclad'],
    'user-002', 'ironclad', 'user-001', 'shadowbyte', 'ACC-1001',
    'ironclad', 'ACC-2001', 'conv-001', '2025-01-10 09:00:00', NULL
),
(
    'gig-003', 'Anonymous Hit', 'Target elimination.', 'Classified.', 1200.00,
    'AVAILABLE', 'COMBAT', 'ASSASSINATION', 7,
    true, 'authorWantsToBeHired', ARRAY['vexmira'],
    'user-003', 'vexmira', NULL, NULL, NULL,
    NULL, NULL, NULL, '2025-01-11 11:00:00', NULL
);

-- =============================================
-- GIG UPDATES
-- =============================================
INSERT INTO "GigUpdates" ("Id", "From", "To", "Date", "SourceHandlle", "GigFK") VALUES
('gu-001', 'AVAILABLE',   'IN_PROGRESS', '2025-01-10 09:05:00', 'ironclad',   'gig-002'),
('gu-002', 'IN_PROGRESS', 'COMPLETED',   '2025-01-14 18:00:00', 'shadowbyte', 'gig-002');

-- =============================================
-- NETWORKS
-- =============================================
INSERT INTO "Networks" ("Id", "Name", "Admin", "Subnetworks", "Nodes", "Data", "EpsilonDescription") VALUES
('net-001', 'DarkNet',  'vexmira',    ARRAY['sub-001', 'sub-002'], '{"nodeA":"192.168.0.1"}'::hstore, '{"secret":"classified"}'::hstore, 'The underground network.'),
('net-002', 'CorpNet',  'ironclad',   ARRAY['sub-003'],            '{"nodeB":"10.0.0.1"}'::hstore,    '{}'::hstore,                      'Corporate infrastructure.');

-- =============================================
-- SUBNETWORKS
-- =============================================
INSERT INTO "Subnetworks" ("Id", "Name", "Network", "Users", "Firewall", "OperatingSystem", "Ice", "AccessPoint", "PastHacks") VALUES
('sub-001', 'ShadowSub', 'DarkNet',  ARRAY['shadowbyte', 'vexmira'], 'FIREWALL_X',    'EVIL_TWIN',  ARRAY['ice_breaker'], 'AP-SHADOW', ARRAY[]::text[]),
('sub-002', 'GhostSub',  'DarkNet',  ARRAY['vexmira'],               'ENCRYPT_GUARD', 'JOAN_OF_ARC',ARRAY[]::text[],      NULL,        ARRAY['hack-2024-01']),
('sub-003', 'CorpSub1',  'CorpNet',  ARRAY['ironclad'],              'VIRTUAL_VAULT', 'FORCE_FIELD',ARRAY['ice_mk2'],     'AP-CORP',   ARRAY[]::text[]);

-- =============================================
-- LOGS
-- =============================================
INSERT INTO "Logs" ("Id", "Timestamp", "SourceUser", "TargetUser", "LogType", "LogData", "Subnetwork") VALUES
('log-001', '2025-01-10 12:01:00', 'shadowbyte', 'vexmira',  'TRANSFER',           'Transfer of 200 from ACC-1001 to ACC-3001', 'ShadowSub'),
('log-002', '2025-01-11 09:31:00', 'ironclad',   'ironclad', 'TRANSFER',           'Salary transfer 1000 from ACC-9001',        'CorpSub1'),
('log-003', '2025-01-12 22:01:00', 'vexmira',    'ironclad', 'SUBNETWORK_HACKED',  'CorpSub1 breached by vexmira',              'CorpSub1'),
('log-004', '2025-01-13 08:01:00', 'shadowbyte', 'ironclad', 'GIG_ACCEPTED',       'Gig gig-002 accepted by shadowbyte',        'ShadowSub');

-- =============================================
-- PLOTS
-- =============================================
INSERT INTO "Plots" ("Id", "Name", "Description", "Users") VALUES
('plot-001', 'The Heist',      'A high-stakes corporate data theft operation.',  ARRAY['shadowbyte', 'vexmira']),
('plot-002', 'Power Struggle', 'Internal faction conflict within the Gunners.',  ARRAY['ironclad', 'shadowbyte']),
('plot-003', 'Ghost Protocol', 'Vexmira goes dark - her allegiance is unknown.', ARRAY['vexmira']);

-- =============================================
-- RECORDS (RecordType)
-- =============================================
INSERT INTO "RecordTypes" ("Id", "Type", "User", "Category", "SubCategory", "Title", "Data", "Timestamp", "IsRevealed", "RevealCode", "IsEncrypted", "EncryptionCode", "HackData") VALUES
('rec-001', 'HARDRECORD',    'shadowbyte', 'Combat',  'History',  'First Kill',         'Details of first kill.',     '2024-06-01 00:00:00', true,  NULL,     false, NULL,     NULL),
('rec-002', 'OFFGAMERECORD', 'vexmira',    'Personal','Backstory','Origin Story',        'Born in the slums of Neo-X.','2024-05-15 00:00:00', true,  NULL,     false, NULL,     NULL),
('rec-003', 'MINDRECORD',    'ironclad',   'Psych',   'Trauma',   'Classified Memory',  'REDACTED.',                  '2024-07-20 00:00:00', false, 'REV-X1', true,  'ENC-A1', NULL);

-- =============================================
-- PROGRAM CODES
-- =============================================
INSERT INTO "ProgramCodes" ("Id", "Code", "Program", "IsUsed", "Creator", "Owner") VALUES
('prog-001', 'XRAY-4421', 'Deep Scan',    false, 'vexmira',    NULL),
('prog-002', g'BLCK-0092', 'Ice Breaker',  true,  NULL,         'shadowbyte'),
('prog-003', 'TRCE-7713', 'Trace Kill',   true,  'vexmira',    'vexmira');

-- =============================================
-- HACK CONFIG
-- =============================================
INSERT INTO "HackConfig" ("Id", "Config") VALUES
('hcfg-001', '{"maxAttempts":3,"cooldown":60,"penaltyIce":true}'),
('hcfg-002', '{"maxAttempts":5,"cooldown":30,"penaltyIce":false}');

-- =============================================
-- RECORDS HASHES
-- =============================================
INSERT INTO "RecordsHashes" ("Id", "HardRecords", "OffGameRecords", "MindRecords") VALUES
('rh-001', 12345, 67890, 11111),
('rh-002', 22222, 33333, 44444);

-- =============================================
-- GIGER CONFIG
-- =============================================
INSERT INTO "GigerConfig" ("Id", "MaxGigsPerUser", "GigFeePercentage", "ModeratorCommissionPercentage") VALUES
('cfg-001', 5, 10, 5);