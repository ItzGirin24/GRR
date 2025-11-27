import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Trash2, ShoppingBag, ArrowRight, CheckCircle, Shield, Calendar, MessageCircle } from 'lucide-react';
import { toast } from '../hooks/use-toast';
import { Link } from 'react-router-dom';
import { packages } from '../data/mockData';

const Cart = () => {
  const { cartItems, removeItem, addItem } = useCart();
  const { currentUser } = useAuth();
  const [meetingTime, setMeetingTime] = useState('');

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-8">
                <Link to="/" className="flex items-center space-x-2">
                  <img src="/logo.webp" alt="TelugeAgro Logo" className="h-8 w-8" />
                  <span className="font-bold text-xl text-green-600">TelugeAgro</span>
                </Link>
                <div className="hidden md:flex space-x-6">
                  <Link to="/" className="text-gray-700 hover:text-green-600">Beranda</Link>
                  <Link to="/packages" className="text-gray-700 hover:text-green-600">Toko</Link>
                  <Link to="/about" className="text-gray-700 hover:text-green-600">Tentang</Link>
                  <Link to="/contact" className="text-gray-700 hover:text-green-600">Kontak</Link>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Link to="/cart" className="flex items-center space-x-2 text-gray-700 hover:text-green-600">
                  <ShoppingBag className="h-5 w-5" />
                  <span>Keranjang Belanja</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">Keranjang Belanja</h1>
          <p>Silakan masuk terlebih dahulu untuk melihat keranjang belanja Anda.</p>
        </div>
      </div>
    );
  }

  const handleQuantityChange = async (item, newQuantity) => {
    if (newQuantity < 1) {
      toast({ title: "Error", description: "Quantity must be at least 1", variant: "destructive" });
      return;
    }
    try {
      await removeItem(item.id);
      await addItem({ ...item, quantity: newQuantity });
      toast({ title: "Success", description: "Quantity updated" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to update quantity", variant: "destructive" });
    }
  };

  const total = cartItems.reduce((sum, item) => sum + ((item.price || 0) * item.quantity), 0);

  const handleCheckout = () => {
    if (!meetingTime) {
      toast({ title: "Error", description: "Silakan pilih waktu pertemuan terlebih dahulu", variant: "destructive" });
      return;
    }

    const products = cartItems.map(item => `${item.name} (${item.quantity})`).join(', ');
    const message = `*Pesanan Baru dari TelugeAgro*\n\nNama: ${currentUser.displayName || currentUser.email}\nEmail: ${currentUser.email}\n\nProduk yang dipesan:\n${products}\n\nTotal: Rp ${total.toLocaleString('id-ID')}\nWaktu Pertemuan: ${meetingTime}\n\nMohon konfirmasi apakah tim GRR dapat melayani pada waktu tersebut.`;

    const whatsappUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`; // Replace with actual WhatsApp number
    window.open(whatsappUrl, '_blank');
  };

  const recommendedProducts = packages.map(pkg => ({
    id: pkg.id,
    name: pkg.name,
    price: parseInt(pkg.price) || 0,
    image: pkg.image
  }));

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-8">
                <Link to="/" className="flex items-center space-x-2">
                  <img src="/logo.webp" alt="TelugeAgro Logo" className="h-8 w-8" />
                  <span className="font-bold text-xl text-green-600">TelugeAgro</span>
                </Link>
                <div className="hidden md:flex space-x-6">
                  <Link to="/" className="text-gray-700 hover:text-green-600">Beranda</Link>
                  <Link to="/packages" className="text-gray-700 hover:text-green-600">Toko</Link>
                  <Link to="/about" className="text-gray-700 hover:text-green-600">Tentang</Link>
                  <Link to="/contact" className="text-gray-700 hover:text-green-600">Kontak</Link>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Link to="/cart" className="flex items-center space-x-2 text-gray-700 hover:text-green-600">
                  <ShoppingBag className="h-5 w-5" />
                  <span>Keranjang Belanja</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">Keranjang Belanja</h1>
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Keranjang Masih Kosong</h2>
            <p className="text-gray-500 mb-6">Yuk mulai pesan dulu!</p>
            <Link to="/packages">
              <Button className="bg-green-600 hover:bg-green-700">
                Mulai Belanja
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center space-x-2">
                <img src="/logo.webp" alt="TelugeAgro Logo" className="h-8 w-8" />
                <span className="font-bold text-xl text-green-600">TelugeAgro</span>
              </Link>
              <div className="hidden md:flex space-x-6">
                <Link to="/" className="text-gray-700 hover:text-green-600">Beranda</Link>
                <Link to="/packages" className="text-gray-700 hover:text-green-600">Toko</Link>
                <Link to="/about" className="text-gray-700 hover:text-green-600">Tentang</Link>
                <Link to="/contact" className="text-gray-700 hover:text-green-600">Kontak</Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/cart" className="flex items-center space-x-2 text-gray-700 hover:text-green-600">
                <ShoppingBag className="h-5 w-5" />
                <span>Keranjang Belanja ({cartItems.length})</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Cart Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Keranjang Belanja</h1>
          <p className="text-gray-600">Review produk pilihan Anda sebelum melakukan pemesanan</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Cart Items */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ShoppingBag className="h-5 w-5" />
                  <span>Produk dalam Keranjang</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <img
                      src={item.image || '/Aset/asset (1).jpg'}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-green-600 font-bold">Rp {(item.price || 0).toLocaleString('id-ID')}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Continue Shopping */}
            <div className="flex justify-between items-center">
              <Link to="/packages">
                <Button variant="outline" className="flex items-center space-x-2">
                  <ArrowRight className="h-4 w-4 rotate-180" />
                  <span>Lanjut Belanja</span>
                </Button>
              </Link>
            </div>

            {/* Tutorial Steps */}
            <Card>
              <CardHeader>
                <CardTitle>Tutorial Cara Pemesanan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { step: 1, title: 'Pilih Paket', desc: 'Kunjungi halaman toko dan pilih paket pernikahan yang Anda inginkan.' },
                    { step: 2, title: 'Tambahkan ke Keranjang', desc: 'Klik tombol "Tambah ke Keranjang" dan atur jumlah yang diinginkan.' },
                    { step: 3, title: 'Periksa Keranjang', desc: 'Review paket dalam keranjang, sesuaikan jumlah jika perlu.' },
                    { step: 4, title: 'Pilih Waktu Pertemuan', desc: 'Pilih waktu yang sesuai untuk konsultasi langsung dengan tim GRR.' },
                    { step: 5, title: 'Kirim Pesanan via WhatsApp', desc: 'Konfirmasi pesanan dan dapatkan konfirmasi dari tim GRR apakah dapat melayani.' }
                  ].map((tutorial) => (
                    <div key={tutorial.step} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-bold">{tutorial.step}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">{tutorial.title}</h4>
                        <p className="text-sm text-gray-600">{tutorial.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Butuh bantuan?</strong> Hubungi kami via WhatsApp untuk panduan lebih detail.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Recommended Products */}
            <Card>
              <CardHeader>
                <CardTitle>Rekomendasi Produk</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {recommendedProducts.map(product => (
                    <div key={product.id} className="text-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-24 object-cover rounded-lg mb-2"
                      />
                      <h4 className="font-semibold text-sm">{product.name}</h4>
                      <p className="text-green-600 font-bold text-sm">Rp {product.price.toLocaleString('id-ID')}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Meeting Time Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Pilih Waktu Pertemuan</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select value={meetingTime} onValueChange={setMeetingTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih waktu pertemuan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pagi (08:00 - 12:00)">Pagi (08:00 - 12:00)</SelectItem>
                    <SelectItem value="Siang (12:00 - 15:00)">Siang (12:00 - 15:00)</SelectItem>
                    <SelectItem value="Sore (15:00 - 18:00)">Sore (15:00 - 18:00)</SelectItem>
                    <SelectItem value="Malam (18:00 - 21:00)">Malam (18:00 - 21:00)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-600">
                  Pilih waktu yang sesuai untuk konsultasi langsung dengan tim GRR
                </p>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Ringkasan Pesanan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>Rp {total.toLocaleString('id-ID')}</span>
                </div>
                <Button onClick={handleCheckout} className="w-full bg-green-600 hover:bg-green-700 flex items-center space-x-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>Kirim Pesanan via WhatsApp</span>
                </Button>
              </CardContent>
            </Card>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <Shield className="h-5 w-5 text-green-600" />
                <span className="font-semibold">Pembayaran Aman</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-blue-600" />
                <span className="font-semibold">Garansi Kualitas</span>
              </div>
            </div>



            {/* Purchase History */}
            <Card>
              <CardHeader>
                <CardTitle>Riwayat Pembelian</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-sm">Gagal memuat riwayat</p>
                <Button variant="outline" className="w-full mt-4">
                  Lihat Semua Pesanan →
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
