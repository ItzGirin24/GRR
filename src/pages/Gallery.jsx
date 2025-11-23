import React, { useState } from 'react';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { gallery } from '../data/mockData';
import { X } from 'lucide-react';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = ['All', 'Wedding', 'Decoration', 'Bridal Makeup'];

  const filteredGallery =
    selectedCategory === 'All'
      ? gallery
      : gallery.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-amber-50 to-pink-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-amber-100 text-amber-700 border-amber-200 mb-4">
            Portfolio
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Galeri Karya Kami
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Lihat hasil karya terbaik kami yang telah membuat ratusan pasangan bahagia. Setiap momen diabadikan dengan sempurna.
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

      {/* Gallery Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer"
                onClick={() => setSelectedImage(item)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <Badge className="bg-amber-500 text-white border-0 mb-2">
                      {item.category}
                    </Badge>
                    <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                    <p className="text-white/90 text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-amber-500 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-8 w-8" />
          </button>
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="w-full h-auto rounded-lg"
            />
            <div className="bg-white p-6 rounded-b-lg">
              <Badge className="bg-amber-500 text-white border-0 mb-3">
                {selectedImage.category}
              </Badge>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedImage.title}</h3>
              <p className="text-gray-600">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-amber-600 to-amber-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ingin Hasil Seperti Ini?
          </h2>
          <p className="text-amber-50 mb-8 max-w-2xl mx-auto">
            Wujudkan acara impian Anda bersama tim profesional Griya Rias Ratih
          </p>
          <Button size="lg" className="bg-white text-amber-600 hover:bg-gray-100">
            Konsultasi Gratis Sekarang
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Gallery;