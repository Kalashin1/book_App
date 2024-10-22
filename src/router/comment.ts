import {
  CreateComment,
  GetBookComments,
  UpdateComment,
} from "../controllers/comment";
import { IsUser, IsUserAdmin } from "../controllers/auth";
import { Router } from "express"
import {COMMENT_ROUTES} from "."
const router = Router();

router.post(COMMENT_ROUTES.CREATE, IsUser, CreateComment)
router.get(COMMENT_ROUTES.BOOK_COMMENTS, GetBookComments)
router.post(COMMENT_ROUTES.UPDATE_COMMENT, IsUserAdmin, UpdateComment);

export default router;