import CustomerConstans from '../constans/CustomerConstans'
import CustomerDispatcher from '../dispatcher/CustomerDispatcher'

class CostumerDataActions {

   setCostumerData(costumerData) {
      CustomerDispatcher.handleViewAction({
         actionType : CustomerConstans.SET_COSTUMER_DATA,
         payload : costumerData
      });
   }

   unsetCostumerData() {
      CustomerDispatcher.handleViewAction({
         actionType : CustomerConstans.UNSET_COSTUMER_DATA
      });
   }

   refreshCostumerOwnOrders(){
      CustomerDispatcher.handleViewAction({
         actionType : CustomerConstans.REFRESH_COSTUMER_OWN_ORDERS
      });
   }
}

export default new CostumerDataActions();
