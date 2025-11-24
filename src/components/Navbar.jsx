  import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Instagram, ChevronDown, Home as HomeIcon, MessageSquare } from 'lucide-react';
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

  const iconMap = {
    'Beranda': <HomeIcon className="w-5 h-5 mb-1" />,
    'Layanan': <Phone className="w-5 h-5 mb-1" />,
    'Paket': <ChevronDown className="w-5 h-5 mb-1" />,
    'Galeri': <Instagram className="w-5 h-5 mb-1" />,
    'Testimoni': <MessageSquare className="w-5 h-5 mb-1" />,
    'Kontak': <Phone className="w-5 h-5 mb-1" />
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <img
                src="/banner2.svg"
                alt="Griya Rias Ratih"
                className="h-12 sm:h-20 w-auto object-contain"
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
                    location.pathname === link.path ? 'text-amber-600' : 'text-gray-700'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <UserHeader />
            </div>
          </div>

          {/* Mobile Custom Header */}
          <div className="lg:hidden w-full pt-2 border-t border-gray-200">
            <div className="flex items-center justify-between px-2">
              {/* User icons */}
              <UserHeader />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-inner lg:hidden z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-around text-xs text-gray-700">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex flex-col items-center justify-center py-2 transition-colors hover:text-amber-600 ${
                  location.pathname === link.path ? 'text-amber-600' : ''
                }`}
                aria-label={link.name}
              >
              {iconMap[link.name]}
              <span>{link.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
    </>
  );
};

export default Navbar;
