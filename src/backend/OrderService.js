function OrderService(orderDao) {
    winston = require('winston')

    if(orderDao !== undefined) {
        this.orderDao = orderDao;
    } else {
        this.orderDao = require('./OrderDao');
    }
}

OrderService.prototype.getOrders = function(successCallback, errorCallback){
    this.orderDao.getOrders((orders) => {
        logger.info(`getOrders: ${orders.length} orders were found!`)
        successCallback(orders)
    }, (error) => {
        logger.error("Error in getOrders, cause: " + error)
        errorCallback(error)
    })
}

OrderService.prototype.getOrderById = function(orderId, successCallback, errorCallback){
    this.orderDao.getOrderById(orderId, (order) => {
        logger.info("getOrderById: order was found!")
        successCallback(order)
    }, (error) => {
        logger.error("Error in getOrderById, cause: " + error)
        errorCallback(error)
    })
}

OrderService.prototype.getOrdersByEmail = function(email, successCallback, errorCallback){
    this.orderDao.getOrdersByEmail(email, (orders) => {
        logger.info(`getOrdersByEmail: ${orders.length} orders were found!`)
        successCallback(orders)
    }, (error) => {
        logger.error("Error in getOrdersByEmail, cause: " + error)
        errorCallback(error)
    })
}

OrderService.prototype.createOrder = function(order, successCallback, errorCallback){
    for (let i = 0; i < order.windows.length; i++) {
        order.windows[i].shutter.parts = [
            {
                count: Math.ceil(order.windows[i].height / 30),
                description: `${order.windows[i].width}mm wide, ${order.windows[i].shutter.color} ${order.windows[i].shutter.material} rod`
            },
            {
                count: 5,
                description: "TestTest"
            }
        ]

        if( order.windows[i].shutter.type === "with bug-screen") {
            order.windows[i].shutter.parts.push({
                count: 1,
                description: "Bug-screen"
            })
        }
    }

    this.orderDao.createOrder(order, (createdId) => {
        logger.info("createOrder: Order successfully created")
        successCallback(createdId)
    }, (error) => {
        logger.error("Error in createOrder, cause: " + error)
        errorCallback(error)
    })
}

OrderService.prototype.finishShutter = function(orderId, shutterId, successCallback, errorCallback){
    this.orderDao.finishShutter(orderId, shutterId, () => {
        logger.info("finishShutter: Shutter successfully finished")
        successCallback()
    }, (error) => {
        logger.error("Error in finishShutter, cause: " + error)
        errorCallback(error)
    })
}

OrderService.prototype.finishInstallation = function(orderId, successCallback, errorCallback){
    this.orderDao.finishInstallation(orderId, () => {
        logger.info("finishInstallation: Order successfully installed")
        successCallback()
    }, (error) => {
        logger.error("Error in finishInstallation, cause: " + error)
        errorCallback(error)
    })
}

OrderService.prototype.createInvoiceForOrder = function(orderId, invoice, successCallback, errorCallback){
    this.orderDao.createInvoiceForOrder(orderId, invoice, () => {
        logger.info("createInvoiceForOrder: invoice succesfully created on order")
        successCallback()
    }, (error) => {
        logger.error("Error in createInvoiceForOrder, cause: " + error)
        errorCallback(error)
    })
}

module.exports = OrderService;
