import React, { useEffect, useState } from 'react';
import { ImCart } from "react-icons/im";

const Orders = ({ onClose }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          setErrorMsg('You must be logged in to view orders.');
          setLoading(false);
          return;
        }

        const res = await fetch('https://nature-grocery-web-application.onrender.com/api/orders/user', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setOrders(data);
        } else {
          setErrorMsg(data.message || 'Failed to fetch orders');
        }
      } catch (err) {
        console.error('Failed to fetch orders:', err);
        setErrorMsg('Error fetching orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    const confirmDelete = window.confirm("Are you sure you want to cancel this order?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`https://nature-grocery-web-application.onrender.com/api/orders/${orderId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setOrders(prev => prev.filter(order => order._id !== orderId));
        alert('Order cancelled successfully.');
      } else {
        alert(data.message || 'Failed to cancel order.');
      }
    } catch (err) {
      console.error('Error cancelling order:', err);
      alert('Server error. Please try again later.');
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-40 z-50 flex justify-center items-center">
      <div className="bg-black rounded-lg p-6 w-full max-w-2xl shadow-xl relative text-white">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-500 hover:text-red-600 text-xl cursor-pointer"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-4 flex gap-3 justify-center items-center"><ImCart className='text-orange-400 h-10 w-10'/> Your Orders</h2>

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : errorMsg ? (
          <p className="text-red-600">{errorMsg}</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-500">No orders found.</p>
        ) : (
          <ul className="space-y-3 max-h-[400px] overflow-y-auto">
            {orders.map((order) => (
              <li key={order._id} className="border p-3 rounded relative">
                <p><span className="font-bold">Items:</span> {order.items.map(i => `${i.name} x${i.quantity}`).join(', ')}</p>
                <p><span className="font-bold">Total:</span> ₹{order.total}</p>
                <p><span className="font-bold">Payment:</span> {order.paymentMethod}</p>
                <p className="text-sm text-gray-500">Placed on: {new Date(order.createdAt).toLocaleString()}</p>

                <button
                  className="absolute top-2 right-2  text-orange-400 border border-orange-600 font-bold px-2 py-1 hover:text-red-600 text-sm rounded cursor-pointer"
                  onClick={() => handleCancelOrder(order._id)}
                >
                  Cancel Order
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Orders;
