import React from 'react';
import ReactDOM from 'react-dom';

import { useSafeCallback } from './SafeCallback';

import './index.css';

const App: React.FC = () => {
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
