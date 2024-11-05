import logo from './logo.svg';
import './App.css';
import BookForm from './components/BookFrom';
import { Routes,Route,Link, useLocation } from 'react-router-dom';
import BookList from './components/BookList';
import EditBook from './components/BookEdit';
import AddBook from './components/addBook';

function App() {

 

  return (<>
  <nav>
    <li><Link to="/">Books List</Link></li>
    {/* <li><Link to="/addBook">Add New Book</Link></li> */}
    <li><Link to="/add"> Add book</Link></li>
  </nav>
  <Routes>
      <Route path='/' element={<BookList/>}></Route>
      <Route path='/addBook' element={<BookForm/>}></Route>
      <Route path='/editBook/:id' element={<EditBook/>}></Route>
      <Route path='/add' element={<AddBook/>}></Route>
  </Routes>
  
  </>

   
   
  );
}

export default App;
