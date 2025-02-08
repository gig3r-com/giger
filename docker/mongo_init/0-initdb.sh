mongosh <<EOF

db = db.getSiblingDB(process.env.MONGO_INITDB_DATABASE);
db = db.getSiblingDB(process.env.MONGO_INITDB_DATABASE).auth(
    process.env.MONGO_INITDB_ROOT_USERNAME,
    process.env.MONGO_INITDB_ROOT_PASSWORD
);
db.createCollection('Accounts')
db.createCollection('Anonymized')
db.createCollection('Auths')
db.createCollection('Conversations')
db.createCollection('Gigs')
db.createCollection('GigerConfig')
db.createCollection('HackConfigs')
db.createCollection('Implants')
db.createCollection('Logs')
db.createCollection('Networks')
db.createCollection('ObscuredCodesMap')
db.createCollection('ProgramCodesMap')
db.createCollection('Subnetworks')
db.createCollection('Users')

EOF