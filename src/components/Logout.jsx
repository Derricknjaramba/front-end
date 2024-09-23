import React from 'react';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Sign out from Firebase
      await signOut(auth);
      // Redirect to landing page after successful logout
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      // Optionally, show error to the user
    }
  };

  return (
    <button onClick={handleLogout} className="bg-blue-500 text-white p-2 rounded">
      Log Out
    </button>
  );
};

export default Logout;