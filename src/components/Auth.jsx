import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Flag } from 'lucide-react';

const Auth = ({ showDialog = true }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const { login, signup, loginWithGoogle } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password);
      }
      setOpen(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    try {
      await loginWithGoogle();
      setOpen(false);
    } catch (err) {
      setError(err.message);
    }
  };

  if (!showDialog) {
    // Render only the login button to trigger the dialog elsewhere
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Masuk</Button>
        </DialogTrigger>
      </Dialog>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <Select defaultValue="id">
        <SelectTrigger className="w-20">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="id">
            <div className="flex items-center">
              <Flag className="w-4 h-4 mr-2" />
              ID
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Masuk</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isLogin ? 'Masuk' : 'Daftar'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}

            <Button type="submit" className="w-full">
              {isLogin ? 'Masuk' : 'Daftar'}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleLogin}
              className="w-full"
            >
              Masuk dengan Google
            </Button>

            <Button
              type="button"
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              className="w-full"
            >
              {isLogin ? 'Belum punya akun? Daftar' : 'Sudah punya akun? Masuk'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Auth;
