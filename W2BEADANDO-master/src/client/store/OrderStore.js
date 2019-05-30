import EventEmitter from 'events'

class OrderStore extends EventEmitter{
   _allOrders = [];
   _isAllOrdersFecthed = false;

   AllOrdersChange() {
      this.emit('all-orders-change');
   }

   addAllOrdersChange(callback) {
      this.addListener('all-orders-change', callback);
   }

   removeAllOrdersChange(callback) {
      this.removeListener('all-orders-change', callback);
   }
}

export default new OrderStore();
