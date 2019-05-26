const assert = require('assert');
const WindowClass = require('../../undef/Window');

describe('Windows class tests', () => {
    it('test WindowFromJson with undefined', () => {
        try {
            let window = new WindowClass.WindowFromJson(undefined);
            assert.fail();
        } catch (error) {
            assert.equal(error, "window cannot be undefined")
        }
    })


    it('test Window with undefined shutter', () => {
        try {
            let width = 100;
            let height = 300;
            let shutter = undefined;
            let window = new WindowClass.Window(width, height, shutter);
            assert.fail();
        } catch (error) {
            assert.equal(error, "shutter cannot be undefined")
        }
    })
})
