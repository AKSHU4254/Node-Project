import './App.css';
import Nav from './Components/Nav';
import { BrowserRouter ,Routes,Route } from 'react-router-dom';
import Footer from './Components/Footer' 
import Register from './Components/Register';
import PrivateComponent from './Components/PrivateComponent';
import Login from './Components/Login';
import Addproduct from './Components/Addproduct';
import Productlist from './Components/Productlist';
import Update from './Components/Update';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
      <Routes>
        <Route element={<PrivateComponent/>}>
        <Route path='/' element={<Productlist/>}/>
        <Route path='/add' element={<Addproduct/>}/>
        <Route path='/Update/:id' element={<Update/>}/>
        <Route path='/logout' element={<h1>Logout Component</h1>}/>
        <Route path='/profile' element={<h1>Profile Component</h1>}/>
        </Route>

        <Route path='/signup' element={<Register/>}/>
        <Route path='/login'element={<Login/>}/>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
