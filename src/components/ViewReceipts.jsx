import React, { useEffect, useState } from 'react';
import { auth } from '../config/firebase'; 
import {  onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';

import NavBar from './NavBar';

const ViewReceipts= () => {
    const [user, setUser] = useState('no_user');

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (auth_user) => {
        if(user != 'no_user') {
          return
        }
        if (auth_user) {
          // User is signed in, display username
          setUser(auth_user || 'No username');
          return
        } else {
          return () => unsubscribe();
        }
      });
    })
  
    const [receipts, setReceipts] = useState('');
  
    const fetchReceipts = async () => {
        try {
          if(!user.uid || receipts[0]){
            return
          }
          const response = await axios.get(`https://lib-backend-hmwd.onrender.com/user/get_receipts/${user.uid}`)
          const data = await response.data;
          setReceipts(data);
        } catch (error) {
          console.error('Failed to fetch receipts:', error);
        }
      };
  
      setTimeout(() => {
        fetchReceipts();
    }, 3000);

    const getBookTitles = (books_ids) => {
        const ids_array = books_ids.split("_")
        return (ids_array.length - 1)
    }

    const handlePayReceipt = async (receipt) => {
        try {
            const phone_number = prompt("Enter the phone number that you will use to pay for MPesa")

            const truncated_phone_number = phone_number.toString().replace(/^0+(?=\d)/, '')

            if(Math.abs(phone_number.length) !== 10) {
                alert('Phone number must be 10 digits.')
                handlePayReceipt()
                return
            }
            console.log("Called")
            const response = await axios.get(`https://lib-backend-hmwd.onrender.com/user/pay_receipt/${receipt.id}/+254${truncated_phone_number}`)
            const data = await response.data;
            alert(data)
            console.log(data)
        } catch (error) {
            
        }
    }
    return (
        <div>
          <NavBar />

            <div className="p-5 bg-[url('/images/library2.jpg')] bg-cover bg-center min-h-screen" >
                <h2 className="text-3xl text-white font-bold">Receipts</h2>
                <table className="w-24 min-w-full  text-black border-separate border-spacing-2 border-slate-300 bg-slate-300" >
                    <thead>
                        <tr>
                        <th className="border p-2">Purchase Date</th>
                        <th className="border p-2">Book Titles</th>
                        <th className="border p-2">Total Cost</th>
                        <th className="border p-2">Mpesa Code</th>
                        <th className="border p-2">Status</th>
                        <th className="border p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {receipts[0] ? (
                        receipts.map((receipt) => (
                            <tr key={receipt.id}>
                                <td className="border p-2">{receipt.purchase_date}</td>
                                <td className="border p-2">{getBookTitles(receipt.book_ids)}</td>
                                <td className="border p-2">{receipt.total_amount}</td>
                                <td className="border p-2">{receipt.mpesa_code ? receipt.mpesa_code : "N/A"}</td>
                                <td className="border p-2">{receipt.status == 1 ? "Not Paid" : "Paid"}</td>
                                <td className="border p-2 text-center">
                                    {receipt.status == 1  ? (
                                        <button onClick={() => handlePayReceipt(receipt)} className="bg-blue-500 text-white p-1 mx-1">Pay</button>
                                    ) : (
                                        <button>N/A</button>
                                    )}
                                </td>
                            </tr>
                        ))
                        ) : (
                        <tr>
                            <td colSpan="6" className="border p-2 text-center">No receipts found.</td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )    
};

export default ViewReceipts;