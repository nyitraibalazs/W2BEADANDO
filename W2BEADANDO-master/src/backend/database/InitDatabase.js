const assert = require('assert');
const getDatabaseConnection = require('./DatabaseConnection').getDatabaseConnection;

//Colors default
async function initShutterColors() {
    const db = await getDatabaseConnection();
    const collection = db.collection('shutter_colors')
    collection.find().toArray((err, objects) => {
        assert.equal(null, err, err);
        if(objects.length === 0) {
            collection.insertMany([{color: "yellow"}, {color: "red"}, {color: "green"}, {color: "orange"}, {color: "pink"}, {color: "purple"}
                ],
                (err,response) => {
                    assert.equal(null, err, err);
                    assert.equal(6, response.insertedCount, "Error shutter");
                })
        }
    });
}

//Material default
async function initShutterMaterials() {
    const db = await getDatabaseConnection();
    const collection = db.collection('shutter_materials')

    collection.find().toArray((err, objects) => {
        assert.equal(null, err, err);

        if(objects.length === 0) {
            collection.insertMany([{material: "metal"}, {material: "aluminum"}, {material: "plastic"}],
                (err,response) => {
                    assert.equal(null, err, err);
                    assert.equal(3, response.insertedCount, "Error materials");
                })
        }
    });
}

//Type default
async function initShutterTypes() {
    const db = await getDatabaseConnection();
    const collection = db.collection('shutter_types')

    collection.find().toArray((err, objects) => {
        assert.equal(null, err, err);

        if(objects.length === 0) {
            collection.insertMany([
                    {type: "two hundred and fifty x two hundred and fifty"}, {type: "two hundred x two hundred"}],
                (err,response) => {
                    assert.equal(null, err, err);
                    assert.equal(2, response.insertedCount, "Error shetter");
                })
        }
    });
}

//Orders default
async function initOrders() {
    const db = await getDatabaseConnection();
    const collection = db.collection('orders')

    collection.find().toArray((err, objects) => {
        assert.equal(null, err, err);

        if(objects.length === 0) {
            collection.insertMany([{
                customerData:  {
                name: "Nyitrai Balázs", email: "nyiba@mail.com", address: "3525 Miskolc Egyetemvaros."},
                   invoice: {price: 1500, isPaid: true},
                   comment: "Ahhhh",
                   isInstalled: true,
                   windows: [{width: 250, height: 250, shutter: {seqNo: 1, color: "red", material: "metal", type: "two hundred and fifty x two hundred and fifty",
                           parts: [{count: 30, description: "Iron"}, {count: 2, description: "Wood"}], isFinished: true}}]
               },
                   {
                    customerData:  {name: "Utassy Emese", email: "ue@mail.com", address: "3525 Msikolc Egyetemvaros E/4 Kollegium"},
                    comment: "",
                    isInstalled: false,
                    windows: [{width: 250, height: 250, shutter: {id: 2, color: "blue", material: "plastic", type: "two hundred and fifty x two hundred and fifty",
                            parts: [{count: 30, description: "Iron"}, {count: 2, description: "Wood"}], isFinished: false}}]
                    }
                ],
                (err,response) => {
                    assert.equal(null, err, err);
                    assert.equal(2, response.insertedCount, "Error orders");
                })
        }
    });
}

async function initDatabase() {
    await initShutterColors(); await initShutterMaterials(); await initShutterTypes(); await initOrders();
}

module.exports = {
    initDatabase: initDatabase
}
