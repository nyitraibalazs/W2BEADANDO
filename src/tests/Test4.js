import React from 'react';
import ReactDOM from 'react-dom';
import { OwnCustomer } from '../components/ownCustomer';

it('OwnCustomer renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<OwnCustomer customerData={{name: "", email: "", address: ""}} ownOrders={[]} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
