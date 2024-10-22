import { Entity, ObjectIdColumn, ObjectId, Column } from "typeorm"
import { Book } from "./Book"

@Entity()
export class User {

    @ObjectIdColumn()
    _id: ObjectId

    @Column()
    fullName: string

    @Column()
    username: string

    @Column()
    password: string

    @Column()
    role: "ADMIN" | "USER"

    @Column()
    books: Pick<Book, "_id" | "title">[]

}
