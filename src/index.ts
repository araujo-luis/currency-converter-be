import express, { Application } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser'
import cors from 'cors';
import router from "./routes";
import cookieParser  from 'cookie-parser';
dotenv.config();
const PORT: string = process.env.PORT || '4000';

const app: Application = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser())
app.use('/', router);
app.use(bodyParser.json());
app.listen(PORT, () => console.log(`listening on port ${PORT}`));