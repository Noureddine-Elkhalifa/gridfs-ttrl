import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBookCover, fetchBookByID, updateBookById } from "../features/bookSlice";
import axios from "axios";
export default function EditBook()
{
    const bookID = useParams().id ;
    const bookById = useSelector(state=> state.book.bookById);
    const loading = useSelector(state=> state.book.loading);
    const [book,setBook] = useState({});
    const [coverImage,setCoverImage] = useState([]);
   

    const [displayCovesList,setDisplayCoverList] = useState(false);

    const dispatch = useDispatch();
    
 
    useEffect(()=>
    {
      dispatch(fetchBookByID(bookID))
      .then(result => {
        setBook(result.payload)
        
      })
    },[bookID,dispatch])

  
    

    
    const handleFileChange = (e) => {
        const covers= Array.from(e.target.files);
        setCoverImage(covers);
      };

    const handleCoverDeletion = (cover,book)=>{
      if(window.confirm("Are you sure you wanna delete this cover ?")){
        dispatch(deleteBookCover({cover,book}))
      }
      
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

      try {
        dispatch(updateBookById(formData));
      } catch (error) {
        console.log('Error editing the book')
      }

    }

    

    return  <> {loading? "Loading... ": <div>
     <form onSubmit={handleSubmit} content="multipart/form-data" >
     

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
    

    <table>
      <thead>
        <tr>
          <th>Cover</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
      {book.files && book.files.map(img => <tr>
        <td><img src={img.src} alt={`${img.src} cover`} width={"100px"} /></td>
        <td>
          <button onClick={()=>handleCoverDeletion(img.fileID,bookID)}>Delete Cover</button>
        </td>
      </tr> )} 
      </tbody>
    </table>  
    

    </div>}</>
}