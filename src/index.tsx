import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import logLevel from './utils/log';
import App from './App/App';
import reportWebVitals from './reportWebVitals';
import registerServiceWorker from './registerServiceWorker';

// Make LogLevel globally accessible as log.info(), log.warn(), log.error(), etc.
// Note: Don't forget to set env.REACT_APP_LOG_LEVEL = DEBUG | INFO | WARN | ERROR
window.log = logLevel;
log.info('App started :)');


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

registerServiceWorker();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
