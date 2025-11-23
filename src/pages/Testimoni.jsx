import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from '../hooks/use-toast';

const Testimoni = () => {
  const [testimoniList, setTestimoniList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimoni = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'testimoni'));
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTestimoniList(data);
      } catch (error) {
        toast({ title: 'Error', description: 'Failed to fetch testimoni items', variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    };

    fetchTestimoni();
  }, []);

  if (loading) {
    return <p>Loading testimoni...</p>;
  }

  return (
    <section className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Testimoni</h1>
      {testimoniList.length === 0 ? (
        <p>No testimoni data available.</p>
      ) : (
        <ul className="space-y-4">
          {testimoniList.map((item) => (
            <li key={item.id} className="border p-4 rounded shadow">
              <p className="italic">"{item.comment}"</p>
              <p className="mt-2 font-semibold">- {item.author}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Testimoni;
