import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { packages } from '../data/mockData';
import { Sparkles, Check, ArrowRight } from 'lucide-react';

const Packages = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Wedding Package', 'Special Makeup', 'Engagement', 'Decoration Only'];

  const filteredPackages =
    selectedCategory === 'All'
      ? packages
      : packages.filter((pkg) => pkg.category === selectedCategory);

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-amber-50 to-pink-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-amber-100 text-amber-700 border-amber-200 mb-4">
            Paket & Harga
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Paket Pernikahan Terbaik
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Pilih paket yang sesuai dengan kebutuhan dan budget Anda. Semua paket dapat disesuaikan dengan keinginan Anda.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                className={selectedCategory === category ? 'bg-amber-600 hover:bg-amber-700' : 'border-amber-600 text-amber-600 hover:bg-amber-50'}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => (
              <Card
                key={pkg.id}
                className={`group hover:shadow-2xl transition-all duration-300 border-2 overflow-hidden ${
                  pkg.popular ? 'border-amber-500 relative transform lg:scale-105' : 'border-gray-200'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-amber-500 text-white text-center py-2 text-sm font-semibold z-10">
                    PALING POPULER
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
                      <Badge className="bg-red-500 text-white border-0 text-lg px-3 py-1">
                        Hemat {pkg.discount}
                      </Badge>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>

                <CardContent className={`p-6 ${pkg.popular ? 'pt-14' : 'pt-6'}`}>
                  <div className="mb-4">
                    <Badge variant="outline" className="text-amber-600 border-amber-600 mb-3">
                      {pkg.category}
                    </Badge>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  </div>

                  <div className="mb-6 pb-6 border-b">
                    {pkg.originalPrice && (
                      <p className="text-gray-400 line-through text-sm mb-1">
                        Rp {parseInt(pkg.originalPrice).toLocaleString('id-ID')}
                      </p>
                    )}
                    <p className="text-3xl font-bold text-amber-600">
                      Rp {parseInt(pkg.price).toLocaleString('id-ID')}
                    </p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <h4 className="font-semibold text-gray-900 flex items-center">
                      <Sparkles className="h-5 w-5 text-amber-500 mr-2" />
                      Yang Anda Dapatkan:
                    </h4>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-600">
                          <Check className="h-4 w-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                    Pilih Paket Ini
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Package */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-amber-50">
        <div className="container mx-auto px-4">
          <Card className="border-0 shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto">
                <img
                  src="https://images.unsplash.com/photo-1522673607211-8e2e4a06e9e2?w=800&h=600&fit=crop"
                  alt="Custom Package"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
              </div>
              <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                <Badge className="bg-amber-100 text-amber-700 border-amber-200 mb-4 w-fit">
                  Paket Custom
                </Badge>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Butuh Paket Khusus?
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Tidak menemukan paket yang sesuai? Tenang! Kami dapat membuat paket custom sesuai dengan kebutuhan dan budget Anda. Konsultasikan kebutuhan acara Anda dengan tim kami.
                </p>
                <div className="space-y-3 mb-6">
                  {[
                    'Fleksibel disesuaikan dengan budget',
                    'Pilih layanan yang Anda butuhkan',
                    'Konsultasi gratis dengan tim profesional',
                    'Harga transparan tanpa biaya tersembunyi'
                  ].map((item, i) => (
                    <div key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>
                <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white">
                  Konsultasi Paket Custom
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-amber-600 to-amber-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Sudah Menemukan Paket yang Tepat?
          </h2>
          <p className="text-amber-50 mb-8 max-w-2xl mx-auto">
            Hubungi kami sekarang juga untuk booking dan dapatkan diskon spesial!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-amber-600 hover:bg-gray-100">
              Hubungi via WhatsApp
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Konsultasi Gratis
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Packages;