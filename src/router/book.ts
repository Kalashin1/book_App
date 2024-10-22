import { Router } from 'express'
import {
  CreateBook,
  GetBook,
  GetBooks,
  UpdatedBook,
  SoftDeleteBook,
  HardDeleteBook
} from '../controllers/book'
import {IsUserAdmin} from "../controllers/auth"
import { BOOK_ROUTES } from '.';


const router = Router();

router.post(BOOK_ROUTES.CREATE, IsUserAdmin, CreateBook);
router.get(BOOK_ROUTES.BOOK, GetBook);
router.get(BOOK_ROUTES.BOOKS, GetBooks);
router.patch(BOOK_ROUTES.BOOK,IsUserAdmin, UpdatedBook);
router.put(BOOK_ROUTES.BOOK, IsUserAdmin, SoftDeleteBook);
router.delete(BOOK_ROUTES.BOOK, IsUserAdmin, HardDeleteBook);

export default router;