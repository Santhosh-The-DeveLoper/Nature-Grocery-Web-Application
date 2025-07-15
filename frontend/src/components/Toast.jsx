import React from 'react';

const Toast = ({ message, show }) => {
  if (!show) return null;

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-toast">
      {message}
    </div>
  );
};

export default Toast;
