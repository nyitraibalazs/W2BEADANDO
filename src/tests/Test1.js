import React from 'react';
import ReactDOM from 'react-dom';
import { CustomerNew } from '../components/CustomerNew';

it('CustomerNew renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CustomerNew allShutterColor={[]} allShutterMaterials={[]} allShutterTypes={[]} createOrderCallback={ () => undefined } />, div);
  ReactDOM.unmountComponentAtNode(div);
});
