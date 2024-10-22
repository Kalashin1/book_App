import { isUserAdmin, isUser } from "../helper";
import { UserService } from "../services/auth";
import { NextFunction, Request, Response } from "express";
const userService = new UserService();

export const createAccount = async (req: Request, res: Response) => {
  const body = req.body;

  try {
    const payload = await userService.create(body);
    res.status(200).json(payload);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const param = req.body;

  try {
    const payload = await userService.login(param);
    res.status(200).json(payload);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUsers = async (
  req: Request<{ role: "ADMIN" | "USER" }>,
  res: Response
) => {
  const { role } = req.params;
  try {
    const users = await userService.getExistingUsers(role);
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUser = async (
  req: Request<{ token: string }>,
  res: Response
) => {
  const { token } = req.params;
  try {
    const users = await userService.getUserFromToken(token);
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const IsUserAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.headers;
  if (!token) res.status(403).json({ message: "invalid token" });
  const isAdmin = isUserAdmin(token as string);
  if (isAdmin) next();
  else res.status(403).json({ message: "forbidden action" });
};

export const IsUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.headers;
  if (!token) {
    res.status(403).json({ message: "invalid token" });
    return;
  }
  const user = isUser(token as string);
  if (user) next();
  else res.status(403).json({ message: "forbidden action" });
};
