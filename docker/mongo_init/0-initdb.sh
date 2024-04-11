mongosh <<EOF

db = db.getSiblingDB(process.env.MONGO_INITDB_DATABASE).auth(
    process.env.MONGO_INITDB_ROOT_USERNAME,
    process.env.MONGO_INITDB_ROOT_PASSWORD
);
db = db.getSiblingDB(process.env.GIGER_DATABASE_NAME)
db.createUser({
  user: process.env.GIGER_USERNAME,
  pwd: process.env.GIGER_USERNAME,
  roles: [{ role: 'readWrite', db: process.env.GIGER_DATABASE_NAME }],
});
db.createCollection('Users')
db.createCollection('Gigs')
db.createCollection('Transactions')
db.createCollection('Accounts')
db.createCollection('Events')
db.createCollection('Conversations')
db.createCollection('Messages')
db.createCollection('Auths')
db.createCollection('Networks')
db.createCollection('Subnetworks')
db.Auths.insert({_id: '1fe35579-5ce7-46ec-89e0-7e7236700297', Username: 'admin', Password: 'admin'})

EOF