import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { locations, socialMedia } from '../data/mockData';
import { MapPin, Phone, Mail, Instagram, Clock, Send } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submission
    toast({
      title: "Pesan Terkirim!",
      description: "Terima kasih! Tim kami akan segera menghubungi Anda.",
    });
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-amber-50 to-pink-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-amber-100 text-amber-700 border-amber-200 mb-4">
            Hubungi Kami
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Kami Siap Membantu Anda
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Punya pertanyaan atau ingin berkonsultasi? Hubungi kami melalui formulir di bawah atau kunjungi galeri kami.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Kirim Pesan</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Nama Lengkap *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Masukkan nama lengkap Anda"
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Nomor Telepon *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="08123456789"
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Pesan *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Ceritakan kebutuhan acara Anda..."
                    required
                    rows={6}
                    className="mt-2"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                  Kirim Pesan
                  <Send className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Informasi Kontak</h2>
              
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Telepon</p>
                      <a href={`tel:${socialMedia.whatsapp}`} className="text-gray-600 hover:text-amber-600 transition-colors">
                        {socialMedia.whatsapp}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <a href={`mailto:${socialMedia.email}`} className="text-gray-600 hover:text-amber-600 transition-colors">
                        {socialMedia.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Instagram className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Instagram</p>
                      <a
                        href={`https://instagram.com/${socialMedia.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-amber-600 transition-colors"
                      >
                        @{socialMedia.instagram}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Jam Operasional</p>
                      <p className="text-gray-600">Senin - Minggu</p>
                      <p className="text-gray-600">09:00 - 21:00 WIB</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-pink-50">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">WhatsApp</h3>
                  <p className="text-gray-600 mb-4">
                    Butuh respon cepat? Hubungi kami langsung via WhatsApp!
                  </p>
                  <a
                    href={`https://wa.me/${socialMedia.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full"
                  >
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                      Chat di WhatsApp
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Lokasi Kami</h2>
            <p className="text-gray-600">Kunjungi salah satu galeri kami untuk konsultasi langsung</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {locations.map((location) => (
              <Card key={location.id} className="border-0 shadow-lg overflow-hidden">
                <div className="relative h-64">
                  <iframe
                    src={location.embedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={location.name}
                  ></iframe>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{location.name}</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
                      <p className="text-gray-600">{location.address}</p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Phone className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
                      <a href={`tel:${location.phone}`} className="text-gray-600 hover:text-amber-600 transition-colors">
                        {location.phone}
                      </a>
                    </div>
                  </div>

                  <div className="mt-6">
                    <a
                      href={location.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block w-full"
                    >
                      <Button variant="outline" className="w-full border-amber-600 text-amber-600 hover:bg-amber-50">
                        Buka di Google Maps
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;