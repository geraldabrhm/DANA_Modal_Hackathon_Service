import express, { Express }from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app: Express = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
}))

export default app;