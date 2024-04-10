import http from 'http';
import express from 'express';
import { Request, Response } from 'express';
import dotenv from "dotenv"
import usersRoutes from './routes/users.routes';
import bodyParser from 'body-parser';
dotenv.config()

const port = process.env.PORT || 8080;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users', usersRoutes)
app.get('/', async (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome to my API'
  });
});
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`API started at http://localhost:${port}`);
});