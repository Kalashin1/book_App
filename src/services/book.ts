import { ObjectId } from "mongodb";
import { AppDataSource } from "../data-source";
import { Book } from "../entity/Book";

export class BookService {
  create(book: Book) {
    return this.save(AppDataSource.mongoManager.create(Book, book));
  }

  getBookById(id: string) {
    return AppDataSource.mongoManager.findOne(Book, {
      where: {
        _id: {
          $eq: new ObjectId(id),
        },
      },
    });
  }

  getBooks() {
    return AppDataSource.mongoManager.find(Book, {});
  }

  deleteBook(book: Book) {
    return AppDataSource.mongoManager.deleteOne(Book, book);
  }

  save(book: Book) {
    return AppDataSource.mongoManager.save(Book, book);
  }
}
