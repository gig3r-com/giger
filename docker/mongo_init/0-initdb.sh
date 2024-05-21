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
db.Auths.insert({_id: '1fe35579-5ce7-46ec-89e0-7e7236700297', Username: 'admin', Password: 'admin'})

EOF