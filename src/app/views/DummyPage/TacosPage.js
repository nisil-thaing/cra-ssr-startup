import React from 'react';
import { Switch, Link } from 'react-router-dom';

import RouterTree from 'app/core/components/RouterTree';

function TacosPage({ routes }) {
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

export default TacosPage;