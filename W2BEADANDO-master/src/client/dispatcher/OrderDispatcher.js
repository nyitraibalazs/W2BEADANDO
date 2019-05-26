import { Dispatcher } from 'flux'
import axios from "axios"
import OrderConstans from '../constans/OrderConstans'
import OrderStore from '../store/OrderStore'
import CustomerStore from '../store/CustomerStore'

class OrderDispatcher extends Dispatcher {

   handleViewAction(action){
      this.dispatch({
         source : 'VIEW_ACTION',
         action : action
      });
   }
}

const dispatcher = new OrderDispatcher();

dispatcher.register((data) => {
   if(data.action.actionType !== OrderConstans.CREATE_ORDER){
      return;
   }

   axios.post("http://localhost:8080/order/createOrder", {
      "order": data.action.payload
   })
      .then((response) => {

         let id = response.data.createdId;
         axios.post("http://localhost:8080/order/getOrderById", {
            "orderId": id
         })
            .then((response) => {
               CustomerStore._ownOrders = [...CustomerStore._ownOrders, response.data.order];
               CustomerStore.emitOwnOrdersChange();
               OrderStore._allOrders = [...OrderStore._allOrders, response.data.order];
               OrderStore.emitAllOrdersChange();
            })
      })

});

dispatcher.register((data) => {
   if(data.action.actionType !== OrderConstans.REFRESH_ALL_ORDERS){
      return;
   }

   axios.get("http://localhost:8080/order/getOrders")
      .then((response) => {
         OrderStore._allOrders = response.data.orders;
         OrderStore._isAllOrdersFecthed = true;
         OrderStore.emitAllOrdersChange();
      })
});

dispatcher.register((data) => {
   if(data.action.actionType !== OrderConstans.FINISH_SHUTTER){
      return;
   }

   axios.post("http://localhost:8080/order/finishShutter", {
      "orderId": data.action.payload.orderId,
      "shutterId": data.action.payload.shutterId
   })
      .then((response) => {
         let allOrders = [...OrderStore._allOrders];
         allOrders.forEach((order) => {
            if(order._id === data.action.payload.orderId) {
               order.windows.forEach((window) => {
                  if(window.shutter.id === data.action.payload.shutterId) {
                     window.shutter.isFinished = true;
                  }
               })
            }
         })

         OrderStore._allOrders = allOrders;
         OrderStore.emitAllOrdersChange();

         let ownOrders = [...CustomerStore._ownOrders];
         ownOrders.forEach((order) => {
            if(order._id === data.action.payload.orderId) {
               order.windows.forEach((window) => {
                  if(window.shutter.id === data.action.payload.shutterId) {
                     window.shutter.isFinished = true;
                  }
               })
            }
         })

         CustomerStore._ownOrders = ownOrders;
         CustomerStore.emitOwnOrdersChange();
      })
});

dispatcher.register((data) => {
   if(data.action.actionType !== OrderConstans.FINISH_INSTALLATION){
      return;
   }

   axios.post("http://localhost:8080/order/finishInstallation", {
      "orderId": data.action.payload
   })
      .then((response) => {
         let allOrders = [...OrderStore._allOrders];
         allOrders.forEach((order) => {
            if(order._id === data.action.payload) {
               order.isInstalled = true;
            }
         })

         OrderStore._allOrders = allOrders;
         OrderStore.emitAllOrdersChange();

         let ownOrders = [...CustomerStore._ownOrders];
         ownOrders.forEach((order) => {
            if(order._id === data.action.payload) {
               order.isInstalled = true;
            }
         })

         CustomerStore._ownOrders = ownOrders;
         CustomerStore.emitOwnOrdersChange();
      })
});

dispatcher.register((data) => {
   if(data.action.actionType !== OrderConstans.CREATE_INVOICE_FOR_ORDER){
      return;
   }

   axios.post("http://localhost:8080/order/createInvoiceForOrder", {
      "orderId": data.action.payload.orderId,
      "invoice": data.action.payload.invoice
   })
      .then((response) => {
         let allOrders = [...OrderStore._allOrders];
         allOrders.forEach((order) => {
            if(order._id === data.action.payload.orderId) {
               order.invoice = data.action.payload.invoice;
            }
         })

         OrderStore._allOrders = allOrders;
         OrderStore.emitAllOrdersChange();

         let ownOrders = [...CustomerStore._ownOrders];
         ownOrders.forEach((order) => {
            if(order._id === data.action.payload.orderId) {
               order.invoice = data.action.payload.invoice;
            }
         })

         CustomerStore._ownOrders = ownOrders;
         CustomerStore.emitOwnOrdersChange();
      })
});

export default dispatcher;
