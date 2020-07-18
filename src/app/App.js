import React from 'react';
import Loadable from 'react-loadable';
import { Switch, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import './App.css';

import { Container } from './App.style';
import RouterTree from './core/components/RouterTree';
import PageLoading from './core/components/PageLoading';

/* START - Dummy component for testing routing config */
const AsyncSandwichesPage = Loadable({
    loader: function () {
      return import( /* webpackChunkName: "sandwichesPage" */ 'app/views/DummyPage/SandwichesPage');
    },
    loading: PageLoading,
    modules: ['sandwichesPage']
  }),
  AsyncTacosPage = Loadable({
    loader: function () {
      return import( /* webpackChunkName: "tacosPage" */ 'app/views/DummyPage/TacosPage');
    },
    loading: PageLoading,
    modules: ['tacosPage']
  }),
  AsyncBusPage = Loadable({
    loader: function () {
      return import( /* webpackChunkName: "busPage" */ 'app/views/DummyPage/BusPage');
    },
    loading: PageLoading,
    modules: ['busPage']
  }),
  AsyncCartPage = Loadable({
    loader: function () {
      return import( /* webpackChunkName: "cartPage" */ 'app/views/DummyPage/CartPage');
    },
    loading: PageLoading,
    modules: ['cartPage']
  });

/* END - Dummy component for testing routing config */

const routes = [
  {
    path: '/sandwiches',
    component: AsyncSandwichesPage
  },
  {
    path: '/tacos',
    component: AsyncTacosPage,
    routes: [
      {
        path: '/tacos/bus',
        component: AsyncBusPage
      },
      {
        path: '/tacos/cart',
        component: AsyncCartPage
      }
    ]
  }
];

function App() {
  const { t } = useTranslation();

  return (
    <Container className="App">
      <Helmet>
        <title>{ t('HELLO_REACT_APP') }</title>
      </Helmet>
      <header className="App-header">
        <img src="/logo.svg" className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer" >
          { t('HELLO_REACT_APP') }
        </a>
      </header>
      <div>
        <ul>
          <li>
            <Link to="/tacos">Tacos</Link>
          </li>
          <li>
            <Link to="/sandwiches">Sandwiches</Link>
          </li>
        </ul>

        <Switch>
          {routes.map((route, i) => (
            <RouterTree key={i} {...route} />
          ))}
        </Switch>
      </div>
    </Container>
  );
}

export default App;
