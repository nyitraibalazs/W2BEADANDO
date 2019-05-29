import { Dispatcher } from 'flux'
import axios from "axios";
import CustomerConstans from '../constans/CustomerConstans'
import CustomerStore from '../store/CustomerStore'

class CostumerDataDispatcher extends Dispatcher {

   handleViewAction(action){
      this.dispatch({
         source : 'VIEW_ACTION',
         action : action
      });
   }
}

const dispatcher = new CostumerDataDispatcher();

dispatcher.register((data) => {
   if(data.action.actionType !== CustomerConstans.SET_COSTUMER_DATA){
      return;
   }

   axios.post("/order/getOrdersByEmail", {
      "email": data.action.payload.email
   })
      .then((response) => {
         CustomerStore._costumerData = data.action.payload;
         CustomerStore._ownOrders = response.data.orders;
         CustomerStore.emitCostumerDataChange();
         CustomerStore.emitOwnOrdersChange();
      })
});

dispatcher.register((data) => {
   if(data.action.actionType !== CustomerConstans.UNSET_COSTUMER_DATA){
      return;
   }

   CustomerStore._costumerData = undefined;
   CustomerStore._ownOrders = [];
   CustomerStore.emitCostumerDataChange();
   CustomerStore.emitOwnOrdersChange();
});

dispatcher.register((data) => {
   if(data.action.actionType !== CustomerConstans.REFRESH_COSTUMER_OWN_ORDERS){
      return;
   }

   axios.post("/order/getOrdersByEmail", {
      "email": CustomerStore._costumerData.email
   })
      .then((response) => {
         CustomerStore._ownOrders = response.data.orders;
         CustomerStore.emitOwnOrdersChange();
      })
});

export default dispatcher;
