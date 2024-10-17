import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    books: [],
    error: '',
    bookById:{}
};

// Asynchronous action to fetch books
export const fetchBooks = createAsyncThunk("book/fetchBooks", async () => {
    const response = await axios.get("http://localhost:5000/api/books");
    let books = response.data;
    

    try {

        const BooksWithCover =await Promise.all(books.map( async(book)=>
        {
            
            const bc = await Promise.all( book.coverImages.map(async(coverID)=>{
               const response = await axios.get(`http://localhost:5000/api/books/cover/${coverID}`,{responseType:'blob'});
                return URL.createObjectURL(response.data);
            }))
            return {...book,file:bc}
        }))
       return BooksWithCover
        
        
    } catch (error) {
        console.error("Error: ", error);
    }
    
    
});

//Delete book by ID
export const deleteBook = createAsyncThunk("book/deleteBook",async (bookId)=>{
    const response = await axios.delete(`http://localhost:5000/api/books/${bookId}`);
    // return response;
   
})

export const fetchBookByID = createAsyncThunk(`book/getBookById`,async (bookId)=>{
    const response = await axios.get(`http://localhost:5000/api/books/${bookId}`);
    let book = response.data;

    const bookCovers = await Promise.all(book.coverImages.map(async x => {
        const response = await axios.get(`http://localhost:5000/api/books/cover/${x}`,{responseType:'blob'});
        return {src:URL.createObjectURL(response.data),fileID:x}; 
    }))
    book = {...book,files:bookCovers};
   
    return {...book,files:bookCovers};
  
})

export const bookSlice = createSlice({
    name: "book",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.loading = false;
                state.books = action.payload;
                state.error = '';
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.loading = false;
                state.books = [];
                state.error = action.error.message;
            })
            .addCase(deleteBook.fulfilled,(state,action)=> {console.log(action.payload)})
            .addCase(deleteBook.rejected,(state,action)=>{console.log(action.payload)})
            .addCase(fetchBookByID.pending,(state)=>{state.loading=true})
            .addCase(fetchBookByID.fulfilled,(state,action)=>{
                state.loading = false;
                state.bookById = action.payload;
                state.error = '';
                
            })
            .addCase(fetchBookByID.rejected,(state,action)=>{
                state.loading = false;
                state.bookById = {};
                state.error = action.error.message
            })
            ;
    },
});

// Exporting the reducer for the store
export default bookSlice.reducer ;

