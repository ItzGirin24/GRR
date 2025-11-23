import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Award, Heart, Star, Image as ImageIcon } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { heroData, services, packages, gallery, testimonials, stats } from '../data/mockData';

const Home = () => {
  const featuredPackages = packages.slice(0, 3);
  const featuredGallery = gallery.slice(0, 6);
  const featuredTestimonials = testimonials.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-amber-50 via-white to-pink-50"
        style={{ backgroundImage: "url('')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
          <div className="container mx-auto px-4 relative z-10">

          <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-sm px-4 py-1 mx-auto block w-max">
            Trusted Wedding Partner Since 2010
          </Badge>

          <img
            src="/banner.svg"
            alt="Banner 3"
            className="block w-full object-cover mb-8"
          />

          <div className="max-w-4xl mx-auto text-center space-y-6">
            
            {/* <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              {heroData.title}
            </h1> */}
            
            {/* <p className="text-xl md:text-2xl text-amber-600 font-medium">
              {heroData.subtitle}
            </p> */}
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {heroData.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                className="bg-amber-600 hover:bg-amber-700 text-white text-lg px-8 py-6"
              >
                {heroData.ctaText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-amber-600 text-amber-600 hover:bg-amber-50 text-lg px-8 py-6"
                asChild
              >
                <Link to="/gallery">{heroData.ctaSecondary}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="flex justify-center">
                  {stat.icon === 'Award' && <Award className="h-8 w-8 text-amber-600" />}
                  {stat.icon === 'Heart' && <Heart className="h-8 w-8 text-amber-600" />}
                  {stat.icon === 'Star' && <Star className="h-8 w-8 text-amber-600" />}
                  {stat.icon === 'Image' && <ImageIcon className="h-8 w-8 text-amber-600" />}
                </div>
                <p className="text-3xl md:text-4xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-amber-100 text-amber-700 border-amber-200 mb-4">
              Layanan Kami
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Layanan Terbaik untuk Hari Spesial Anda
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Kami menyediakan berbagai layanan profesional untuk membuat acara Anda sempurna
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Card
                key={service.id}
                className="group hover:shadow-xl transition-all duration-300 border-0 overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
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
              <Link to="/services">
                Lihat Semua Layanan
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-amber-100 text-amber-700 border-amber-200 mb-4">
              Paket Spesial
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Paket Wedding Terbaik
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Pilih paket yang sesuai dengan kebutuhan dan budget Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPackages.map((pkg) => (
              <Card
                key={pkg.id}
                className={`group hover:shadow-2xl transition-all duration-300 border-2 overflow-hidden ${
                  pkg.popular ? 'border-amber-500 relative' : 'border-gray-200'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-amber-500 text-white border-0">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {pkg.discount && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-red-500 text-white border-0">
                        Save {pkg.discount}
                      </Badge>
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <Badge variant="outline" className="text-amber-600 border-amber-600 mb-2">
                      {pkg.category}
                    </Badge>
                    <h3 className="text-2xl font-bold text-gray-900">{pkg.name}</h3>
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
                      <li key={index} className="flex items-start text-sm text-gray-600">
                        <Sparkles className="h-4 w-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {pkg.features.length > 4 && (
                      <li className="text-sm text-amber-600 font-medium">
                        +{pkg.features.length - 4} fitur lainnya
                      </li>
                    )}
                  </ul>

                  <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                    Pilih Paket
                  </Button>
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
              <Link to="/packages">
                Lihat Semua Paket
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
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