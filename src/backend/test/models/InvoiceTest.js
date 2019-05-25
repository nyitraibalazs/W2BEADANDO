const assert = require('assert');
const InvoiceClass = require('../../undef/Invoice');

describe('Invoice class tests', () => {
    it('test InvoiceFromJson with undefined', () => {
        try {
            let invoice = new InvoiceClass.InvoiceFromJson(undefined);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(Invoice): invoice cannot be undefined")
        }
    })
})
