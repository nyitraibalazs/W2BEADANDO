const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://172.21.0.10:27017';
const dbName = 'TesztMONGODB';

var databaseConnection;

const getDatabaseConnection = async () => {
    if(databaseConnection != undefined) {
        return databaseConnection;
    } else {
        try {const client = await MongoClient.connect(url,
                options={useNewUrlParser: true, auto_reconnect: true}
            );

            databaseConnection = client.db(dbName);
            console.log(`Database OK`)
        } catch (error) {console.error(`Database error: ${error.stack}`)}
        return databaseConnection;
    }
}

connectToDatabase = async () => {await getDatabaseConnection();}

module.exports = {
    getDatabaseConnection: getDatabaseConnection,
    connectToDatabase: connectToDatabase
}
