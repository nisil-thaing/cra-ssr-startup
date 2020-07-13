import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import './index.css';
import App from 'app/App';
import * as serviceWorker from './serviceWorker';

const history = createBrowserHistory({ basename: '/' });
const render = module.hot ? ReactDOM.render : ReactDOM.hydrate;

render(
  <React.StrictMode>
    <HelmetProvider>
      {/* <ConnectedRouter history={history}> */}
      <Router history={ history }>
        <App />
      </Router>
      {/* </ConnectedRouter> */}
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
