import React, { useState } from 'react';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const AddBooks = () => {
  const navigate = useNavigate(); 

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setISBN] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [message, setMessage] = useState('');

  const handleAddBook = async (e) => {
    e.preventDefault();
    
    const bookData = { title, author, isbn, price, stock };

    try {
      const response = await axios.post('https://lib-backend-hmwd.onrender.com/admin/add_book', bookData)
      console.log(response)
      alert(response.data)
      navigate('/admin');

    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="flex justify-center items-center h-screen bg-[url('/images/library2.jpg')] bg-cover bg-center ">
        <form className="bg-white p-6 rounded shadow-md" onSubmit={handleAddBook}>
          <h2 className="text-2xl font-bold mb-4">Add New Book</h2>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="author">Author:</label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="author">ISBN:</label>
            <input
              type="text"
              id="isbn"
              value={isbn}
              onChange={(e) => setISBN(e.target.value)}
              required
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="author">Price:</label>
            <input
              type="text"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="author">Stock:</label>
            <input
              type="text"
              id="stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
              className="border rounded w-full p-2"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
            Add Book
          </button>
          {message && <p className="mt-4 text-green-600">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddBooks;