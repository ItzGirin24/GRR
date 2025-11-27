import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook, Clock } from 'lucide-react';
import { locations, socialMedia } from '../data/mockData';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <img
              src="/banner1.svg"
              alt="Griya Rias Ratih"
              className="h-24 w-auto object-contain bg-transparent"
              style={{ backgroundColor: 'transparent' }}
            />
            <p className="text-gray-400 text-sm">
              Wujudkan pernikahan impian Anda bersama Griya Rias Ratih. Melayani dengan sepenuh hati sejak 2010.
            </p>
            <div className="flex space-x-4">
              <a
                href={`https://instagram.com/${socialMedia.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-500 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={`https://wa.me/${socialMedia.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-500 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 448 512"
                  className="h-5 w-5"
                >
                  <path d="M380.9 97.1C339 55.2 283.2 32 224 32c-59.4 0-114.9 23.1-157 68.9-42.2 45.9-64.7 106.7-62.8 169.3.8 35.3 13.7 69.7 38.7 96.1L32 480l97.9-42.2c24 13 51.6 19.8 79.6 19.8 58.6 0 114.5-23.2 156.7-68.8 42.4-46.6 65.6-107 65.6-168.6 0-59.7-23.8-115-67.7-159.1zm-75.8 197.9c-9.5 13.9-36.6 33.2-51.6 35.1-14.8 1.8-27.8 2.6-54-14.4-35.6-22.7-58.8-57.1-65.9-72.9-7-15.9-1-23.4 7.5-31 7.7-7.6 16.9-19.8 25.4-19.8 8.2 0 15.2 1.1 22 5.3 6.6 4 21.5 14.3 35.2 31.2 13.8 16.7 21.4 29 24 34.8 2.6 5.9 0.8 10.7-5.4 17.2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-500">Menu</h3>
            <ul className="space-y-2">
              {['Beranda', 'Layanan', 'Paket', 'Testimoni', 'Kontak'].map((item, index) => (
                <li key={index}>
                  <Link
                    to={item === 'Beranda' ? '/' : `/${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-amber-500 transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Galeri 1 */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-500">Galeri 1</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2 text-gray-400">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <span>{locations[0].address}</span>
              </li>
              <li className="flex items-start space-x-2 text-gray-400">
                <Phone className="h-4 w-4 mt-1 flex-shrink-0" />
                <a href={`tel:${locations[0].phone}`} className="hover:text-amber-500 transition-colors">
                  {locations[0].phone}
                </a>
              </li>
              <li className="flex items-start space-x-2 text-gray-400">
                <Clock className="h-4 w-4 mt-1 flex-shrink-0" />
                <span>Senin - Minggu: 09.00 - 21.00 WIB</span>
              </li>
            </ul>
          </div>

          {/* Galeri 2 */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-500">Galeri 2</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2 text-gray-400">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <span>{locations[1].address}</span>
              </li>
              <li className="flex items-start space-x-2 text-gray-400">
                <Phone className="h-4 w-4 mt-1 flex-shrink-0" />
                <a href={`tel:${locations[1].phone}`} className="hover:text-amber-500 transition-colors">
                  {locations[1].phone}
                </a>
              </li>
              <li className="flex items-start space-x-2 text-gray-400">
                <Clock className="h-4 w-4 mt-1 flex-shrink-0" />
                <span>Senin - Minggu: 09.00 - 21.00 WIB</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Griya Rias Ratih. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
