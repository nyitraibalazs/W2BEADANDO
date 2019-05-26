import OrderConstans from '../constans/OrderConstans'
import OrderDispatcher from '../dispatcher/OrderDispatcher'

class OrderActions {

   createOrder(order) {
      OrderDispatcher.handleViewAction({
         actionType : OrderConstans.CREATE_ORDER,
         payload : order
      })
   }

   refreshAllOrders() {
      OrderDispatcher.handleViewAction({
         actionType : OrderConstans.REFRESH_ALL_ORDERS
      })
   }

   finishShutter(orderId, shutterId) {
      OrderDispatcher.handleViewAction({
         actionType : OrderConstans.FINISH_SHUTTER,
         payload : {
            orderId : orderId,
            shutterId: shutterId
         }
      })
   }

   finishInstallation(orderId) {
      OrderDispatcher.handleViewAction({
         actionType : OrderConstans.FINISH_INSTALLATION,
         payload : orderId
      })
   }

   createInvoiceForOrder(orderId, invoice) {
      OrderDispatcher.handleViewAction({
         actionType : OrderConstans.CREATE_INVOICE_FOR_ORDER,
         payload : {
            orderId: orderId,
            invoice: invoice
         }
      })
   }
}

export default new OrderActions();
