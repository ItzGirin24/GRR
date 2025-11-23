import React from 'react';

const Galeri = () => {
  return (
    <section className="container mx-auto px-6 py-10 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Galeri Griya Rias Ratih</h1>

      <p className="mb-6">
        Lihat hasil karya terbaik kami yang telah membuat ratusan pasangan bahagia. Setiap momen diabadikan dengan sempurna melalui karya kami di bidang makeup artistik dan dekorasi.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Galeri Foto</h2>
      <ul className="list-disc list-inside mb-6 text-gray-700 space-y-2">
        <li>Foto prosesi pernikahan dengan konsep klasik, modern, dan tradisional.</li>
        <li>Hasil makeup pengantin dan acara lamaran.</li>
        <li>Dekorasi pelaminan, backdrop, dan ruangan acara.</li>
        <li>Galeri makeup pra-wedding dan engagement.</li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Kontak Galeri</h2>
      <p>
        Untuk melihat lebih banyak foto, kunjungi galeri kami di Google Reviews:
      </p>
      <ul className="list-disc list-inside mb-6 text-blue-600 underline">
        <li><a href="https://www.google.com/maps/place/Griya+Rias+Ratih+Bu+Sri+Agus/@-7.7413266,109.9350712,16.72z/data=!4m6!3m5!1s0x2e7ac21b48cfa767:0xb3810533792fc23d!8m2!3d-7.7408736!4d109.9371464!16s%2Fg%2F11f_j3hgd5!5m1!1e4?entry=ttu&g_ep=EgoyMDI1MTExNy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer">Galeri 1 - Google Reviews</a></li>
        <li><a href="https://www.google.com/maps/place/Griya+Rias+Ratih+-+Galeri+2/@-7.7126753,109.9134087,17z/data=!3m1!4b1!4m6!3m5!1s0x2e7ac170dfa5819f:0x9470bbee76c06313!8m2!3d-7.7126806!4d109.9159836!16s%2Fg%2F11m5vvs25v!5m1!1e4?entry=ttu&g_ep=EgoyMDI1MTExNy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer">Galeri 2 - Google Reviews</a></li>
      </ul>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Hubungi Kami</h2>
      <p className="mb-1 font-semibold">Griya Rias Ratih</p>
      <p className="mb-1">Dewi No 20 Bayan Purworejo</p>
      <p className="mb-1">Perum Argopeni, Gg Bromo, Kutoarjo</p>
      <p className="mb-6">+628113531005</p>
    </section>
  );
};

export default Galeri;
