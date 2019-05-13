import React from 'react';
import ReactDOM from 'react-dom';
import { MainPageCustomer } from '../components/mainPageCustomer';

it('MainPageCustomer renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MainPageCustomer customerData={{name: "", email: "", address: ""}} ownOrders={[]} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
