import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Book } from "./entity/Book"
import * as dotenv from 'dotenv';
import { Note } from "./entity/Note";
import { Comment } from "./entity/Comment";

dotenv.config()

export const AppDataSource = new DataSource({
    type: "mongodb",
    url: process.env.DATABASE_URL,
    database: process.env.DATABASE_NAME,
    synchronize: true,
    logging: false,
    entities: [User, Book, Comment, Note],
})
