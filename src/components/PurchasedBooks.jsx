import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import axios from 'axios'

const PurchasedBooks = () => {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const fetchPurchasedBooks = async () => {
      try {
        const response = await axios.get('https://lib-backend-hmwd.onrender.com/admin/get_receipts')
       
        setPurchases(response.data);
        console.log("purchases")
        console.log(purchases)
      } catch (error) {
        console.error('Failed to fetch purchased books:', error);
      }
    };

    fetchPurchasedBooks();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="min-h-screen p-5 bg-[url('/images/library2.jpg')] bg-cover bg-center">
        <h2 className="text-3xl font-bold text-white">Purchased Books</h2>
        <table className="w-24 min-w-full  text-black border-separate border-spacing-2 border-slate-300 bg-slate-300">
          <thead>
            <tr>
              <th className="border p-2">Purchase Date</th>
              <th className="border p-2">Username</th>
              <th className="border p-2">Book Titles</th>
              <th className="border p-2">Mpesa Code</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          {<tbody>
            {purchases.length > 0 ? (
              purchases.map((purchase) => (
                <tr key={purchase.id}>
                  <td className="border p-2">{purchase.purchase_date}</td>
                  <td className="border p-2">{purchase.user.username}</td>
                  <td className="border p-2">
                    {
                      purchase.books.map(book_title => (
                        <tr>{book_title}</tr>
                      ))
                    }
                  </td>
                  <td className="border p-2">{purchase.mpesa_code ? purchase.mpesa_code : "N/A"}</td>
                  <td className="border p-2">{purchase.total_amount}</td>
                  <td className="border p-2">{purchase.status == 1 ? "Not Paid" : "Paid"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="border p-2 text-center">No purchases found.</td>
              </tr>
            )}
          </tbody>}
        </table>
      </div>
    </div>
  );
};

export default PurchasedBooks;