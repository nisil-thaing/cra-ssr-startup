import express from 'express';
import Loadable from 'react-loadable';

import routers from './routers';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(routers);

Loadable.preloadAll().then(function () {
  app.listen(PORT, error => {
    if (error) {
      return console.log('Oops! Something went wrong: ', error);
    }

    console.log(`Server is running on port ${ PORT }...`);
  });
});