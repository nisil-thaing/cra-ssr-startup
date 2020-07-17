import path from 'path';
import express from 'express';
import { createMemoryHistory } from 'history';
import middleware from 'i18next-http-middleware';

import serverRenderer from '../serverRenderer';
import configureAppStore from 'app/core/store';
import i18next from 'app/i18n';
import { SUPPORTED_LANGUAGE_CODES } from 'app/core/constants/ui-state.constant';

const router = express.Router();

function actionIndex (req, res, next) {
  req.i18n.changeLanguage(SUPPORTED_LANGUAGE_CODES.ENGLISH);
  const history = createMemoryHistory({ basename: '/' });
  const store = configureAppStore({}, history);

  serverRenderer(store, history)(req, res, next);
}

router.use(middleware.handle(i18next, {}));
router.use('^/$', actionIndex);

router.use(express.static(
  path.resolve(__dirname, '..', '..', 'build'),
  { maxAge: '30d' },
));

router.use('*', actionIndex);

module.exports = router;