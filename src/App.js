import { BrowserRouter, Routes,Route,Outlet } from'react-router-dom'
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Protected from './pages/Protected';
import Register from './pages/Register';
import Navigation from './components/Navigation';
function App() {
 return(<BrowserRouter>
  <Routes>
    <Route path='/' element={
        <div>
            <Navigation/>
            <Outlet/>
        </div>}
        >
        <Route index element={
            <Protected>
               <Home/>
            </Protected>
        }/>
    </Route> 
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>

  </Routes> 
   
 </BrowserRouter>)
}

export default App;
