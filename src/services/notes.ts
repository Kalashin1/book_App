import { ObjectId } from "mongodb";
import { AppDataSource } from "../data-source";
import { Note } from "../entity/Note";

export class NoteService {
  create(note: Note) {
    return this.save(AppDataSource.mongoManager.create(Note, note));
  }

  save(note: Note) {
    return AppDataSource.mongoManager.save(Note, note);
  }

  getUserBookNotes(book_id: string, user_id: string) {
    return AppDataSource.mongoManager.find(Note, {
      where: {
        book: book_id,
        "owner._id": user_id
      }
    })
  }

  getCommentById(note_id: string) {
    return AppDataSource.mongoManager.findOne(Note, {
      where: {
        _id: { $eq: new ObjectId(note_id) },
      },
    });
  }

  delete(note: Note) {
    return AppDataSource.mongoManager.deleteOne(Note, note);
  }
}
