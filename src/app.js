import express from 'express';
import codebaseRouter from './routes/codebase.js';
import chatRouter from './routes/chat.js';
import errorHandler from './middlewares/errorHandler.js';
import { initDB } from './config/lowdb.js';
import { createServer } from 'http';
import { Server as SocketIO } from 'socket.io';

export let db;
initDB()
.then((databaseVar) => {
    db = databaseVar;
})

const app = express();
export const server = createServer(app);
const io = new SocketIO(server);

app.set('io', io);

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(express.json());

app.use('/', codebaseRouter);
app.use('/chat', chatRouter);

app.use(errorHandler);
