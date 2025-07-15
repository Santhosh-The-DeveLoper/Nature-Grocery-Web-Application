import React, { useEffect, useState } from 'react';

const VerifyEmail = () => {
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    const url = window.location.href;
    const token = url.split('/verify/')[1];

    if (token) {
      fetch(`http://localhost:5000/api/auth/verify/${token}`)
        .then(res => res.json())
        .then(data => {
          if (data.message === 'Email verified successfully') {
            setMessage('✅ Email verified successfully! You can now log in.');
          } else {
            setMessage('❌ Verification failed or link expired.');
          }
        })
        .catch(() => {
          setMessage('❌ An error occurred during verification.');
        });
    } else {
      setMessage('❌ Invalid verification link.');
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-xl font-bold mb-4">Email Verification</h2>
        <p className="text-gray-700">{message}</p>
      </div>
    </div>
  );
};

export default VerifyEmail;
