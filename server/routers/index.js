import path from 'path';
import express from 'express';
import { createMemoryHistory } from 'history';

import serverRenderer from '../serverRenderer';
import configureAppStore from 'app/core/store';

const router = express.Router();

function actionIndex (req, res, next) {
  const history = createMemoryHistory({ basename: '/' });
  const store = configureAppStore({}, history);
  serverRenderer(store, history)(req, res, next);
}

router.use('^/$', actionIndex);

router.use(express.static(
  path.resolve(__dirname, '..', '..', 'build'),
  { maxAge: '30d' },
));

router.use('*', actionIndex);

module.exports = router;