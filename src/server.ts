import 'reflect-metadata';
import express from 'express';
import './database';
import { router } from './router';

const app = express();

app.use(express.json());

app.use(router);

app.listen(4000, () => {
  console.log(`[+] 🌀 Application is running on port 4000`);
})