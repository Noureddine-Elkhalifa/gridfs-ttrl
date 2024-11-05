import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteBook, fetchBooks } from "../features/bookSlice";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import './BookList.css'
export default function BookList() {
  const books = useSelector((state) => state.book);
  const dispatch = useDispatch();
  const location = useLocation();
  const [message, setMessage] = useState(location.state?.message || "");

  const handleDelete = async (book) => {
    dispatch(deleteBook(book._id)).then((result) => {
      setMessage(result.payload.message);
    });
  };

  useEffect(() => {
    dispatch(fetchBooks());
  }, []);

  return (
    <>
      {message && <p className="notification-message">{message}</p>}

      <div className="book-list">
        {books.loading && <p className="loading-message">Loading Books...</p>}
        {!books.loading && books.error ? (
          <p className="error-message">{books.error}</p>
        ) : null}
        {books.books.length === 0 && !books.loading && !books.error ? (
          <h3 className="no-books-message">No books to list</h3>
        ) : (
          books.books.map((x) => (
            <div className="book-item" key={x._id}>
              {x.file[0] && (
                <img
                  key={x.file[0].fileID}
                  src={x.file[0].src}
                  alt={`${x.file[0].src} cover`}
                  className="book-cover"
                />
              )}
              <div className="book-details">
                <p className="book-author">Author: {x.author}</p>
                <p className="book-genre">Genre: {x.genre}</p>
                <div className="book-actions">
                  <Link to={`/editBook/${x._id}`} className="edit-link">Edit</Link>
                  <button onClick={() => handleDelete(x)} className="delete-button">Delete</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
