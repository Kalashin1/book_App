import {
  Entity,
  Column,
  ObjectIdColumn,
  CreateDateColumn,
} from 'typeorm'

import { ObjectId } from 'mongodb'

@Entity()
export class Comment {
  @ObjectIdColumn()
  _id: ObjectId

  @Column()
  contents: string

  @Column()
  owner: {fullName: string, _id: string}

  @Column()
  book: string

  @Column({
    default: "PENDING"
  })
  status: "PENDING" | "ACCEPTED" | "BLOCKED"

  @CreateDateColumn()
  created: string
}