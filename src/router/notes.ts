import { NOTE_ROUTES } from ".";
import { IsUser } from "../controllers/auth";
import { CreateNote, GetUserBookNotes } from "../controllers/notes";
import { Router } from "express";

const router = Router();
router.post(NOTE_ROUTES.CREATE, IsUser, CreateNote);
router.get(NOTE_ROUTES.GET_BOOK_NOTES, IsUser, GetUserBookNotes);

export default router;
