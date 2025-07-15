import React, { useState } from 'react';

const AuthForm = ({ onClose, onLoginSuccess, onForgotPasswordClick }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin
      ? 'http://localhost:5000/api/auth/login'
      : 'http://localhost:5000/api/auth/register';

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(isLogin ? 'Login successful!' : 'Registered successfully! Please verify your email.');

        if (isLogin) {
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('token', data.token);

          if (onLoginSuccess) onLoginSuccess(data.user);
          onClose();
        }
      } else {
        setMessage(data.message || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Auth error:', error);
      setMessage('Server error. Try again later.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none animate-on-scroll">
      <div className="bg-black p-6 rounded-lg shadow-lg border text-white border-gray-300 w-full max-w-md mx-auto pointer-events-auto relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-600 hover:text-red-600 text-xl font-bold cursor-pointer"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">
          {isLogin ? 'Login' : 'Register'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />

          {isLogin && (
            <div className="text-right">
              <button
                type="button"
                className="text-sm text-blue-600 hover:underline cursor-pointer"
                onClick={onForgotPasswordClick}
              >
                Forgot Password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg cursor-pointer"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setForm({ name: '', email: '', password: '' });
              setMessage('');
            }}
            className="text-blue-600 font-semibold hover:underline cursor-pointer"
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>

        {message && <p className="text-center text-green-600 mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default AuthForm;
