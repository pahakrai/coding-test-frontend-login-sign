import express from 'express';
import parser from 'body-parser';
import cors from 'cors';

import { authRouter } from './routes/auth.js';

const {json} = parser;
const app = express();

app.use(json());
app.use(cors());
app.use(authRouter);

app.all('*', async (req, res) => {
    res.send("Refinable");
});

export  { app };