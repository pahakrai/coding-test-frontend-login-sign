import express from 'express';
import parser from 'body-parser';
import cors from 'cors';
import cookieSession from 'cookie-session';

import { authRouter } from './routes/auth.js';

const CORS_ORIGIN_URI = 'http://localhost:3005';

const {json} = parser;
const app = express();

app.set('trust proxy', 1);
app.use(json());
app.use(cors({
    origin: CORS_ORIGIN_URI,
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
}));
app.use(
    cookieSession({
        signed: false,
        secure: false
    })
);
app.use(authRouter);

app.all('*', async (req, res) => {
    res.send("Refinable API");
});

export  { app };