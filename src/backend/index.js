import express from "express";
import cors from "cors";
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import bearerToken from "express-bearer-token";
import oktaAuth from "./auth";
import hangman from './hangman';

const port = process.env.PORT || 8080;

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(bearerToken())
  .use(oktaAuth)
  .use(hangman());


mongoose.connect('mongodb://localhost:27017/hangman').then(() => {
  console.log("connected to database");

  app.listen(port, () => {
    console.log(`Express server listening to port: ${port}`)
  })
})
