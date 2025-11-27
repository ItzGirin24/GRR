import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Phone,
  Instagram,
  ChevronDown,
  Home as HomeIcon,
  MessageSquare,
} from "lucide-react";
import { Button } from "./ui/button";
import UserHeader from "./UserHeader";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { currentUser } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Beranda", path: "/" },
    { name: "Layanan", path: "/services" },
    { name: "Paket", path: "/packages" },
    { name: "Testimoni", path: "/testimoni" },
    { name: "Kontak", path: "/contact" },
  ];

  const iconMap = {
    Beranda: <HomeIcon className="w-5 h-5 mb-1" />,
    Layanan: <Phone className="w-5 h-5 mb-1" />,
    Paket: <ChevronDown className="w-5 h-5 mb-1" />,
    Testimoni: <MessageSquare className="w-5 h-5 mb-1" />,
    Kontak: <Phone className="w-5 h-5 mb-1" />,
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Hany satu lokasi untuk logo, terlihat di semua ukuran */}
            <Link to="/" className="flex items-center space-x-3">
              <img
                src="/banner2.svg"
                alt="Griya Rias Ratih"
                className="h-12 sm:h-20 w-auto object-contain"
                onError={(e) => {
                  e.target.src = "/banner.webp";
                }}
              />
            </Link>

            {/* Desktop Navigation (hanya tampil di layar besar) */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-amber-600 ${
                    location.pathname === link.path
                      ? "text-amber-600"
                      : "text-gray-700"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right Side - Mengandung user icons/masuk */}
            <div className="flex items-center space-x-4">
              {/* Desktop - UserHeader atau Masuk (hanya tampil di layar besar) */}
              <div className="hidden lg:flex items-center">
                {currentUser ? (
                  <UserHeader />
                ) : (
                  <Link
                    to="/login"
                    className="text-sm font-medium text-amber-600 hover:underline"
                  >
                    Masuk
                  </Link>
                )}
              </div>

              {/* Mobile - UserHeader atau Masuk (hanya tampil di layar kecil) */}
              {/* Pastikan hanya ada UserHeader dan bukan logo tambahan */}
              <div className="lg:hidden flex items-center">
                {currentUser ? (
                  <UserHeader />
                ) : (
                  <Link
                    to="/login"
                    className="text-sm font-medium text-amber-600 hover:underline"
                  >
                    Masuk
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* Hapus mobile bottom nav bar jika Anda tidak menginginkannya */}
    </>
  );
};

export default Navbar;
