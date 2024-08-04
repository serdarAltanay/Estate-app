import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AuthLayout from './layouts/AuthLayout.jsx';
import Layout from './layouts/Layout.jsx';
import Register from './pages/register/Register.jsx';
import Login from './pages/login/Login.jsx';
import UserProfile from './pages/profilePage/UserProfile.jsx';
import HomePage from './pages/homePage/HomePage.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path='' element={<HomePage/>}/>
            <Route path='register' element={<Register/>}/>
            <Route path='login' element={<Login/>}/>          
          </Route>
          
          <Route path='/' element={<AuthLayout/>}>
            <Route path='profile' element={<UserProfile/>}/>         
          </Route>
        </Routes>
        <ToastContainer/>
      </Router>
    </>
  );
}

export default App;
