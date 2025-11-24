import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const CountContext = createContext();

export const useCount = () => {
  return useContext(CountContext);
};

export const CountProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [cartCount, setCartCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);

  useEffect(() => {
    if (!currentUser) {
      setCartCount(0);
      setMessageCount(0);
      return;
    }

    const cartQuery = query(
      collection(db, 'carts'),
      where('userId', '==', currentUser.uid)
    );
    const unsubscribeCart = onSnapshot(cartQuery, (snapshot) => {
      setCartCount(snapshot.size);
    });

    const messageQuery = query(
      collection(db, 'messages'),
      where('recipientId', '==', currentUser.uid),
      where('read', '==', false)
    );
    const unsubscribeMessages = onSnapshot(messageQuery, (snapshot) => {
      setMessageCount(snapshot.size);
    });

    return () => {
      unsubscribeCart();
      unsubscribeMessages();
    };
  }, [currentUser]);

  const value = {
    cartCount,
    messageCount,
  };

  return (
    <CountContext.Provider value={value}>
      {children}
    </CountContext.Provider>
  );
};
