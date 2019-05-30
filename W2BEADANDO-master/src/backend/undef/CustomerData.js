function CustomerData(name, email, address) {
    if(name === undefined) {
        throw "Error(CustomerData): name cannot be undefined";
    }
    if(email === undefined) {
        throw "Error(CustomerData): email cannot be undefined";
    }
    if(address === undefined) {
        throw "Error(CustomerData): address cannot be undefined";
    }

    this.name =  name;
    this.email =  email;
    this.address = address;
}

function CustomerDataFromJson(customerData) {
    if(customerData === undefined) {
        throw "Error(CustomerData): customerData cannot be undefined";
    }

    return new CustomerData(customerData.name, customerData.email, customerData.address);
}

module.exports = {
    CustomerData: CustomerData,
    CustomerDataFromJson: CustomerDataFromJson
};