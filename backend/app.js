import express from 'express';
import parser from 'body-parser';
import cors from 'cors';
import cookieSession from 'cookie-session';

import { authRouter } from './routes/auth.js';

const {json} = parser;
const app = express();


app.set('trust proxy', 11);
app.use(json());
app.use(cors());
app.use(
    cookieSession({
        signed: false
    })
);
app.use(authRouter);

app.all('*', async (req, res) => {
    res.send("Refinable API");
});

export  { app };