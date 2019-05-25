function Invoice(price, isPaid) {
    if(price === undefined) {
        throw "price cannot be undefined";
    }
    if(isPaid === undefined) {
        throw "isPaid cannot be undefined"
    }

	this.price = price;
	this.isPaid = isPaid;
}

function InvoiceFromJson(invoice) {
    if(invoice === undefined) {
        throw "Error(Invoice): invoice cannot be undefined";
    }

    return new Invoice(invoice.price, invoice.isPaid);
}

module.exports = {
    Invoice: Invoice,
    InvoiceFromJson: InvoiceFromJson
};
