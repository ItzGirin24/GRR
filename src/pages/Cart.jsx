import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { toast } from '../hooks/use-toast';

const Cart = () => {
  const { cartItems, removeItem, addItem } = useCart();
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Keranjang Belanja</h1>
        <p>Silakan masuk terlebih dahulu untuk melihat keranjang belanja Anda.</p>
      </div>
    );
  }

  const groupedItems = cartItems.reduce((groups, item) => {
    const category = item.category || 'Others';
    if (!groups[category]) groups[category] = [];
    groups[category].push(item);
    return groups;
  }, {});

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

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Keranjang Belanja</h1>
        <p>Keranjang Anda kosong.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Keranjang Belanja</h1>
      <div className="space-y-8">
        {Object.entries(groupedItems).map(([category, items]) => (
          <div key={category}>
            <h2 className="text-xl font-semibold mb-4">{category}</h2>
            <div className="space-y-4">
              {items.map(item => (
                <Card key={item.id}>
                  <CardHeader>
                    <CardTitle>{item.name || item.productName}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col space-y-2">
                      {item.description && (
                        <p className="text-sm text-gray-600">{item.description}</p>
                      )}
                      {item.price !== undefined && (
                        <p className="text-sm font-semibold">Harga: Rp {item.price.toLocaleString('id-ID')}</p>
                      )}
                      <div className="flex items-center space-x-4">
                        <input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
                          className="w-16 border rounded px-2 py-1"
                        />
                        <Button variant="destructive" onClick={() => removeItem(item.id)}>
                          Hapus
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
