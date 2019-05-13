var Invoice = require("./Invoice");
var Customer = require("./CustomerData");
var WindowSell = require("./Window");

function Order(comment, isInstalled, customerData, invoice, windows) {
    if(comment === undefined) {
        throw "comment cannot be undefined";
    }
    if(customerData === undefined) {
        throw "customerData cannot be undefined";
    }
    if(windows === undefined) {
        throw "Windows cannot be undefined";
    }
    if(isInstalled === undefined) {
        throw "isInstalled cannot be undefined";
    }

    for (let i = 0; i < windows.length; i++) {
        windows[i] = new WindowSell.WindowFromJson(windows[i]);
    }

    this.comment = comment;
    this.customerData = new Customer.CustomerDataFromJson(customerData);
    if(invoice !== undefined) {
        this.invoice = new Invoice.InvoiceFromJson(invoice);
    }
    this.isInstalled = isInstalled;
    this.windows = windows;
}

function OrderFromJson(order) {
    if(order === undefined) {
        throw "Error(Order): order cannot be undefined";
    }

    return new Order(order.comment, order.isInstalled, order.customerData, order.invoice, order.windows);
}

module.exports = {
    Order: Order,
    OrderFromJson: OrderFromJson
};
