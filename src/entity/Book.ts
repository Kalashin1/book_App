import { ObjectId } from "mongodb"
import {
  Entity,
  ObjectIdColumn,
  Column
} from "typeorm"


@Entity()
export class Book {
  @ObjectIdColumn()
  _id: ObjectId

  @Column()
  title: string

  @Column()
  thumbnail: string

  @Column()
  pdfUrl: string

  @Column()
  pages: number

  @Column()
  ISBN: string

  @Column()
  published: number

  @Column()
  author: string

  @Column({
    default: false
  })
  isDeleted: boolean
}