import { Request, Response } from "express";
import { BookService } from "../services/book";
import { Book } from "../entity/Book";

export const CreateBook = async (req: Request, res: Response) => {
  const param = req.body;
  try {
    const book = await new BookService().create(param);
    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

export const GetBook = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  try {
    const book = await new BookService().getBookById(id);
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ mesage: error.message });
  }
};

export const GetBooks = async (req: Request, res: Response) => {
  try {
    const books = await new BookService().getBooks();
    res.status(400).json(books);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const SoftDeleteBook = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id } = req.params;
  try {
    const bookService = new BookService();
    const book = await bookService.getBookById(id);
    if (book) {
      book.isDeleted = true;
      await bookService.save(book);
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ message: error.mesage });
  }
};

export const HardDeleteBook = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id } = req.params;
  try {
    const bookService = new BookService();

    const book = await bookService.getBookById(id);
    if (book) {
      await bookService.deleteBook(book);
      res.status(200).json({ message: "book deleted successfully!" });
    } else {
      res.status(404).json({ message: "Book does not exist" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const UpdatedBook = async (
  req: Request<{ id: string }, {}, { book: Partial<Book> }>,
  res: Response
) => {
  const { id } = req.params;
  const { book } = req.body;

  try {
    const bookService = new BookService();
    const existingBook = await bookService.getBookById(id);
    console.log("book", book);
    if (existingBook) {
      existingBook.ISBN = book.ISBN ?? existingBook.ISBN;
      existingBook.author = book.author ?? existingBook.author;
      existingBook.pages = book.pages ?? existingBook.pages;
      existingBook.pdfUrl = book.pdfUrl ?? existingBook.pdfUrl;
      existingBook.thumbnail = book.thumbnail ?? existingBook.thumbnail;
      existingBook.published = book.published ?? existingBook.published;
      existingBook.title = book.title ?? existingBook.title;
    }
    const updatedBook = await bookService.save(existingBook);
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

