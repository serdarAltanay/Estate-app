import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import apiRequest from "../../services/apiRequest";
import 'react-toastify/dist/ReactToastify.css';


const ForgotPasswordButton = () => {
  const { currentUser } = useContext(AuthContext); 

  const handleForgotPassword = async () => {
    if (!currentUser || !currentUser.email) {
        toast.error('User email is not available.');
        return;
      }

    try {
      await apiRequest.post('/auth/forgot-password', { email: currentUser.email });
      toast.success(`Please check your ${currentUser.email} mailbox for a reset link.`);
    } catch (error) {
        console.log(error)
      toast.error(error.response?.data?.message || 'Error occurred while sending reset link.');
    }
  };

  return (    
      <button onClick={handleForgotPassword} style={{ marginTop: '20px' }}>
        Forgot Password
      </button>
  );
};

export default ForgotPasswordButton;
