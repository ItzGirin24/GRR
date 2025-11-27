import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { testimonials } from '../data/mockData';
import { Star, Quote, Heart, Users } from 'lucide-react';
import { AnimatedSection, AnimatedStagger, StaggerItem } from '../components/AnimatedSection';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { motion } from 'framer-motion';

const Testimonials = () => {
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

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-amber-50 to-pink-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-amber-100 text-amber-700 border-amber-200 mb-4">
            Testimoni
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Apa Kata Mereka?
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Kepuasan klien adalah prioritas utama kami. Berikut adalah testimoni dari klien yang telah mempercayai layanan Griya Rias Ratih.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="flex justify-center mb-3">
                <Star className="h-8 w-8 text-amber-500 fill-amber-500" />
              </div>
              <p className="text-4xl font-bold text-gray-900 mb-2">5.0</p>
              <p className="text-gray-600">Rating Google Maps</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-gray-900 mb-2">500+</p>
              <p className="text-gray-600">Pasangan Bahagia</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-gray-900 mb-2">100%</p>
              <p className="text-gray-600">Kepuasan Pelanggan</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <Quote className="h-10 w-10 text-amber-500/20" />
                  </div>
                  
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>

                  <p className="text-gray-700 mb-6 leading-relaxed italic">
                    "{testimonial.comment}"
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center">
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
                    <Badge variant="outline" className="text-amber-600 border-amber-600">
                      {testimonial.event}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Google Reviews Link */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <Card className="max-w-2xl mx-auto border-2 border-amber-200 shadow-lg">
            <CardContent className="p-8">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-8 w-8 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Lihat Review Kami di Google Maps
              </h3>
              <p className="text-gray-600 mb-6">
                Baca lebih banyak testimoni dari klien kami yang puas di Google Maps
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://www.google.com/maps/place/Griya+Rias+Ratih+Bu+Sri+Agus/@-7.7413266,109.9350712,16.72z/data=!4m6!3m5!1s0x2e7ac21b48cfa767:0xb3810533792fc23d!8m2!3d-7.7408736!4d109.9371464!16s%2Fg%2F11f_j3hgd5!5m1!1e4?entry=ttu&g_ep=EgoyMDI1MTExNy4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors"
                >
                  Galeri 1 - Google Reviews
                </a>
                <a
                  href="https://www.google.com/maps/place/Griya+Rias+Ratih+-+Galeri+2/@-7.7126753,109.9134087,17z/data=!3m1!4b1!4m6!3m5!1s0x2e7ac170dfa5819f:0x9470bbee76c06313!8m2!3d-7.7126806!4d109.9159836!16s%2Fg%2F11m5vvs25v!5m1!1e4?entry=ttu&g_ep=EgoyMDI1MTExNy4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors"
                >
                  Galeri 2 - Google Reviews
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-amber-600 to-amber-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Siap Menjadi Bagian dari Cerita Sukses Kami?
          </h2>
          <p className="text-amber-50 mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan ratusan pasangan yang telah mempercayai Griya Rias Ratih
          </p>
          <button className="px-8 py-4 bg-white text-amber-600 hover:bg-gray-100 font-semibold rounded-lg transition-colors">
            Konsultasi Gratis Sekarang
          </button>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;