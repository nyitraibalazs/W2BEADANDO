import React from 'react';
import ReactDOM from 'react-dom';
import { IndexCustomer } from '../components/indexCustomer';

it('IndexCustomer renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<IndexCustomer />, div);
  ReactDOM.unmountComponentAtNode(div);
});
