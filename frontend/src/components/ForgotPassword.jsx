import React, { useState } from 'react';

const ForgotPassword = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://nature-grocery-web-application.onrender.com/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      console.error('Error:', err);
      setMessage('Something went wrong. Try again later.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="bg-black p-6 rounded-lg shadow-lg border border-gray-300 w-full max-w-md mx-auto relative pointer-events-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-600 hover:text-red-600 text-xl font-bold cursor-pointer"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center text-orange-600">
          Forgot Password
        </h2>

        <form onSubmit={handleForgotPassword} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded bg-white text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded cursor-pointer"
          >
            Send Reset Link
          </button>
        </form>

        {message && <p className="text-center mt-4 text-green-600">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
