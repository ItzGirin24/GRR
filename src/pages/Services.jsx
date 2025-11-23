import React from 'react';
import { services } from '../data/mockData';

const PreweddingPackages = () => {
  return (
    <section className="mt-12 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Prewedding Packages</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-300">
          <img src="/Aset/Classic.jpg" alt="Classic Prewedding" className="w-full h-48 object-cover rounded mb-4" />
          <h3 className="text-xl font-semibold mb-2">Classic</h3>
          <p className="text-gray-700 mb-1">500K</p>
          <ul className="text-gray-700 text-sm list-disc list-inside space-y-1">
            <li>Makeup</li>
            <li>Busana sepasang</li>
          </ul>
        </div>
        <div className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-300">
          <img src="/Aset/Indor.jpg" alt="Indoor Prewedding" className="w-full h-48 object-cover rounded mb-4" />
          <h3 className="text-xl font-semibold mb-2">Indoor</h3>
          <p className="text-gray-700 mb-1">1500K</p>
          <ul className="text-gray-700 text-sm list-disc list-inside space-y-1">
            <li>Makeup</li>
            <li>Busana sepasang</li>
            <li>Ganti tema casual</li>
            <li>Menyediakan busana sendiri</li>
            <li>Foto studio</li>
            <li>File (flashdisk)</li>
            <li>Cetak frame 12RS</li>
          </ul>
        </div>
        <div className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-300">
          <img src="/Aset/Outdor.jpg" alt="Outdoor Prewedding" className="w-full h-48 object-cover rounded mb-4" />
          <h3 className="text-xl font-semibold mb-2">Outdoor</h3>
          <p className="text-gray-700 mb-1">2000K</p>
          <ul className="text-gray-700 text-sm list-disc list-inside space-y-1 mb-2">
            <li>Makeup</li>
            <li>Busana sepasang</li>
            <li>Ganti tema casual</li>
            <li>Menyediakan busana sendiri</li>
            <li>Foto outdoor (transport biaya sendiri)</li>
            <li>File (flashdisk)</li>
            <li>Cetak frame 12RS</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <section className="container mx-auto px-6 py-10 bg-gradient-to-r from-white via-gray-50 to-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-10 text-center">
        Layanan Griya Rias Ratih
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {services.map(({ id, name, description, image }) => (
          <div
            key={id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img src={image} alt={name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{name}</h2>
              <p className="text-gray-700 text-sm">{description}</p>
            </div>
          </div>
        ))}
      </div>

      <PreweddingPackages />

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Prosedur Booking</h2>
        <p className="mb-2 text-gray-800">
          Berikut adalah syarat dan ketentuan (Terms & Conditions) untuk mengamankan tanggal pemesanan di Griya
          Rias Ratih:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>DP minimal 500k</li>
          <li>Pembayaran 50% (2 minggu sebelum hari H)</li>
          <li>Pelunasan maksimal 4 hari setelah hari H</li>
          <li>Silahkan datang ke galeri atau transfer ke rekening kami</li>
          <li>Rek BCA an Ratih Indri Hapsari 2340274027</li>
          <li>Kirimkan bukti transfer ke WhatsApp Griya Rias Ratih</li>
        </ul>
      </div>
      <div className="mt-12 text-gray-900">
        <h2 className="text-2xl font-bold mb-4">Kontak</h2>
        <p className="mb-1 font-semibold">Griya Rias Ratih</p>
        <p className="mb-1">Dewi No 20 Bayan Purworejo</p>
        <p className="mb-1">Perum Argopeni, Gg Bromo, Kutoarjo</p>
        <p className="mb-6">+628113531005</p>
      </div>
    </section>
  );
};

export default Services;
