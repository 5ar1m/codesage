import express from 'express';
import codebaseRouter from './routes/codebase.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(express.json());

app.use('/', codebaseRouter);

app.use(errorHandler);

export default app;