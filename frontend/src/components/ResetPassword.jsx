import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`https://nature-grocery-web-application.onrender.com/api/auth/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      setMsg(data.message);

      if (res.ok) {
        setSuccess(true);
      }
    } catch (error) {
      console.error('Reset error:', error);
      setMsg('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center text-orange-500">🔑 Reset Password</h2>

        {!success ? (
          <form onSubmit={handleReset} className="space-y-4">
            <input
              type="password"
              placeholder="New Password"
              className="w-full px-4 py-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
            >
              Reset Password
            </button>
          </form>
        ) : (
          <div className="text-center">
            <p className="text-green-600 font-semibold">{msg}</p>
            <button
              onClick={() => navigate('/')}
              className="mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded"
            >
              Go Back to Login
            </button>
          </div>
        )}

        {msg && !success && <p className="text-center text-red-600 mt-4">{msg}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
