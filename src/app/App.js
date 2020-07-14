import React, { useEffect, Fragment } from 'react';
import { Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet-async';

import './App.css';

import { Container } from './App.style';
import RouterTree from './core/components/RouterTree';
import { DEMO_DATA_ACTIONS } from './core/store/actions/demoDataAction';
import { getDemoDataStateData } from './core/store/selectors/demoDataSelector';

/* START - Dummy component for testing routing config */
const mapStateToProps = state => ({
  demoData: getDemoDataStateData(state)
});

const mapDispatchToProps = dispatch => ({
  fetchDemoData: () => dispatch (DEMO_DATA_ACTIONS.fetchDemoData())
});

const Sandwiches = connect(
  mapStateToProps,
  mapDispatchToProps
)(function ({ demoData, fetchDemoData }) {
  useEffect(() => {
    fetchDemoData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <h2>Sandwiches</h2>
      <div>{ JSON.stringify(demoData) }</div>
    </Fragment>);
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
