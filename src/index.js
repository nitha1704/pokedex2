import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {GlobalContext} from './context/context';

ReactDOM.render(
  <GlobalContext>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GlobalContext>,
  document.getElementById("root")
);
