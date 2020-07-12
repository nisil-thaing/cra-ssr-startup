import express from 'express';

import routers from './routers';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(routers);

app.listen(PORT, () => {
  console.log(`Server is running on port ${ PORT }...`);
});