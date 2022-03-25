import express, { Request, Response } from 'express';
import listEndpoints from 'express-list-endpoints';

const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

console.table(
  listEndpoints(app).map(({ methods, path }) => {
    return { methods, path };
  })
);

export default app;
