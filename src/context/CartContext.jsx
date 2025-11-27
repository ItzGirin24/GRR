import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { collection, query, where, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (!currentUser) {
      setCartItems([]);
      return;
    }

    const cartQuery = query(
      collection(db, 'carts'),
      where('userId', '==', currentUser.uid)
    );

    const unsubscribe = onSnapshot(cartQuery, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCartItems(items);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const addItem = async (item) => {
    if (!currentUser) return;
    const existingItem = cartItems.find(ci => ci.productId === item.productId);
    if (existingItem) {
      // Optionally update quantity or ignore duplicates
      return;
    }
    await addDoc(collection(db, 'carts'), {
      userId: currentUser.uid,
      ...item,
    });
  };

  const removeItem = async (cartItemId) => {
    await deleteDoc(doc(db, 'carts', cartItemId));
  };

  const value = {
    cartItems,
    addItem,
    removeItem,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
