import 'reflect-metadata';
import express from 'express';
import './database';
import { router } from './router';
import createConnection  from './database';

createConnection();

const app = express();

app.use(express.json());

app.use(router);

export { app };