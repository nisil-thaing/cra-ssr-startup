import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import './index.css';
import App from 'app/App';
import * as serviceWorker from './serviceWorker';
import configureAppStore from 'app/core/store';

const history = createBrowserHistory({ basename: '/' });
const initialState = window.__INITIAL_REDUX_STATE__;
const rootStore = configureAppStore(initialState, history);
const render = module.hot ? ReactDOM.render : ReactDOM.hydrate;

render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={ rootStore }>
        <ConnectedRouter history={ history }>
          <Router history={ history }>
            <App />
          </Router>
        </ConnectedRouter>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
