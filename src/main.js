import { server } from './app.js';
import dotenv from 'dotenv';

dotenv.config();

const port = 3000;

server.listen(port, () => {
    console.log(`server started at port ${port}`);
});