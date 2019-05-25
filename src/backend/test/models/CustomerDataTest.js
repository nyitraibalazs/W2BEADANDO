const assert = require('assert');
const CustomerDataClass = require('../../CustomerData');

describe('CustomerData class tests', () => {
    it('test CustomerDataFromJson with undefined', () => {
        try {
            let customerData = new CustomerDataClass.CustomerDataFromJson(undefined);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(CustomerData): customerData cannot be undefined")
        }
    })

    it('test CustomerData with undefined name', () => {
        try {
            let name = undefined;
            let email = "test@test.hu";
            let address = "3555 Testland";
            let customerData = new CustomerDataClass.CustomerData(name, email, address);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(CustomerData): name cannot be undefined")
        }
    })

    it('test CustomerData with undefined email', () => {
        try {
            let name = "tester tester";
            let email = undefined;
            let address = "3555 Testland";
            let customerData = new CustomerDataClass.CustomerData(name, email, address);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(CustomerData): email cannot be undefined")
        }
    })

    it('test CustomerData with undefined address', () => {
        try {
            let name = "tester tester";
            let email = "test@test.hu";
            let address = undefined;
            let customerData = new CustomerDataClass.CustomerData(name, email, address);
            assert.fail();
        } catch (error) {
            assert.equal(error, "Error(CustomerData): address cannot be undefined")
        }
    })
})
