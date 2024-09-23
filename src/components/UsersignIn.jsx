import { useState } from 'react';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const UsersignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [role, setRole] = useState('');

  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    // Add your sign-in logic here
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Signed in successfully
      console.log('User signed in:', userCredential.user);
      
      const local_user = await axios.get(`https://lib-backend-hmwd.onrender.com/sign_in/${userCredential.user.uid}`)
      console.log(local_user)
      setRole(local_user.data.role)
      Cookies.set('user_role', local_user.data.role, { expires: 7 });
      if(local_user.data.role == 1){
        navigate('/user'); // navigates to the user dashboard
      } else if(local_user.data.role == 2) {
        navigate('/admin'); // navigates to the user dashboard
      }
    } catch (error) {
      // Handle sign-in error
      console.error('Error signing in:', error.message);
      setError('Failed to sign in. Please check your credentials.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSignIn}>
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
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
          Sign In
        </button>
        <p className="mt-4">
         No account? <a href="/usersignup" className="text-blue-600">Sign Up</a>
        </p>
      </form>
    </div>
  );
};

export default UsersignIn;