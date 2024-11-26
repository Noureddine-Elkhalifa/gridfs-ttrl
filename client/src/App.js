import logo from './logo.svg';
import './App.css';
import BookForm from './components/BookFrom';
import { Routes,Route,Link, useLocation } from 'react-router-dom';
import BookList from './components/BookList';
import EditBook from './components/BookEdit';
import AddBook from './components/addBook';

import VisitorBookList from './components/visitor/visitorBooksList';
import ProtectedRoute from './config/keycloak/protectedRoute';

function App() {
  const location = useLocation();
  return (<>
  <nav>
    <li><Link to="/">Books List</Link></li>

  </nav>
  <Routes location={location} >
    <Route element={<ProtectedRoute/>}>
      <Route path='/' element={<BookList/>}></Route>
      <Route path='/addBook' element={<BookForm/>}></Route>
      <Route path='/editBook/:id' element={<EditBook/>}></Route>
      <Route path='/add' element={<AddBook/>}></Route>
    </Route>
     

      <Route path='/books' element={<VisitorBookList/>}></Route>
  </Routes>
  
</>);


}

export default App;
