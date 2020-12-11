import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import { useSafeCallback } from './SafeCallback';

const App = () => {
  const HiTrigger = useSafeCallback(() => {
    window.alert('oh hi there!');
  });

  return (
    <div className="App">
      <h1>Trigger Test</h1>

      <HiTrigger>
        <button type="button">Hi</button>
      </HiTrigger>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
