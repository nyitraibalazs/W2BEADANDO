import React from 'react';
import ReactDOM from 'react-dom';
import { OrderStatistics } from '../../../components/manager/OrderStatistics';

it('OrderStatistics renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<OrderStatistics allOrders={[]} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
