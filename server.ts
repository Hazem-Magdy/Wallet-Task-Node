import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import './helpers/DataBaseConnection';

const app = express();
const port = 6000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);

// Home Page
app.get('/', (_req, res) => {
  res.send('welcome from EPL House home page...............');
});

// Error Handling Middleware
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  //res.status(500).send('Something went wrong!');
  if (!res.headersSent) {
    res.status(500).json({ error: 'Something went wrong! from error middleware.........' });
  }
});

app.listen(port, () => {
  console.log(`server is running on port ${port}................`);
});

