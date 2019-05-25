const routes = require("express").Router();

var modalsInvoice = require("../undef/Invoice");
var modelsOrder = require("../undef/Order");

var OrderServicesgetService = require("../service/OrderService");
const myOrderService = new OrderServicesgetService();

const checkEmail = new RegExp("^[0-9a-fA-F]{24}$");

routes.get("/getOrders", (req, resp) => {
   myOrderService.getOrders((orders) => {
      resp.status(200).
      send(
         {"orders": orders}
      );
   }, (error) => {
      resp.status(400).
      
      send(
         {"error": error}
      );
   });
})

routes.post("/getOrdersByEmail", (req, resp) => {
   if(req.body["email"] == undefined) {
      resp.status(400).
      send(
         {"error": "have email"}
      );
      return;
   }


   myOrderService.getOrdersByEmail(req.body["email"], (orders) => {
      resp.status(200).
      send(
         {"orders": orders}
      );
   }, (error) => {
      resp.status(400).
      send(
         {"error": error}
      );
   });
})

routes.post("/getOrderById", (req, resp) => {
   if(req.body["orderId"] == undefined) {
      resp.status(400).
      send(
         {"error": "defined orderID"}
         );
      return;
   }

   if(!checkEmail.test(req.body["orderId"])) {
      resp.status(400).
      send(
         {"error": "min 24 hex"}
         );
      return;
   }

   myOrderService.getOrderById(req.body["orderId"], (order) => {
      resp.status(200).
      send(
         {"order": order}
         );
   }, (error) => {
      resp.status(400).
      
      send(
         {"error": error}
         );
   });
})

routes.post("/createOrder", (req, resp) => {
   let order;
   try {
      order = new modelsOrder.OrderFromJson(req.body["order"]);
   } catch (error) {
      resp.status(400).
      
      send(
         {"error": error}
         );
      return;
   }

   myOrderService.createOrder(order, (createdId) => {
      resp.status(200).
      send(
         {"createdId": createdId}
         );
   }, (error) => {
      resp.status(400).
      
      send(
         {"error": error}
         );
   });
})


routes.post("/finishInstallation", (req, resp) => {
   if(req.body["orderId"] == undefined) {
      resp.status(400).
      send(
         {"error": "defined orderID"}
         );
      return;
   }

   if(!checkEmail.test(req.body["orderId"])) {
      resp.status(400).
      send(
         {"error": "min 24 hex orderID"}
         );
      return;
   }

   myOrderService.finishInstallation(req.body["orderId"], () => {
      resp.status(200).
      send();
   }, (error) => {
      resp.status(400).
      send(
         {"error": error}
         );
   });
})

routes.post("/finishShutter", (req, resp) => {
   if(req.body["orderId"] == undefined) {
      resp.status(400).
      send(
         {"error": "defined orderID"}
         );
      return;
   }
   if(req.body["shutterId"] == undefined) {
      resp.status(400).
      send(
         {"error": "defined shutterID"}
         );
      return;
   }

   if(!checkEmail.test(req.body["orderId"])) {
      resp.status(400).
      send(
         {"error": "max 24hex orderID"}
         );
      return;
   }

   myOrderService.finishShutter(req.body["orderId"], req.body["shutterId"], () => {
      resp.status(200).
      send();
   }, (error) => {
      resp.status(400).
      
      send(
         {"error": error}
         );
   });
})

routes.post("/createInvoiceForOrder", (req, resp) => {
   if(req.body["orderId"] == undefined) {
      resp.status(400).
      send(
         {"error": "defined orderID"}
         );
      return;
   }

   let invoice;
   try {
      invoice = new modalsInvoice.InvoiceFromJson(req.body["invoice"]);
   } catch (error) {
      resp.status(400).
      send(
         {"error": error}
         );
      return;
   }

   if(!checkEmail.test(req.body["orderId"])) {
      resp.status(400).
      send(
         {"error": "max 24hex orderID"}
         );
      return;
   }

   myOrderService.createInvoiceForOrder(req.body["orderId"], invoice, () => {
      resp.status(200).
      send();
   }, (error) => {
      resp.status(500).
      send(
         {"error": error}
         );
   });
})

module.exports = {
   routes: routes
}
