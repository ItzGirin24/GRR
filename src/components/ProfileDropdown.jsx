import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProfileDropdown = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="User menu">
          {currentUser?.photoURL ? (
            <img
              src={currentUser.photoURL}
              alt="Profile"
              className="w-6 h-6 rounded-full object-cover"
            />
          ) : (
            <User className="w-5 h-5" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem asChild>
          <Link to="/profile" className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span>Profil</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout} className="flex items-center space-x-2">
          <LogOut className="w-4 h-4" />
          <span>Keluar</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
