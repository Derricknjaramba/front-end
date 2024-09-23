import React, { useState } from 'react';
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Cookies from 'js-cookie';


const AdminsignUp= () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log('Signing up with:', { username, email, password });
    
    try {
      // Create a user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // User signed up
      const user = userCredential.user;
      console.log('User signed up:', user);

      console.log(user)
      await updateProfile(user, { displayName: username });

      // Record user locally
      const local_user_data = {
        id: user.uid,
        username: username,
        email: user.email,
        role: 2
      }
      const local_user = await axios.post('https://lib-backend-hmwd.onrender.com/register', local_user_data)
      Cookies.set('user_role', 2, { expires: 7 });

      setRole(2)
      navigate('/admin'); // directs to the admin dashboard. 

      // Optionally, store the username in your database here
    } catch (error) {
      console.error('Error signing up:', error);
      // Handle errors (e.g., display error message to user)
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[url('/images/library3.jpg')] bg-cover bg-center">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSignUp}>
        <h2 className="text-2xl font-bold mb-4">Admin Sign Up</h2>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="border rounded w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border rounded w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border rounded w-full p-2"
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 hover:font-semibold text-white p-2 rounded w-full">
          Sign Up
        </button>
        <p className="mt-4">
          Already have an account? <a href="/adminsignin" className="text-blue-600">Admin Sign Up </a>
        </p>
      </form>
    </div>
  );
};

export default AdminsignUp;