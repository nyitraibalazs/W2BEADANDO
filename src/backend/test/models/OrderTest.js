const assert = require('assert');
const OrderClass = require('../../Order');

describe('Order class tests', () => {
    it('test OrderFromJson with undefined', () => {
        try {
            let order = new OrderClass.OrderFromJson(undefined);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(Order): order cannot be undefined")
        }
    })
})
