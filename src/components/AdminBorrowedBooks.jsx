import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import axios from 'axios';

const AdminBorrowedBooks = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  
  const fetchBorrowedBooks = async () => {
    try {
      const response = await axios.get(`https://lib-backend-hmwd.onrender.com/admin/get_borrowed_books`)
      const data = await response.data;
      setBorrowedBooks(data);
    } catch (error) {
      console.error('Failed to fetch borrowed books:', error);
    }
  };

  useEffect(() => {
    fetchBorrowedBooks();
  }, []);

  const handleBookReturned = async (book) => {
    if(book.status == 2){
      return
    }
    try {
      const confirmation = confirm(`You are`)
      const response = await axios.get(`https://lib-backend-hmwd.onrender.com/book/mark_returned/${book.id}`)
      alert(response.data)
      fetchBorrowedBooks()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <NavBar />
      <div className="p-5 bg-[url('/images/library2.jpg')] bg-cover bg-center min-h-screen" >
        <h2 className="text-3xl text-white font-bold">Borrowed Books</h2>
        <table className="w-24 min-w-full  text-black border-separate border-spacing-2 border-slate-300 bg-slate-300" >
          <thead>
            <tr>
              <th className="border p-2">Title</th>
              <th className="border p-2">Author</th>
              <th className="border p-2">Borrowed Date</th>
              <th className="border p-2">Return Date</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {borrowedBooks.length > 0 ? (
              borrowedBooks.map((book) => (
                <tr key={book.id}>
                  <td className="border p-2">{book.book.title}</td>
                  <td className="border p-2">{book.book.author}</td>
                  <td className="border p-2">{book.borrowed_date}</td>
                  <td className="border p-2">{book.return_date}</td>
                  <td className="border p-2">{book.status == 1 ? "Not Returned" : "Returned"}</td>
                  <td className="border p-2 text-center">
                    <button onClick={() => handleBookReturned(book)} className="bg-blue-500 text-white p-1">{book.status == 1 ? "Mark Returned" : "Returned"}</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="border p-2 text-center">No borrowed books found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBorrowedBooks;