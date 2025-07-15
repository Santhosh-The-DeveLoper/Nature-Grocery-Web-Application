import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Menu from './components/Menu';
import Orders from './components/Orders';
import AuthForm from './components/AuthForm';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import { CartProvider } from './components/CartContext';
import useScrollAnimation from './hooks/useScrollAnimation';
import './index.css';

const MainLayout = ({
  user,
  setUser,
  showAuthForm,
  setShowAuthForm,
  showOrders,
  setShowOrders,
  showForgotPassword,
  setShowForgotPassword,
}) => {
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setShowAuthForm(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <>
      <Navbar
        openAuthForm={() => setShowAuthForm(true)}
        user={user}
        onLogout={handleLogout}
        onShowOrders={() => setShowOrders(true)}
      />

      {showAuthForm && !user && (
        <AuthForm
          onClose={() => setShowAuthForm(false)}
          onLoginSuccess={handleLoginSuccess}
          onForgotPasswordClick={() => {
            setShowAuthForm(false);
            setShowForgotPassword(true);
          }}
        />
      )}

      {showForgotPassword && (
        <ForgotPassword onClose={() => setShowForgotPassword(false)} />
      )}

      {showOrders && user && (
        <Orders user={user} onClose={() => setShowOrders(false)} />
      )}

      <Home />
      <Menu />
      <About />
      <Contact />
      <Footer />
    </>
  );
};

const App = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(storedUser);
  const [showAuthForm, setShowAuthForm] = useState(!storedUser);
  const [showOrders, setShowOrders] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  useScrollAnimation();

  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout
                user={user}
                setUser={setUser}
                showAuthForm={showAuthForm}
                setShowAuthForm={setShowAuthForm}
                showOrders={showOrders}
                setShowOrders={setShowOrders}
                showForgotPassword={showForgotPassword}
                setShowForgotPassword={setShowForgotPassword}
              />
            }
          />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </CartProvider>
    </Router>
  );
};

export default App;
