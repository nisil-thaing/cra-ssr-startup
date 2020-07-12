import path from 'path';
import express from 'express';

import serverRenderer from '../serverRenderer';

const router = express.Router();

router.use('^/$', serverRenderer);

router.use(express.static(
  path.resolve(__dirname, '..', '..', 'build'),
  { maxAge: '30d' },
));

router.use('*', serverRenderer);

module.exports = router;