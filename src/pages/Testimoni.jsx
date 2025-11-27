import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from '../hooks/use-toast';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Star, MapPin, Heart, Users } from 'lucide-react';
import { AnimatedSection, AnimatedStagger, StaggerItem } from '../components/AnimatedSection';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { motion } from 'framer-motion';
import { testimonials } from '../data/mockData';

const Testimoni = () => {
  const [testimoniList, setTestimoniList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimoni = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'testimoni'));
        const firebaseData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // Combine Firebase data with mock testimonials
        const combinedData = [...firebaseData, ...testimonials.map(t => ({ ...t, id: `mock-${t.id}` }))];
        setTestimoniList(combinedData);
      } catch (error) {
        // If Firebase fails, use mock data
        const mockData = testimonials.map(t => ({ ...t, id: `mock-${t.id}` }));
        setTestimoniList(mockData);
        toast({ title: 'Error', description: 'Failed to fetch testimoni items, showing mock data', variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    };

    fetchTestimoni();
  }, []);

  const stats = [
    {
      icon: Star,
      value: 5.0,
      label: "Rating Google Maps",
      suffix: "",
      color: "text-amber-600"
    },
    {
      icon: Heart,
      value: 500,
      label: "Pasangan Bahagia",
      suffix: "+",
      color: "text-pink-600"
    },
    {
      icon: Users,
      value: 100,
      label: "Kepuasan Pelanggan",
      suffix: "%",
      color: "text-green-600"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat testimoni...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-pink-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection className="text-center">
            <Badge className="bg-amber-100 text-amber-700 border-amber-200 mb-4">
              Testimoni Pelanggan
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Apa Kata Mereka Tentang Kami?
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ribuan pasangan telah mempercayai Griya Rias Ratih untuk mewujudkan hari spesial mereka.
              Berikut adalah cerita kebahagiaan dari pelanggan kami.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white relative">
        <div className="container mx-auto px-4">
          <AnimatedStagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <StaggerItem key={index}>
                <motion.div
                  className="text-center space-y-4 p-8 rounded-2xl hover:bg-amber-50/50 transition-colors group"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="flex justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  >
                    <stat.icon className={`h-12 w-12 ${stat.color} group-hover:scale-110 transition-transform`} />
                  </motion.div>
                  <div className="space-y-2">
                    <p className="text-4xl md:text-5xl font-bold text-gray-900">
                      <AnimatedCounter
                        end={stat.value}
                        suffix={stat.suffix}
                        decimals={stat.value % 1 !== 0 ? 1 : 0}
                      />
                    </p>
                    <p className="text-sm text-gray-600 font-medium uppercase tracking-wide">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </AnimatedStagger>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Cerita Kebahagiaan Pelanggan
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dengarkan langsung dari pasangan yang telah menggunakan jasa kami
            </p>
          </AnimatedSection>

          {testimoniList.length === 0 ? (
            <div className="text-center py-12">
              <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Belum ada testimoni yang tersedia.</p>
            </div>
          ) : (
            <AnimatedStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimoniList.map((item, index) => (
                <StaggerItem key={item.id}>
                  <motion.div
                    whileHover={{ y: -10, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="group hover:shadow-2xl transition-all duration-500 border-0 overflow-hidden h-full bg-white">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <div className="flex text-amber-500 mr-2">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-current" />
                            ))}
                          </div>
                          <Badge variant="outline" className="text-amber-600 border-amber-600 text-xs">
                            {item.rating || 5.0}
                          </Badge>
                        </div>

                        <blockquote className="text-gray-700 text-sm leading-relaxed mb-4 italic">
                          "{item.comment}"
                        </blockquote>

                        <div className="border-t pt-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <img
                                src={item.image || '/Aset/default-avatar.png'}
                                alt={`${item.author || item.name} profile`}
                                className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                                onError={(e) => {
                                  e.target.src = '/Aset/default-avatar.png';
                                }}
                              />
                              <div>
                                <p className="font-semibold text-gray-900 text-sm">
                                  {item.author || item.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {item.event || 'Pernikahan'}
                                </p>
                              </div>
                            </div>
                            <div className="text-xs text-gray-400">
                              {item.date ? (typeof item.date.toDate === 'function' ? new Date(item.date.toDate()).toLocaleDateString('id-ID') : item.date) : 'Baru-baru ini'}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </StaggerItem>
              ))}
            </AnimatedStagger>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-amber-600 to-amber-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Bergabunglah dengan Ribuan Pasangan Bahagia
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-amber-50">
            Jadilah bagian dari cerita sukses Griya Rias Ratih. Hubungi kami sekarang untuk konsultasi gratis!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-amber-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
              Hubungi Kami
            </button>
            <button className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
              Lihat Paket
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimoni;
