const assert = require('assert');
const ShutterClass = require('../../Shutter');

describe('Shutter class tests', () => {
    it('test ShutterFromJson with undefined', () => {
        try {
            let shutter = new ShutterClass.ShutterFromJson(undefined);
            assert.fail();
        } catch (error) {
            assert.equal(error, "shutter cannot be undefined")
        }
    })

    it('test Shutter with undefined color', () => {
        try {
            let color = undefined;
            let material = "wood";
            let type = "basic";
            let isFinished = false;
            let shutter = new ShutterClass.Shutter(color, material, type, isFinished);
            assert.fail();
        } catch (error) {
            assert.equal(error, "color cannot be undefined")
        }
    })
})
