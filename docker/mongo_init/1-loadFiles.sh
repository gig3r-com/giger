for COL in `ls /data/*.json`; do
    COLLECTION_NAME=$(basename $COL .json)
    COUNT=$(mongo   --quiet \
                    --host localhost \
                    --authenticationDatabase $MONGO_INITDB_DATABASE \
                    --username $MONGO_INITDB_ROOT_USERNAME \
                    --password $MONGO_INITDB_ROOT_PASSWORD \
                    --eval "db.getSiblingDB('$MONGO_INITDB_DATABASE').$COLLECTION_NAME.count()")

    if [ "$COUNT" -eq 0 ]; then
        echo "Processing $COL file..."
        mongoimport --host localhost \
                    --db $MONGO_INITDB_DATABASE \
                    --collection $COLLECTION_NAME \
                    --type json \
                    --file $COL \
                    --jsonArray \
                    --authenticationDatabase $MONGO_INITDB_DATABASE \
                    --username $MONGO_INITDB_ROOT_USERNAME \
                    --password $MONGO_INITDB_ROOT_PASSWORD
    else
        echo "Skipping $COLLECTION_NAME as it already has data."
    fi
done