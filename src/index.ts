import express from "express";
import { AppDataSource } from "./data-source";
import cors from 'cors'
import authRouter from './router/auth';
import bookRouter from './router/book';
import commentRouter from "./router/comment";
import noteRouter from './router/notes';
const app = express();

app.use(cors())
app.use(express.json())
app.use(authRouter);
app.use(bookRouter);
app.use(commentRouter);
app.use(noteRouter)

AppDataSource.initialize()
  .then(async () => {
    console.log("connected to the database");
    app.listen(3000, () => {
      console.log(`app running on port 3000`);
    });
  })
  .catch((error) => console.log(error));

