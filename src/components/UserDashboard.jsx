import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { auth } from '../config/firebase'; // Ensure you have Firebase initialized
import { signOut, onAuthStateChanged } from 'firebase/auth';

const UserDashboard = () => {
  const navigate = useNavigate(); // Used for navigating after logout

  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase sign-out
      navigate('/'); // Redirect to the landing page after successful logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const [username, setUsername] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, display username
        setUsername(user.displayName || 'No username');
      } else {
        // No user is signed in
        setUsername('Guest');
      }
    });
    return () => unsubscribe();
  })

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-5 bg-[url('public/images/manreading.jpg')] bg-cover bg-center">
      <h2 className="text-7xl font-bold mb-6 text-white text-justify hover:text-just p-20" >User Dashboard</h2>
      <h3 className="text-black bg-white m-4 p-2">Hello {username}</h3>
      <nav className="bg-white shadow-md rounded-lg p-4 w-full max-w-md">
        <ul className="space-y-4">
          <li>
            <Link 
              to="/user/books" 
              className="block text-center text-lg text-white bg-blue-600 hover:bg-blue-700 rounded-lg py-2 transition duration-200"
            >
              Explore Books
            </Link>
          </li>
          <li>
            <Link 
              to="/user/borrowed-books" 
              className="block text-center text-lg text-white bg-green-600 hover:bg-green-700 rounded-lg py-2 transition duration-200"
            >
              Borrowed Books
            </Link>
          </li>
          <li>
            <Link 
              to="/user/book-receipts" 
              className="block text-center text-lg text-white bg-yellow-600 hover:bg-yellow-700 rounded-lg py-2 transition duration-200"
            >
              Receipts
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="block w-full text-center text-lg text-white bg-gray-600 hover:bg-gray-700 rounded-lg py-2 transition duration-200"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UserDashboard;