import { ObjectId } from "mongodb";
import { AppDataSource } from "../data-source";
import { Comment } from "../entity/Comment";

export class CommentService {
  create(comment: Comment) {
    return this.save(AppDataSource.mongoManager.create(Comment, comment));
  }

  save(comment: Comment) {
    return AppDataSource.mongoManager.save(Comment, comment);
  }

  getCommentById(comment_id: string) {
    return AppDataSource.mongoManager.findOne(Comment, {
      where: {
        _id: { $eq: new ObjectId(comment_id) },
      },
    });
  }

  async updateComment(id: string, status: Comment["status"]) {
    const comment = await this.getCommentById(id);
    console.log("comment", comment)
    if (comment) {
      comment.status = status;
      return this.save(comment);
    }
  }

  async getBookComments(book_id: string, status: Comment["status"]) {
    return await AppDataSource.mongoManager.find(Comment, {
      where: {
        book: { $eq: book_id },
        $and: [{ status: { $eq: status } }],
      },
      order: { created: "DESC" },
    });
  }

  delete(comment: Comment) {
    return AppDataSource.mongoManager.deleteOne(Comment, comment);
  }
}
