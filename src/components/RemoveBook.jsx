import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const RemoveBook = () => {
  const navigate = useNavigate(); 

  const [books, setBooks] = useState([])

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('https://lib-backend-hmwd.onrender.com/books/get_all/');
      const data = await response.json();
      setBooks(data);
    };
    fetchBooks();
  }, []);

  const handleRemoveBook = async (book) => {
    const confirmation = confirm(`You are about to delete ${book.title} by ${book.author}.\nThis action is irreversable.\nProceed?`)
    if(!confirmation){
      return
    }
    const response = await axios.get(`https://lib-backend-hmwd.onrender.com/books/delete/${book.id}`)
    alert(response.data.message)
    const second_response = await fetch('https://lib-backend-hmwd.onrender.com/books/get_all/');
    const data = await second_response.json();
    setBooks(data);
  };

  return (
    <div>
      <NavBar />
      <div className="p-5 bg-[url('/images/library2.jpg')] bg-cover bg-center min-h-screen">
        <table className="w-24 min-w-full  text-black border-separate border-spacing-2 border-slate-300 bg-slate-300">
          <thead>
            <tr>
              <th className="border p-2">Title</th>
              <th className="border p-2">Author</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Stock</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
          {books[0] ? (

            books.map((book) => (
              <tr key={book.id}>
                <td className="border p-2">{book.title}</td>
                <td className="border p-2">{book.author}</td>
                <td className="border p-2">{book.price}</td>
                <td className="border p-2">{book.stock}</td>
                <td className="border p-2 text-center">
                  <button onClick={() => handleRemoveBook(book)} className="bg-blue-500 text-white p-1 mx-1">Delete</button>
                </td>
              </tr>
            ))

          ) : (
            <tr>
                <td colSpan="6" className="border p-2 text-center">No books found.</td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RemoveBook;