import EventEmitter from 'events'

class OrderStore extends EventEmitter{
   _allOrders = [];
   _isAllOrdersFecthed = false;

   emitAllOrdersChange() {
      this.emit('all-orders-change');
   }

   addAllOrdersChangeListener(callback) {
      this.addListener('all-orders-change', callback);
   }

   removeAllOrdersChangeListener(callback) {
      this.removeListener('all-orders-change', callback);
   }
}

export default new OrderStore();
