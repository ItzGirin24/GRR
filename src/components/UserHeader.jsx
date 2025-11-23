import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import ProfileDropdown from './ProfileDropdown';
import { ShoppingCart, MessageSquare } from 'lucide-react';

import { Link, useNavigate } from 'react-router-dom';

const UserHeader = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) {
    return (
      <div className="flex items-center space-x-2">
        <Link
          to="/admin"
          className="text-sm font-medium text-amber-600 hover:underline"
        >
          Masuk
        </Link>
      </div>
    );
  }

  const cartItemCount = 0; // TODO: Replace with actual cart count

  return (
    <div className="flex items-center space-x-4">
      {currentUser.photoURL && (
        <img
          src={currentUser.photoURL}
          alt={currentUser.displayName || currentUser.email}
          className="w-8 h-8 rounded-full object-cover"
        />
      )}
      <div className="text-right">
        <p className="font-semibold">{currentUser.displayName || currentUser.email || 'User'}</p>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Shopping Cart"
          onClick={() => navigate('/cart')}
          className="relative"
        >
          <ShoppingCart className="w-5 h-5" />
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Messages"
          onClick={() => navigate('/messages')}
          className="relative"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">1</span>
        </Button>
      </div>
      <ProfileDropdown />
    </div>
  );
};

export default UserHeader;
