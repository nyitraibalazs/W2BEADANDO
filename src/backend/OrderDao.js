const ObjectID = require('mongodb').ObjectID;
const assert = require('assert');

const getDatabaseConnection = require('./DatabaseConnection').getDatabaseConnection;
const collectionName = 'orders'

async function getOrders(FunctionSucces, errorCallback) {
    const db = await getDatabaseConnection();
    const collection = db.collection(collectionName)

    collection.find().toArray((err, orders) => {
        try {
            assert.equal(null, err, err);
            FunctionSucces(orders)
        } catch (error) {errorCallback("Error code:" + error);}
    });
}

async function getOrdersByEmail(email, FunctionSucces, errorCallback) {
    const db = await getDatabaseConnection();
    const collection = db.collection(collectionName)

    collection.find({"customerData.email": email}
    ).toArray((err, orders) => {
        try {
            assert.equal(null, err, err);
            FunctionSucces(orders)
        } catch (error) {errorCallback("Error code: " + error);}
    });
}

async function getOrderById(orderId, FunctionSucces, errorCallback) {
    const db = await getDatabaseConnection();
    const collection = db.collection(collectionName)

    collection.findOne(
        {"_id": ObjectID(orderId)},
        (err, order) => {
            try {
                assert.equal(null, err, err);
                FunctionSucces(order)
            } catch (error) {errorCallback("Error code: " + error);}
        }
    );
}

async function createOrder(order, FunctionSucces, errorCallback) {
    const db = await getDatabaseConnection();
    const collection = db.collection(collectionName)

    collection.insertOne(order, (err,response) => {
        try {
            assert.equal(null, err, err);
            assert.equal(1, response.insertedCount, "Could not insert order");
            FunctionSucces(response.insertedId)
        } catch (error) {errorCallback("Error code: " + error);}
    })
}

async function finishShutter(orderId, shutterId, FunctionSucces, errorCallback) {
    const db = await getDatabaseConnection();
    const collection = db.collection(collectionName)

    collection.updateOne(
        {"_id": ObjectID(orderId), "windows.shutter.id": shutterId}, {
            $set: {"windows.$.shutter.isFinished": true}},
        (err, response) => {
            try {
                assert.equal(null, err, err);
                assert.equal(1, response.matchedCount, "Could not find order");
                assert.equal(1, response.modifiedCount, "Could not update order (maybe already updated?)");
                FunctionSucces()
            } catch (error) {errorCallback("Error code: " + error);}
        }
    )
}

async function finishInstallation(orderId, successCallback, errorCallback) {
    const db = await getDatabaseConnection();
    const collection = db.collection(collectionName)

    collection.updateOne(
        {"_id": ObjectID(orderId)}, {$set: {"isInstalled": true}},
        (err, response) => {
            try {
                assert.equal(null, err, err);
                assert.equal(1, response.matchedCount, "Could not find order");
                assert.equal(1, response.modifiedCount, "Could not update order (maybe already updated?)");
                successCallback()
            } catch (error) {errorCallback("Error code: " + error);}
        }
    )
}

async function createInvoiceForOrder(orderId, invoice, FunctionSucces, errorCallback) {
    const db = await getDatabaseConnection();
    const collection = db.collection(collectionName)

    collection.updateOne(
        {"_id": ObjectID(orderId)}, {$set: {"invoice": invoice}},
        (err, response) => {
            try {
                assert.equal(null, err, err);
                assert.equal(1, response.matchedCount, "Could not find order");
                assert.equal(1, response.modifiedCount, "Could not update order (maybe already updated?)");
                FunctionSucces()
            } catch (error) {errorCallback("Error code: " + error);}
        }
    )
}

module.exports = {
    "getOrders" : getOrders,
    "getOrdersByEmail" : getOrdersByEmail,
    "getOrderById": getOrderById,
    "createOrder" : createOrder,
    "finishShutter": finishShutter,
    "finishInstallation": finishInstallation,
    "createInvoiceForOrder": createInvoiceForOrder
}
