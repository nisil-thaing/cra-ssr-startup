import React, { useEffect } from 'react';
import { Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet-async';

import './App.css';

import { Container } from './App.style';
import RouterTree from './core/components/RouterTree';
import { DEMO_DATA_ACTIONS } from './core/store/actions/demoDataAction';

/* START - Dummy component for testing routing config */
function mapStateToProps (_) {
  return {};
}

function mapDispatchToProps (dispatch) {
  return {
    fetchDemoData: () => dispatch (DEMO_DATA_ACTIONS.fetchDemoData())
  };
}

const Sandwiches = connect(mapStateToProps, mapDispatchToProps)(function ({ fetchDemoData }) {
  useEffect(() => {
    fetchDemoData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <h2>Sandwiches</h2>;
});

function Tacos({ routes }) {
  return (
    <div>
      <h2>Tacos</h2>
      <ul>
        <li>
          <Link to="/tacos/bus">Bus</Link>
        </li>
        <li>
          <Link to="/tacos/cart">Cart</Link>
        </li>
      </ul>

      <Switch>
        {routes.map((route, i) => (
          <RouterTree key={i} {...route} />
        ))}
      </Switch>
    </div>
  );
}

function Bus() {
  return <h3>Bus</h3>;
}

function Cart() {
  return <h3>Cart</h3>;
}
/* END - Dummy component for testing routing config */

const routes = [
  {
    path: '/sandwiches',
    component: Sandwiches
  },
  {
    path: '/tacos',
    component: Tacos,
    routes: [
      {
        path: '/tacos/bus',
        component: Bus
      },
      {
        path: '/tacos/cart',
        component: Cart
      }
    ]
  }
];

function App() {
  return (
    <Container className="App">
      <Helmet>
        <title>React App</title>
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
          rel="noopener noreferrer"
        >
          Learn React
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
