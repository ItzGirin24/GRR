import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { toast } from '../hooks/use-toast';

const Cart = () => {
  const { currentUser } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      fetchCartItems();
    }
  }, [currentUser]);

  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const cartRef = collection(db, 'cart');
      const snapshot = await getDocs(cartRef);
      const items = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(item => item.userId === currentUser.uid);
      setCartItems(items);
    } catch (error) {
      toast({ title: "Error", description: "Failed to load cart items", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id) => {
    try {
      await deleteDoc(doc(db, 'cart', id));
      toast({ title: "Success", description: "Item removed from cart" });
      fetchCartItems();
    } catch (error) {
      toast({ title: "Error", description: "Failed to remove item from cart", variant: "destructive" });
    }
  };

  const handleUpdateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      const itemRef = doc(db, 'cart', id);
      await updateDoc(itemRef, { quantity: newQuantity });
      fetchCartItems();
    } catch (error) {
      toast({ title: "Error", description: "Failed to update quantity", variant: "destructive" });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Keranjang Belanja</h1>
      {loading ? (
        <p>Loading cart items...</p>
      ) : cartItems.length === 0 ? (
        <p>Keranjang Anda kosong.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map(item => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle>{item.productName}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                    className="w-16 border rounded px-2 py-1"
                  />
                  <Button variant="destructive" onClick={() => handleRemove(item.id)}>
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
