import React from 'react';
import ReactDOM from 'react-dom';
import { WorkerPage } from '../components/WorkerPage';

it('WorkerPage renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<WorkerPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
