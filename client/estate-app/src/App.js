import './App.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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
import SinglePage from './pages/singlePage/SinglePage.jsx';
import { singlePageLoader, listPageLoader } from './services/loaders.js';
import ListPage from './pages/listPage/ListPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <HomePage /> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { 
        path: 'add',
        element: <CreatePostPage /> },
      { 
        path: ':id',
        element: <SinglePage />,
        loader: singlePageLoader },
        { 
          path: '/list',
          element: <ListPage />,
          loader: listPageLoader },
      { 
        path: 'profile/update-profile', 
        element: <ProfileUpdatePage /> },
      { 
        path: 'profile/update-avatar', 
        element: <UploadAvatar /> },
      { 
        path: 'profile/change-password', 
        element: <UpdatePassword /> },
      { 
        path: 'profile/delete-profile', 
        element: <DeleteProfile /> },
      { 
        path: 'profile', 
        element: <UserProfile /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
