import express from 'express';
import { getBooks,addBook, getBookCover,deleteBook, getBookByID, editBook,deleteCover } from '../controllers/bookController.js';
import { upload } from '../util/grid.js';
import Keycloak from "keycloak-connect";
const router = express.Router();


const keycloak = new Keycloak({});


router.get('/books',keycloak.protect(),getBooks);
router.post('/books',upload.fields([
    {name:'theBook',maxCount:1},
    {name:'covers',maxCount:5}
]),keycloak.protect(),addBook);

router.get('/books/cover/:fileId',getBookCover)
router.get('/books/:bookId',keycloak.protect(),getBookByID)
router.put('/books/:id',upload.array("coverImages"),keycloak.protect(),editBook);
router.delete('/cover',keycloak.protect(),deleteCover)
router.delete('/books/:bookId',keycloak.protect(),deleteBook)
export default router;
