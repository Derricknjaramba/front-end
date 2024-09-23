import React, { useEffect, useState } from 'react';
import { auth } from '../config/firebase'; // Ensure you have Firebase initialized
import { onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';

const BooksToBorrow = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('https://lib-backend-hmwd.onrender.com/books/get_all/');
      const data = await response.json();
      setBooks(data);
    };
    fetchBooks();
}, []);

const [user, setUser] = useState('');

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, display user
      setUser(user);
    } else {
      // No user is signed in
      setUser('Guest');
    }
  });
  return () => unsubscribe();
})


const handleBorrow = async (book) => {
  const confirm_response = confirm("Do you want to borrow this book? You will be required to return it after 14 days.\nProceed?")
  if(!confirm_response){
    return
  }
  
  // Logic to handle borrowing a book
  try {
    const response = await axios.get(`https://lib-backend-hmwd.onrender.com/books/borrow/${user.uid}/${book.id}`)
    alert(response.data.message)
  } catch (error) {
    alert("Failed to borrow book. Kindly try again later.")
  }
};

  return (
    <div className="p-5 bg-[url('/images/library2.jpg')] bg-cover bg-center min-h-screen">
      <h2 className="text-3xl font-bold text-white">Books to Borrow</h2>
      <table className="w-24 min-w-full  text-black border-separate border-spacing-2 border-slate-300 bg-slate-300">
        <thead>
          <tr>
            <th className="border p-2">Title</th>
            <th className="border p-2">Author</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td className="border p-2">{book.title}</td>
              <td className="border p-2">{book.author}</td>
              <td className="border p-2">
                <button onClick={() => handleBorrow(book)} className="bg-blue-500 text-white p-1">Borrow</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksToBorrow;