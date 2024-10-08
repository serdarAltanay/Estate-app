import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AuthLayout from './layouts/AuthLayout.jsx';
import Layout from './layouts/Layout.jsx';
import Register from './pages/register/Register.jsx';
import Login from './pages/login/Login.jsx';
import UserProfile from './pages/profilePage/UserProfile.jsx';
import ProfileUpdatePage from './pages/profileUpdate/ProfileUpdatePage.jsx';
import DeleteProfile from './pages/deleteProfilePage/DeleteProfile.jsx';
import UploadAvatar from './components/uploadImage/UploadImage.jsx';
import HomePage from './pages/homePage/HomePage.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdatePassword from './pages/passwordUpdatePage/UpdatePassword.jsx';
import CreatePostPage from './pages/createPostPage/createPostPage.jsx';
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
            <Route path='/add' element={<CreatePostPage/>}/>
            <Route path='profile/update-profile' element={<ProfileUpdatePage/>}/>
            <Route path='profile/update-avatar' element={<UploadAvatar/>}/>
            <Route path='profile/change-password' element={<UpdatePassword/>}/>
            <Route path='profile/delete-profile' element={<DeleteProfile/>}/>
            <Route path='profile' element={<UserProfile/>}/>         
          </Route>
        </Routes>
        <ToastContainer/>
      </Router>
    </>
  );
}

export default App;
