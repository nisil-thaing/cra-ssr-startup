import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import './index.css';
import App from 'app/App';
import * as serviceWorker from './serviceWorker';
import i18next from 'app/i18n';
import configureAppStore from 'app/core/store';

const history = createBrowserHistory({ basename: '/' });
const initialState = window.__INITIAL_REDUX_STATE__;
const rootStore = configureAppStore(initialState, history);
const render = module.hot ? ReactDOM.render : ReactDOM.hydrate;

const AppBundle = (
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={ rootStore }>
        <I18nextProvider i18n={ i18next }>
          <ConnectedRouter history={ history }>
            <Router history={ history }>
              <App />
            </Router>
          </ConnectedRouter>
        </I18nextProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

window.onload = function() {
  Loadable.preloadReady().then(function () {
    render(
      AppBundle,
      document.getElementById('root')
    );
  });

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
};
