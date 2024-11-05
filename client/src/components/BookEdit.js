import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteBookCover, fetchBookByID, updateBookById } from "../features/bookSlice";
import CoverDisplayer from "../subComponents/coverDisplayer";
export default function EditBook()
{
    const bookID = useParams().id ;
    const bookById = useSelector(state=> state.book.bookById);
    const loading = useSelector(state=> state.book.loading);


    const [book,setBook] = useState(bookById);
    const [coverImage,setCoverImage] = useState([]);
    const [theBook,setTheBook] = useState(book?.theBook);
   



    const dispatch = useDispatch();
    
    useEffect(()=>
    {
      dispatch(fetchBookByID(bookID))
    },[bookID,dispatch])

  
    

    
    const handleFileChange = (e) => {
        const covers= Array.from(e.target.files);
        setCoverImage(covers);
      };

   
    
    const checkState = ()=>{
      console.log(book);
    }
    
    
   
    const handleSubmit = async(e)=>
    {
      e.preventDefault();
      const formData = new FormData();

      formData.append("_id",bookID)
      formData.append("title",book.title);
      formData.append("author",book.author);
      formData.append("genre",book.genre);
      coverImage.forEach(file => formData.append('coverImages',file));
      console.log(bookz)

      // try {
      //   dispatch(updateBookById(formData))
      //   .then(result =>  console.log(result))
  
      // } catch (error) {
      //   console.log('Error editing the book')
      // }

    }

    

    return  <> {loading? "Loading... ": <div>
     <form onSubmit={handleSubmit} content="multipart/form-data" >
     

    <label>
        Title:
        <input type="text"   defaultValue={bookById?.title}  onChange={(e) => setBook({...book,title:e.target.value})}  />
      </label>
      <label>
        Author:
        <input type="text"  defaultValue={bookById?.author} onChange={(e) => setBook({...book,author:e.target.value})}  />
      </label>
      <label>
        Genre:
        <input type="text"   defaultValue={bookById?.genre} onChange={(e) =>setBook({...book,genre:e.target.value})}  />
      </label>
      <label>
        Cover Image:
         <input type="file" onChange={handleFileChange}  multiple /> 
      </label>
      <button type="submit">Update Book</button>
     
    </form> 
    
    <div>
    <button type="button" onClick={()=>window.open(bookById.theBook)}>Read</button>
    </div>

    <CoverDisplayer covers={bookById?.covers} bookId = {bookID} />
    </div>}
    
    <button type="button" onClick={checkState}>Check</button>
    </>
}