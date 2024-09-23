import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';


const NavBar = () => {

  const [role, setRole] = useState('');
  const getCookie = () => {
    const user_role = Cookies.get('user_role');
    setRole(user_role || 'Cookie not found');
  };
  useEffect(() => {
    getCookie();
  }, [])

  return (
    <nav className="bg-blue-500 p-4">
      {role == 2 ? (
        <ul className="flex space-x-4">
        <li>
          <Link to="/admin" className="text-white">Admin Dashboard</Link>
        </li>
        <li>
          <Link to="/admin/add-books" className="text-white">Add Books</Link>
        </li>
        <li>
          <Link to="/admin/remove-book" className="text-white">Remove Book</Link>
        </li>
        <li>
          <Link to="/admin/borrowed-books" className="text-white">Borrowed Books</Link>
        </li>
        <li>
          <Link to="/admin/purchased-books" className="text-white">Purchases</Link>
        </li>
      </ul>
      ) : (
        <ul className="flex space-x-4">
          <li>
            <Link to="/user" className="text-white">User Dashboard</Link>
          </li>
          <li>
            <Link to="/user/books" className="text-white">Explore Books</Link>
          </li>
          
          <li>
            <Link to="/user/borrowed-books" className="text-white">Borrowed Books</Link>
          </li>
          
          <li>
            <Link to="/user/book-receipts" className="text-white">Receipts</Link>
          </li>
        </ul>
      )

      }
    </nav>
  );
};

export default NavBar;





