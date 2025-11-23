import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Award, Heart, Star, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { heroData, services, packages, gallery, testimonials, stats } from '../data/mockData';
import { AnimatedSection, AnimatedStagger, StaggerItem } from '../components/AnimatedSection';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

const Home = () => {
  const [featuredServices, setFeaturedServices] = useState([]);
  const [featuredPackages, setFeaturedPackages] = useState([]);
  const [featuredGallery, setFeaturedGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedItems();
  }, []);

  const fetchFeaturedItems = async () => {
    try {
      // Fetch featured services
      const servicesQuery = query(collection(db, 'services'), where('featuredInHome', '==', true));
      const servicesSnapshot = await getDocs(servicesQuery);
      const servicesData = servicesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Fetch featured packages
      const packagesQuery = query(collection(db, 'packages'), where('featuredInHome', '==', true));
      const packagesSnapshot = await getDocs(packagesQuery);
      const packagesData = packagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Fetch featured gallery
      const galleryQuery = query(collection(db, 'gallery'), where('featuredInHome', '==', true));
      const gallerySnapshot = await getDocs(galleryQuery);
      const galleryData = gallerySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Fallback to mock data if no featured items
      setFeaturedServices(servicesData.length > 0 ? servicesData : services.slice(0, 4));
      setFeaturedPackages(packagesData.length > 0 ? packagesData : packages.slice(0, 3));
      setFeaturedGallery(galleryData.length > 0 ? galleryData : gallery.slice(0, 6));
    } catch (error) {
      console.error('Error fetching featured items:', error);
      // Fallback to mock data
      setFeaturedServices(services.slice(0, 4));
      setFeaturedPackages(packages.slice(0, 3));
      setFeaturedGallery(gallery.slice(0, 6));
    } finally {
      setLoading(false);
    }
  };

  const featuredTestimonials = testimonials.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-amber-50 via-white to-pink-50"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-sm px-4 py-1 mx-auto block w-max">
              Trusted Wedding Partner Since 2010
            </Badge>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <img
              src="/banner.svg"
              alt="Banner 3"
              className="block w-full object-cover mb-8"
            />
          </motion.div>

          <div className="max-w-4xl mx-auto text-center space-y-6">
            
            <motion.p 
              className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {heroData.description}
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-amber-600 hover:bg-amber-700 text-white text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  {heroData.ctaText}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-amber-600 text-amber-600 hover:bg-amber-50 text-lg px-8 py-6"
                  asChild
                >
                  <Link to="/gallery">{heroData.ctaSecondary}</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedStagger className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StaggerItem key={index}>
                <motion.div 
                  className="text-center space-y-3 p-6 rounded-xl hover:bg-amber-50/50 transition-colors"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="flex justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  >
                    {stat.icon === 'Award' && <Award className="h-10 w-10 text-amber-600" />}
                    {stat.icon === 'Heart' && <Heart className="h-10 w-10 text-amber-600" />}
                    {stat.icon === 'Star' && <Star className="h-10 w-10 text-amber-600" />}
                    {stat.icon === 'Image' && <ImageIcon className="h-10 w-10 text-amber-600" />}
                  </motion.div>
                  <p className="text-3xl md:text-4xl font-bold text-gray-900">
                    <AnimatedCounter end={stat.value} suffix={stat.value.includes('+') ? '+' : ''} />
                  </p>
                  <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </AnimatedStagger>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50 relative">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <Badge className="bg-amber-100 text-amber-700 border-amber-200 mb-4">
              Layanan Kami
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Layanan Terbaik untuk Hari Spesial Anda
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Kami menyediakan berbagai layanan profesional untuk membuat acara Anda sempurna
            </p>
          </AnimatedSection>

          <AnimatedStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
            {featuredServices.map((service, index) => (
              <StaggerItem key={service.id}>
                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="group hover:shadow-2xl transition-all duration-500 border-0 overflow-hidden h-full">
                    <div className="relative h-48 overflow-hidden">
                      <motion.img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.15 }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                      <motion.div 
                        className="absolute bottom-4 left-4 right-4"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Badge className="bg-amber-500 text-white border-0">Featured</Badge>
                      </motion.div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                        {service.name}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </StaggerItem>
            ))}
          </AnimatedStagger>

          <AnimatedSection className="text-center mt-12">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-amber-600 text-amber-600 hover:bg-amber-50"
                asChild
              >
                <Link to="/services">
                  Lihat Semua Layanan
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection className="text-center mb-12">
            <Badge className="bg-amber-100 text-amber-700 border-amber-200 mb-4">
              Paket Spesial
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Paket Wedding Terbaik
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Pilih paket yang sesuai dengan kebutuhan dan budget Anda
            </p>
          </AnimatedSection>

          <AnimatedStagger className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.15}>
            {featuredPackages.map((pkg) => (
              <StaggerItem key={pkg.id}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    className={`group hover:shadow-2xl transition-all duration-500 border-2 overflow-hidden h-full ${
                      pkg.popular ? 'border-amber-500 relative ring-4 ring-amber-100' : 'border-gray-200'
                    }`}
                  >
                    {pkg.popular && (
                      <motion.div 
                        className="absolute top-4 right-4 z-10"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        <Badge className="bg-amber-500 text-white border-0 shadow-lg">
                          Most Popular
                        </Badge>
                      </motion.div>
                    )}
                    <div className="relative h-64 overflow-hidden">
                      <motion.img
                        src={pkg.image}
                        alt={pkg.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.15 }}
                        transition={{ duration: 0.6 }}
                      />
                      {pkg.discount && (
                        <motion.div 
                          className="absolute top-4 left-4"
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Badge className="bg-red-500 text-white border-0 shadow-lg">
                            Hemat {pkg.discount}
                          </Badge>
                        </motion.div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <Badge variant="outline" className="text-amber-600 border-amber-600 mb-2">
                          {pkg.category}
                        </Badge>
                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                          {pkg.name}
                        </h3>
                      </div>
                      
                      <div className="mb-4">
                        {pkg.originalPrice && (
                          <p className="text-gray-400 line-through text-sm">
                            Rp {parseInt(pkg.originalPrice).toLocaleString('id-ID')}
                          </p>
                        )}
                        <p className="text-3xl font-bold text-amber-600">
                          Rp {parseInt(pkg.price).toLocaleString('id-ID')}
                        </p>
                      </div>

                      <ul className="space-y-2 mb-6">
                        {pkg.features.slice(0, 4).map((feature, index) => (
                          <motion.li 
                            key={index} 
                            className="flex items-start text-sm text-gray-600"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Sparkles className="h-4 w-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </motion.li>
                        ))}
                        {pkg.features.length > 4 && (
                          <li className="text-sm text-amber-600 font-medium">
                            +{pkg.features.length - 4} fitur lainnya
                          </li>
                        )}
                      </ul>

                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white shadow-lg hover:shadow-xl transition-shadow">
                          Pilih Paket
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </StaggerItem>
            ))}
          </AnimatedStagger>

          <AnimatedSection className="text-center mt-12">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-amber-600 text-amber-600 hover:bg-amber-50"
                asChild
              >
                <Link to="/packages">
                  Lihat Semua Paket
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-amber-100 text-amber-700 border-amber-200 mb-4">
              Portfolio
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Galeri Karya Kami
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Lihat hasil karya terbaik kami untuk inspirasi acara Anda
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {featuredGallery.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <Badge className="bg-amber-500 text-white border-0 mb-2">
                      {item.category}
                    </Badge>
                    <h3 className="text-white font-semibold">{item.title}</h3>
                    <p className="text-white/80 text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-amber-600 text-amber-600 hover:bg-amber-50"
              asChild
            >
              <Link to="/gallery">
                Lihat Galeri Lengkap
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-amber-100 text-amber-700 border-amber-200 mb-4">
              Testimoni
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Apa Kata Mereka?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Kepuasan klien adalah prioritas utama kami
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredTestimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-3"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.date}</p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    "{testimonial.comment}"
                  </p>
                  <Badge variant="outline" className="mt-4 text-amber-600 border-amber-600">
                    {testimonial.event}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-amber-600 text-amber-600 hover:bg-amber-50"
              asChild
            >
              <Link to="/testimonials">
                Lihat Semua Testimoni
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-amber-600 to-amber-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Siap Mewujudkan Pernikahan Impian Anda?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-amber-50">
            Hubungi kami sekarang untuk konsultasi gratis dan dapatkan penawaran terbaik!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-amber-600 hover:bg-gray-100 text-lg px-8 py-6"
            >
              Hubungi Kami
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 text-lg px-8 py-6"
              asChild
            >
              <Link to="/packages">Lihat Paket</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;