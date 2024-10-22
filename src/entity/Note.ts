import { Entity, Column, ObjectIdColumn, CreateDateColumn } from "typeorm";

import { ObjectId } from "mongodb";

@Entity()
export class Note {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  contents: string;

  @Column()
  owner: { fullName: string; _id: string };

  @Column()
  book: string;

  @CreateDateColumn()
  created: string;
}
