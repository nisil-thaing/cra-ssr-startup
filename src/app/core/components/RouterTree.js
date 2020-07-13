import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

function RouterTree (route) {
  return (
    <Route
      path={ route.path }
      render={props => (
        <Fragment>
          { route.header ? <route.header /> : null }
          <route.component { ...props } routes={ route.routes } />
          { route.footer ? <route.footer /> : null }
        </Fragment>
      )} />
  );
}

export default RouterTree;