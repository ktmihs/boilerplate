import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import * as api from './router';

const app = express();
const __dirname = path.resolve();
const env = dotenv.config().parsed;

const PORT = env?.PORT;

// app.use(express.static('public'));
app.use(express.json());

app.use('/api', api.router);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
