import express, { Request, Response } from 'express';
import listEndpoints from 'express-list-endpoints';
import router from './routes';

const app = express();

app.use(express.json());

app.use('/api', router);

console.table(
  listEndpoints(app).map(({ methods, path }) => {
    return { methods, path };
  })
);

export default app;
