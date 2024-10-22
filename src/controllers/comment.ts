import { Request, Response } from "express";
import { CommentService } from "../services/comment";
import { Comment } from "../entity/Comment";

export const CreateComment = async (
  req: Request<{}, {}, { comment: Comment }>,
  res: Response
) => {
  const { comment } = req.body;

  try {
    const payload = await new CommentService().create({...comment, status: "PENDING"});
    res.status(200).json(payload);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const GetComment = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id } = req.params;

  try {
    const payload = await new CommentService().getCommentById(id);
    res.status(200).json(payload);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const GetBookComments = async (
  req: Request<{ book_id: string; status: Comment["status"] }>,
  res: Response
) => {
  const { book_id, status } = req.params;

  try {
    const payload = await new CommentService().getBookComments(book_id, status);
    res.status(200).json(payload);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const UpdateComment = async (
  req: Request<{ comment_id: string }, {}, { status: Comment["status"] }>,
  res: Response
) => {
  const { comment_id } = req.params;
  const { status } = req.body;

  try {
    const payload = await new CommentService().updateComment(
      comment_id,
      status
    );
    res.status(200).json(payload);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
