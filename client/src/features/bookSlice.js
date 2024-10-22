import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import EditBook from "../components/BookEdit";
import { CoverFetcher } from "./functions/CoverFetcher";

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
            const bc = await CoverFetcher(book);
            console.log(bc)
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
    return {...book,files:await CoverFetcher(book)};
  
})

export const updateBookById = createAsyncThunk("book/updateBookById",async (formData)=>
{
    const res = await axios.put(`http://localhost:5000/api/books/${formData.get("_id")}`,formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })
    const editedBook = res.data;
    const reCover = await CoverFetcher(editedBook);
    
    return {...editedBook,files:reCover};

})


export const deleteBookCover = createAsyncThunk("book/deleteBookCover",async (data)=>{
    console.log(data);
   try {
    const res = await axios.delete(`http://localhost:5000/api/cover/`,{data})
    console.log(res);
   } catch (error) {
    console.error("Error deleting cover: ",error);
   }
})


export const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers:{
    },
    extraReducers: (builder) => {
        builder
        //FETCH ALL THE BOOKS
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
            // DELETE BOOK BY ID
            .addCase(deleteBook.fulfilled,(state,action)=> {console.log(action.payload)})
            .addCase(deleteBook.rejected,(state,action)=>{console.log(action.payload)})

            // FETCH BOOK BY ID
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

            .addCase(updateBookById.fulfilled,(state,action)=>{
                state.bookById = action.payload
            })
            ;
    },
});

// Exporting the reducer for the store
export default bookSlice.reducer ;

