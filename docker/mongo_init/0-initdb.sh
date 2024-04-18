mongosh <<EOF

db = db.getSiblingDB(process.env.MONGO_INITDB_DATABASE).auth(
    process.env.MONGO_INITDB_ROOT_USERNAME,
    process.env.MONGO_INITDB_ROOT_PASSWORD
);
db = db.getSiblingDB(process.env.GIGER_DATABASE_NAME)
db.createUser({
  user: process.env.GIGER_USERNAME,
  pwd: process.env.GIGER_USERNAME,
  roles: [ { role: "userAdminAnyDatabase", db: process.env.GIGER_DATABASE_NAME }, 
             { role: "dbAdminAnyDatabase", db: process.env.GIGER_DATABASE_NAME }, 
             { role: "readWriteAnyDatabase", db: process.env.GIGER_DATABASE_NAME } ]
});
db.createCollection('Accounts')
db.createCollection('Anonymized')
db.createCollection('Auths')
db.createCollection('Conversations')
db.createCollection('Gigs')
db.createCollection('Implants')
db.createCollection('Logs')
db.createCollection('Networks')
db.createCollection('ObscuredData')
db.createCollection('Subnetworks')
db.createCollection('Users')
db.Auths.insert({_id: '1fe35579-5ce7-46ec-89e0-7e7236700297', Username: 'admin', Password: 'admin'})

EOF