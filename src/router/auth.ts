import { Router } from "express";
import { AUTH_ROUTES } from ".";
import {
  createAccount,
  getUser,
  getUsers,
  login
} from "../controllers/auth"

const router = Router();

router.post(AUTH_ROUTES.CREATE, createAccount);
router.post(AUTH_ROUTES.LOGIN, login);
router.get(AUTH_ROUTES.USERS, getUsers)
router.get(AUTH_ROUTES.USER, getUser);

export default router;