import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';

const Profile = () => {
  const { currentUser } = useAuth();

  const [cartCount, setCartCount] = useState(0);
  const [orders, setOrders] = useState([]);
  const [totalSpend, setTotalSpend] = useState(0);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      fetchData();
    }
  }, [currentUser]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const cartSnapshot = await getDocs(collection(db, 'cart'));
      const userCartItems = cartSnapshot.docs.filter(doc => doc.data().userId === currentUser.uid);
      setCartCount(userCartItems.length);

      const ordersRef = collection(db, 'purchases');
      const q = query(ordersRef, where('userId', '==', currentUser.uid));
      const ordersSnapshot = await getDocs(q);
      const userOrders = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(userOrders);

      const spend = userOrders.reduce((acc, order) => acc + (order.total || 0), 0);
      setTotalSpend(spend);

      setLoyaltyPoints(userOrders.length * 10);

    } catch (error) {
      console.error('Failed to fetch profile data:', error);
    } finally {
      setLoading(false);
    }
  };

  const membershipDate = currentUser?.metadata?.creationTime
    ? new Date(currentUser.metadata.creationTime).toLocaleDateString()
    : 'N/A';

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Profil Saya</h1>

      <div className="flex items-center space-x-6 mb-8">
        {currentUser.photoURL ? (
          <img
            src={currentUser.photoURL}
            alt={currentUser.displayName || currentUser.email}
            className="w-24 h-24 rounded-full object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-4xl text-white">
            {currentUser.displayName?.[0] || currentUser.email?.[0] || 'U'}
          </div>
        )}
        <div>
          <h2 className="text-xl font-semibold">{currentUser.displayName || currentUser.email}</h2>
          <p className="text-gray-600">{currentUser.email}</p>
          <p className="mt-2">🛍️ Customer</p>
          <p>📅 Member sejak {membershipDate}</p>
        </div>
      </div>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center mb-8">
            <div>
              <div className="text-3xl font-bold">{cartCount}</div>
              <div>🛒 Item di Keranjang</div>
            </div>
            <div>
              <div className="text-3xl font-bold">{orders.length}</div>
              <div>📦 Total Pesanan</div>
            </div>
            <div>
              <div className="text-3xl font-bold">Rp {totalSpend.toLocaleString()}</div>
              <div>💰 Total Belanja</div>
            </div>
            <div>
              <div className="text-3xl font-bold">{loyaltyPoints}</div>
              <div>⭐ Poin Loyalitas</div>
            </div>
          </div>

          <div className="space-y-4 max-w-md mx-auto">
            <Button
              onClick={() => window.location.href = '/cart'}
              className="w-full"
            >
              🛒 Keranjang Saya
            </Button>
            <Button
              onClick={() => window.location.href = '/profile/orders'}
              className="w-full"
            >
              📦 Riwayat Pesanan
            </Button>
            <Button
              onClick={() => window.location.href = '/profile/activity'}
              className="w-full"
            >
              📈 Aktivitas Belanja
            </Button>
            <Button
              onClick={() => window.location.href = '/help'}
              className="w-full"
              variant="outline"
            >
              📞 Bantuan
            </Button>
          </div>

          <div className="mt-8 border p-6 rounded-3xl shadow-md max-w-md mx-auto">
            <h3 className="text-2xl font-bold mb-4">Item di Keranjang Anda</h3>
            {cartCount === 0 ? (
              <p className="text-center text-gray-600 text-lg mb-6">🛒 Keranjang Masih Kosong</p>
            ) : (
              <ul className="list-disc list-inside mb-6 max-h-40 overflow-auto space-y-2">
                <li>Placeholder: Item details to be implemented</li>
              </ul>
            )}

            <div className="flex justify-center space-x-6">
              <Button 
                onClick={() => window.location.href = '/services'}
                className="bg-amber-500 text-white hover:bg-amber-600 transition-colors"
              >
                🛍️ Mulai Belanja
              </Button>
              <Button 
                onClick={() => window.location.href = '/services'}
                className="bg-amber-400 text-white hover:bg-amber-500 transition-colors"
              >
                🛍️ Belanja Lagi
              </Button>
              <Button 
                onClick={() => window.location.href = '/cart'}
                className="bg-yellow-500 text-white hover:bg-yellow-600 transition-colors"
              >
                🛒 Lihat Keranjang
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
