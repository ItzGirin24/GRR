import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Packages from './pages/Packages';
import Gallery from './pages/Gallery';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Messages from './pages/Messages';
import Paket from './pages/Paket';
import Galeri from './pages/Galeri';
import Testimoni from './pages/Testimoni';
import Admin from './pages/Admin';
import { AuthProvider } from './context/AuthContext';
import { CountProvider } from './context/CountContext';
import { CartProvider } from './context/CartContext';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <AuthProvider>
      <CountProvider>
        <CartProvider>
          <BrowserRouter>
            <ScrollToTop />
            <div className="min-h-screen bg-white pb-16 lg:pb-0">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/packages" element={<Packages />} />
                <Route path="/paket" element={<Paket />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/galeri" element={<Galeri />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/testimoni" element={<Testimoni />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/login" element={<Login />} />
              </Routes>
              <Footer />
            </div>
          </BrowserRouter>
        </CartProvider>
      </CountProvider>
    </AuthProvider>
  );
}

export default App;
