import express from 'express';
import codebaseRouter from './routes/codebase.js';
import errorHandler from './middlewares/errorHandler.js';
import { initDB } from './config/lowdb.js';

export let db;
initDB()
.then((databaseVar) => {
    db = databaseVar;
})

export const app = express();

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(express.json());

app.use('/', codebaseRouter);

app.use(errorHandler);
