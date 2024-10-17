import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks,deleteBook } from '../features/bookSlice';
import './BookForm.css'
function BookForm() {
  const [title,setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [coverImage, setCoverImage] = useState([]);
  // const [books,setBooks] = useState([]);
  // const [coveredBooks,setCoveredBooks] = useState();

  //Fetching states
  const books = useSelector((state)=>state.book)
  const dispatch = useDispatch();




  const handleFileChange = (e) => {
    const covers= Array.from(e.target.files);
    setCoverImage(covers);
  };

  // useEffect(()=>{

  //   const getData= async() =>{
  //     axios.get("http://localhost:5000/api/books")
  //     .then(response => {
  //       setBooks(response.data);
  //       console.log(response.data)
  //     });
  //   }
  //   getData();

  // },[])

  // useEffect(() => {
  //   const getCover = async () => {
     
  //     try {
        
  //       const booksCovers = books.map( async (book) =>{
  //         const response = await axios.get(`http://localhost:5000/api/books/cover/${book.coverImage}`,{responseType:'blob'})
  //         const cover = URL.createObjectURL(response.data);
  //         return {...book,coverImageFile:cover};
  //       } )

  //       const results = await Promise.all(booksCovers)
        
  //       setCoveredBooks(results);
  //       console.log(results)
  //     } catch (error) {
      
  //               console.error(error);
  //     } 
  //   };

  //   getCover();
  // }, [books]); 

  
//fetching books using redux/toolkit



  const handleSubmit = async (e) => {
    e.preventDefault();

  
    const formData = new FormData();
    coverImage.forEach((file)=>{
      formData.append('coverImages',file)
    })
    formData.append("title",title)
    formData.append('author', author);
    formData.append('genre', genre);
    
    

    try {
      const res = await axios.post('http://localhost:5000/api/books', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Book added successfully:', res.data);
      dispatch(fetchBooks())
    } catch (err) {
      console.error('Error adding book:', err);
    }
  };



  return (<div>
    <form onSubmit={handleSubmit}>
    <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <label>
        Author:
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
      </label>
      <label>
        Genre:
        <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} required />
      </label>
      <label>
        Cover Image:
        <input type="file" onChange={handleFileChange} required multiple />
      </label>
      <button type="submit">Add Book</button>
    </form>

    
   

    </div>
  );
}

export default BookForm;
