const assert = require('assert');

const getDatabaseConnection = require('../database/DatabaseConnection').getDatabaseConnection;

async function getAllShutterColors(successCallback, errorCallback) {
    const db = await getDatabaseConnection();
    const collection= db.collection("shutter_colors")

    collection.find().toArray((err, colors) => {
        try {
            assert.equal(null, err, err);
            successCallback(colors)
        } catch (error) {
            errorCallback("" + error);
        }
    });
}

async function getAllShutterMaterials(successCallback, errorCallback) {
    const db = await getDatabaseConnection();
    const collection= db.collection("shutter_materials")

    collection.find().toArray((err, materials) => {
        try {
            assert.equal(null, err, err);
            successCallback(materials)
        } catch (error) {
            errorCallback("" + error);
        }
    });
}

async function getAllShutterTypes(successCallback, errorCallback) {
    const db = await getDatabaseConnection();
    const collection= db.collection("shutter_types")

    collection.find().toArray((err, types) => {
        try {
            assert.equal(null, err, err);
            successCallback(types)
        } catch (error) {
            errorCallback("" + error);
        }
    });
}

module.exports = {
    "getAllShutterColors" : getAllShutterColors,
    "getAllShutterMaterials" : getAllShutterMaterials,
    "getAllShutterTypes" : getAllShutterTypes
}
