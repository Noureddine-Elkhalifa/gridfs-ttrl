import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { deleteBook,fetchBooks } from "../features/bookSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
export default function BookList()
{
    const books = useSelector(state=>state.book)
    const dispatch = useDispatch();


    const handleDelete = async (book)=>
    {
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
        { x.file[0] && <img key={x.file[0].fileID} src={x.file[0].src} alt={`${x.file[0].src} cover`} width={"100px"} />}
        <p>Author: {x.author}</p>
        <p>Genre: {x.genre}</p>
        <Link to={`/editBook/${x._id}`}>Edit</Link>
        {/* <a href={`/editBook/${x._id}`}>Edit</a> */}
        <button onClick={()=>handleDelete(x)}>Delete</button>
      </div>
    ))
  )}
</div>
    </>
}