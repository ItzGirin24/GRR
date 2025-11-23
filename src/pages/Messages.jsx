import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { motion } from 'framer-motion';

const Messages = () => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    const fetchMessages = async () => {
      try {
        const messagesRef = collection(db, 'messages');
        const q = query(
          messagesRef,
          where('recipientId', '==', currentUser.uid),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const msgs = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            senderName: data.senderName || 'Admin',
            text: data.text || '',
            createdAt: data.createdAt || null,
            read: data.read || false,
          };
        });
        setMessages(msgs);
      } catch (error) {
        console.error("Error fetching messages: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

  }, [currentUser]);

  return (
    <div className="container mx-auto max-w-4xl px-6 py-8">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-amber-600">Pesan Saya</h1>
      {loading ? (
        <p className="text-center text-gray-700">Loading messages...</p>
      ) : messages.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">Belum ada pesan.</p>
      ) : (
        <div className="space-y-6">
          {messages.map(message => (
            <motion.div
              key={message.id}
              className={`border rounded-2xl p-5 shadow-md cursor-pointer transition-colors duration-150 ${message.read ? 'bg-white' : 'bg-yellow-50'}`}
              whileHover={{ scale: 1.02 }}
              layout
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-amber-600">
                    {message.senderName}
                  </CardTitle>
                  <p className="text-sm text-gray-500">
                    {message.createdAt && message.createdAt.toDate
                      ? message.createdAt.toDate().toLocaleString()
                      : new Date().toLocaleString()}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-800">{message.text}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Messages;
