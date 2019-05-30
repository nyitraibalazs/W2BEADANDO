import EventEmitter from 'events'

class CustomerStore extends EventEmitter{
   _costumerData = undefined;
   _ownOrders = [];

   CostumerChange(){
      this.emit('costumer-data-change');
   }

   addCostumerChange(callback) {
      this.addListener('costumer-data-change', callback);
   }

   removeCostumerChange(callback) {
      this.removeListener('costumer-data-change', callback);
   }

   OrdersChange(){
      this.emit('own-orders-change');
   }

   addOrdersChange(callback) {
      this.addListener('own-orders-change', callback);
   }

   removeOrdersChange(callback) {
      this.removeListener('own-orders-change', callback);
   }
}

export default new CustomerStore();
