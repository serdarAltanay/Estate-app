import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AuthLayout from './layouts/AuthLayout.jsx';
import Layout from './layouts/Layout.jsx';
import Register from './pages/register/Register.jsx';
import Login from './pages/login/Login.jsx';
import UserProfile from './pages/profilePage/UserProfile.jsx';
import { ToastContainer } from 'react-toastify';
import { AuthContextProvider } from './contexts/AuthContext.jsx';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path='register' element={<Register/>}/>
            <Route path='login' element={<Login/>}/>          
          </Route>
          
          <Route path='/' element={<AuthLayout/>}>
            <Route path='profile' element={<UserProfile/>}/>         
          </Route>
        </Routes>
        <ToastContainer/>
      </Router>
      </AuthContextProvider>
    </>
  );
}

export default App;
