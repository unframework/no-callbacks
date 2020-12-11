import React from 'react';
import ReactDOM from 'react-dom';

import { useSafeCallback } from './SafeCallback';

import './index.css';

const App: React.FC = () => {
  // this action is only possible to trigger while this component is mounted;
  // there is no direct way to invoke it, which means fewer accidents;
  // instead, one uses an attach helper below to "plug in" a button/link/etc
  const hiTrigger = useSafeCallback(() => {
    window.alert('oh hi there!');
  });

  return (
    <div className="App">
      <h1>Trigger Test</h1>

      <hiTrigger.attach>
        <button type="button">Hi</button>
      </hiTrigger.attach>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
