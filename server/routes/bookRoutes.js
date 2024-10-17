import express from 'express';
import { getBooks,addBook, getBookCover,deleteBook, getBookByID, editBook } from '../controllers/bookController.js';
import { upload } from '../util/grid.js';

const router = express.Router();

router.get('/books', getBooks);
router.post('/books',upload.array('coverImages'),addBook);
router.get('/books/cover/:fileId',getBookCover)
router.get('/books/:bookId',getBookByID)
router.put('/books/:id',upload.array("coverImages"),editBook);
router.delete('/books/:bookId',deleteBook)
export default router;
