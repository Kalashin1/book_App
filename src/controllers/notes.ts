import { Request, Response } from 'express'
import {NoteService} from '../services/notes'

export const CreateNote = async (req:Request, res: Response) => {
  const param = req.body
  try {
    const note = await new NoteService().create(param);
    res.status(200).json(note)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const GetUserBookNotes = async (req: Request<{book_id: string, user_id: string}>, res: Response) => {
  const {book_id, user_id} = req.params

  try {
    const notes = await new NoteService().getUserBookNotes(book_id, user_id);
    res.status(200).json(notes)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}