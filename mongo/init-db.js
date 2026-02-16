const db_name = 'my_db';
const dataPath = '/docker-entrypoint-initdb.d/mongo/collections/';
const db = db.getSiblingDB(db_name);

function importFile(collectionName, fileName) {

    print(`Importing collection": ${collectionName}`);
    try {
        const content = fs.readFileSync(dataPath + fileName, 'utf8');

        // Use EJSON.parse instead of JSON.parse to correctly handle $oid, $date, etc."
        const data = EJSON.parse(content);

        if (Array.isArray(data)) {
            if (data.length > 0) {
                const res = db.getCollection(collectionName).insertMany(data);
                print(`${Object.keys(res.insertedIds).length} documents added.`);
            } else {
                print(`the file: ${fileName} is empty`);
            }
        } else {
            db.getCollection(collectionName).insertOne(data);
            print(`Importing 1 document`);
        }
    } catch (e) {
        print(`Error on ${fileName}: ${e.message}`);
    }
}

// Importing collections
importFile('Users', 'Users.json');
importFile('Helpers', 'Helpers.json');
importFile('Reviews', 'Reviews.json');


