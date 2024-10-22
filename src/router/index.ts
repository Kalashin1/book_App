export const AUTH_ROUTES = {
  CREATE: '/create',
  USER: '/user/:token',
  LOGIN: '/login',
  USERS: '/users/:role'
}

export const BOOK_ROUTES = {
  CREATE: '/create-book',
  BOOK: '/book/:id',
  BOOKS: '/books'
}

export const COMMENT_ROUTES = {
  CREATE: "/create-comment/",
  BOOK_COMMENTS: "/book-comments/:book_id/:status",
  UPDATE_COMMENT: "/comment/:comment_id",
};

export const NOTE_ROUTES = {
  CREATE: "/create-note",
  GET_BOOK_NOTES: "/book-notes/:book_id/:user_id"
}