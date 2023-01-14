import express from 'express';
import bodyParser from 'body-parser';
import 'express-async-errors';

const app = express();

app.use(bodyParser.json());

const errorHandling = (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(500).json({
    msg: err.message,
    success: false,
  });
};

app.use(errorHandling);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
