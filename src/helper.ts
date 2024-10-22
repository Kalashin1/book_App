import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import {User} from "./entity/User"
export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 16);
}

export const createToken = (payload: {username: string, id: string, role: User["role"]}) => {
  const token = jwt.sign(JSON.stringify(payload), 'Test1234')
  return token;
}

export const verifyPassword = (password: string, existingPassword) => {
  return bcrypt.compare(password, existingPassword)
}

export const verifyToken = (token: string) => {
  return jwt.decode(token) as {username: string; id: string; role: User["role"]}
}

export const isUserAdmin = (token: string) => {
  const userPayload = verifyToken(token);
  return userPayload?.role === "ADMIN"
}

export const isUser = (token: string) => {
  const user = verifyToken(token)
  if (user) return true
  return false;
}