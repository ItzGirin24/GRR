import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Instagram, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import UserHeader from './UserHeader';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Layanan', path: '/services' },
    { name: 'Paket', path: '/packages' },
    { name: 'Galeri', path: '/gallery' },
    { name: 'Testimoni', path: '/testimonials' },
    { name: 'Kontak', path: '/contact' }
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="/banner2.svg"
              alt="Griya Rias Ratih"
              className="h-20 w-auto object-contain"
              onError={(e) => {
                e.target.src = '/banner.webp';
              }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-amber-600 ${
                  location.pathname === link.path
                    ? 'text-amber-600'
                    : 'text-gray-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <UserHeader />
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-gray-700 hover:text-amber-600 transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 space-y-3 border-t">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block py-2 text-sm font-medium transition-colors hover:text-amber-600 ${
                  location.pathname === link.path
                    ? 'text-amber-600'
                    : 'text-gray-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 space-y-2">
              <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                Konsultasi Gratis
              </Button>
              <div className="flex justify-center space-x-4 pt-2">
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-amber-600 transition-colors"
                >
                  <Phone className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com/grr_griyariasratih"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-amber-600 transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
