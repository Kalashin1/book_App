import { ObjectId } from "mongodb";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import {
  createToken,
  hashPassword,
  verifyPassword,
  verifyToken,
} from "../helper";

export class UserService {
  async create({
    username,
    fullName,
    password,
    role,
  }: {
    username: string;
    fullName: string;
    password: string;
    role: "ADMIN" | "USER";
  }) {
    const user = await this.save(
      AppDataSource.mongoManager.create(User, {
        username,
        fullName,
        password: await hashPassword(password),
        role,
      })
    );
    const token = createToken({ username, id: user._id.toString(), role });
    return { user, token };
  }

  async login({ username, password }: { username: string; password: string }) {
    const user = await AppDataSource.mongoManager.findOne(User, {
      where: {
        username: {
          $eq: username,
        },
      },
    });

    if (!user) throw Error("Incorrect username");

    if (await verifyPassword(password, user.password)) {
      return {
        user,
        token: await createToken({ username, id: user._id.toString(), role: user.role }),
      };
    } else throw Error("incorrect password");
  }

  getExistingUsers(role: "ADMIN" | "USER") {
    return AppDataSource.mongoManager.find(User, {
      where: { role: { $eq: role } },
    });
  }

  async getUserFromToken(token: string) {
    const { id } = verifyToken(token);
    const user = await AppDataSource.mongoManager.findOne(User, {
      where: {
        _id: {
          $eq: new ObjectId(id),
        },
      },
    });
    if (user) return user;
    else throw Error("invalid token");
  }

  save(user: User) {
    return AppDataSource.mongoManager.save(User, user);
  }
}
