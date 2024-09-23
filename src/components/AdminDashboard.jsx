import React from 'react';
import NavBar from './NavBar'; // Adjust path if necessary
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase'; // Ensure Firebase is configured
import { signOut } from 'firebase/auth';

const AdminDashboard = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase sign-out
      navigate('/'); // Redirect to the admin sign-in page after successful logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="p-5 bg-slate-500">
        <h2 className="text-3xl font-bold mb-4">Admin Dashboard</h2>
        <p className="mt-2 text-gray-700">Welcome to the Admin Dashboard! You can manage users and books here.</p>
        
        {/* <div className="mt-4 p-4 bg-white rounded shadow-md">
          <h3 className="text-xl font-semibold mb-2">Manage Users</h3>
          <ul className="space-y-2">
          </ul>
        </div> */}

        <div className="mt-4 p-4 bg-white rounded shadow-md">
          <h3 className="text-xl font-semibold mb-2">Manage Books</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/admin/add-books" className="text-blue-500 hover:underline">Add Books</Link>
            </li>
            <li>
              <Link to="/admin/remove-book" className="text-blue-500 hover:underline">Remove Book</Link>
            </li>
            <li>
              <Link to="/admin/borrowed-books" className="text-blue-500 hover:underline">View Borrowed Books</Link>
            </li>
            <li>
              <Link to="/admin/purchased-books" className="text-blue-500 hover:underline">View Purchases</Link>
            </li>
          </ul>
        </div>

        {/* Logout Button */}
        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;