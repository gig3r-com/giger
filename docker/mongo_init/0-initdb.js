db = db.getSiblingDB('sales')

db.createUser({
  user: 'sales',
  pwd: '$SALES_PASSWORD',
  roles: [{ role: 'readWrite', db: 'sales' }],
});
db.createCollection('receipts')
db.createCollection('documents')
db.createCollection('invoices')

db = db.getSiblingDB('warehouse')

db.createUser({
  user: 'warehouse',
  pwd: '$WAREHOUSE_PASSWORD',
  roles: [{ role: 'readWrite', db: 'warehouse' }],
});
db.createCollection('documents')
db.createCollection('stocks')
db.createCollection('invoices')
db.createCollection('orders')
