import React from 'react';
import ReactDOM from 'react-dom';
import { PayManager } from '../components/payManager';

it('PayManager renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PayManager createInvoiceCallback={ () => undefined } />, div);
  ReactDOM.unmountComponentAtNode(div);
});
