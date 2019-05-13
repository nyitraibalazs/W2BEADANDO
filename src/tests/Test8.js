import React from 'react';
import ReactDOM from 'react-dom';
import { ManagerPage } from '../components/ManagerPage';

it('ManagerPage renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ManagerPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
