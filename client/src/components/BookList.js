import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { deleteBook,fetchBooks } from "../features/bookSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function BookList()
{
    const books = useSelector(state=>state.book)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = async (book)=>
    {
        //  const bookId = book._id;
        //  const coverId = book.coverImage;
        //  const response = await axios.delete(`http://localhost:5000/api/books/${bookId}/${coverId}`);
        //  dispatch(fetchBooks());
        //  console.log(response.data.message)
        dispatch(deleteBook(book._id))
    
    }


    useEffect(()=>{
        dispatch(fetchBooks())
       },[])

    return <>
     <div className="book-list">
  {books.loading && <p>Loading Books ...</p>}
  {!books.loading && books.error ? <p>{books.error}</p> : null}
  {books.books.length === 0 && !books.loading && !books.error ? (
    <h3>No books to list</h3>
  ) : (
    books.books.map((x) => (
      <div className="book-item" key={x._id}>
        {x.file.map(img => <img key={img} src={img} alt={`${img} cover`} /> )}
        <p>Author: {x.author}</p>
        <p>Genre: {x.genre}</p>
        <button onClick={()=>navigate(`/editBook/${x._id}`)}>Edit</button>
        <button onClick={()=>handleDelete(x)}>Delete</button>
      </div>
    ))
  )}
</div>
    </>
}