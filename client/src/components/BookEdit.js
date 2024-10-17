import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBookByID, fetchBooks } from "../features/bookSlice";
import axios from "axios";
export default function EditBook()
{
    const bookID = useParams().id;
    const bookById = useSelector(state=> state.book.bookById);
    const [book,setBook] = useState({});
    const [coverImage,setCoverImage] = useState([]);

    const [filesArray,setFilesArray] = useState([]);

    const [displayCovesList,setDisplayCoverList] = useState(false);

    const dispatch = useDispatch();
    

    useEffect(()=>
    {
      dispatch(fetchBookByID(bookID))
    },[bookID,dispatch])

    useEffect(()=>{
      setBook(bookById)
      setFilesArray(bookById.files);
      console.log(bookById)
    },[bookById])

    

    
    const handleFileChange = (e) => {
        const covers= Array.from(e.target.files);
     
        setCoverImage(covers);
      };

  
   
    
    
   
    const handleSubmit = async(e)=>
    {
      e.preventDefault();
      const formData = new FormData();

      formData.append("title",book.title);
      formData.append("author",book.author);
      formData.append("genre",book.genre);
      coverImage.forEach(file => formData.append('coverImages',file));

      try {
        for (let [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
        }

        const res = await axios.put(`http://localhost:5000/api/books/${book._id}`,formData)
      } catch (error) {
        console.log('Error editing the book')
      }

    }

    

    return  <> <div>
     <form onSubmit={handleSubmit} content="multipart/form-data" >
     {/* {book.files.map(img => <img src={img} alt={`${img} cover`} /> )}  */}

    <label>
        Title:
        <input type="text" value={book?.title} onChange={(e) => setBook({...book,title:e.target.value})}  />
      </label>
      <label>
        Author:
        <input type="text" value={book?.author} onChange={(e) => setBook({...book,author:e.target.value})}  />
      </label>
      <label>
        Genre:
        <input type="text" value={book?.genre} onChange={(e) =>setBook({...book,genre:e.target.value})}  />
      </label>
      <label>
        Cover Image:
         <input type="file" onChange={handleFileChange}  multiple /> 
      </label>
      <button type="submit">Add Book</button>
    </form> 

    <div>

    
    </div>
    

    </div></>
}