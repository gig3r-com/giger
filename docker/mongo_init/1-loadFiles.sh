for COL in `ls /data/*.json`; do
    echo "Processing $COL file..."
    mongoimport --host localhost \
                --db $MONGO_INITDB_DATABASE \
                --collection $(basename $COL .json) \
                --type json \
                --file $COL \
                --jsonArray \
                --authenticationDatabase $MONGO_INITDB_DATABASE \
                --username $MONGO_INITDB_ROOT_USERNAME \
                --password $MONGO_INITDB_ROOT_PASSWORD
done