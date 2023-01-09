import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
