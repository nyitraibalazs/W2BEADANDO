import React from 'react';
import ReactDOM from 'react-dom';
import { CustomerDataForm } from '../components/CustomerDataForm';

it('CustomerDataForm renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CustomerDataForm setCustomerData={ () => undefined } />, div);
  ReactDOM.unmountComponentAtNode(div);
});
