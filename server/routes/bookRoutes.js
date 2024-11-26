import express from 'express';
import { getBooks,addBook, getBookCover,deleteBook, getBookByID, editBook,deleteCover } from '../controllers/bookController.js';
import { upload } from '../util/grid.js';
import Keycloak from "keycloak-connect";
import introspectionTest from '../middlwares/keyCloak-test.js';
const router = express.Router();


const keycloak = new Keycloak({});


router.get('/books',keycloak.protect(),getBooks);
router.post('/books',upload.fields([
    {name:'theBook',maxCount:1},
    {name:'covers',maxCount:5}
]),addBook);

router.get('/books/cover/:fileId',getBookCover)
router.get('/books/:bookId',keycloak.protect(),getBookByID)
router.put('/books/:id',upload.array("coverImages"),keycloak.protect(),editBook);
router.delete('/cover',deleteCover)
router.delete('/books/:bookId',deleteBook)
export default router;
