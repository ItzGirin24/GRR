import React, { useState } from 'react';

const tabData = [
  {
    id: 'minimalis-wedding',
    label: 'Minimalis Wedding',
    packages: [
      {
        id: '6j-1',
        name: '6 Juta',
        price: 6000000,
        features: [
          'Dekorasi 6 x 3 m',
          'Set akad',
          'Bunga artificial',
          'Mini garden & karpet depan pelaminan',
          '1 Kotak sumbang',
          'Makeup pengantin',
          'Ronce melati (fresh)',
          'Sepasang busana akad',
          '2 Pasang makeup & busana ortu',
          '2 Roll foto',
          'Album foto magnetik'
        ],
        image: '/Aset/WEDDING PACKAGE (1).jpg'
      },
      {
        id: '8j-1',
        name: '8 Juta',
        price: 8000000,
        features: [
          'Dekorasi 6 x 3 m',
          'Set akad',
          'Bunga artificial mix',
          'Mini garden & karpet depan pelaminan',
          '1 Kotak sumbang',
          'Makeup pengantin',
          'Ronce melati (fresh)',
          'Henna putih',
          '2x Busana catin',
          '2x Retouch',
          '2 Pasang makeup & busana ortu',
          '2 Makeup & busana penjaga buku tamu',
          '2.5 roll foto',
          'Album foto magnetik'
        ],
        image: '/Aset/WEDDING PACKAGE (2).jpg'
      },
      {
        id: '10j-1',
        name: '10 Juta',
        price: 10000000,
        features: [
          'Set akad',
          'Bunga artificial mix fresh',
          'Mini garden & karpet depan pelaminan',
          '1 Kotak sumbang',
          'Welcome gate',
          '1 Meja buku tamu',
          'Makeup pengantin',
          'Ronce melati (fresh)',
          'Henna putih',
          '2x Busana catin',
          '2 Pasang makeup & busana ortu',
          '4 Makeup & busana penjaga buku tamu',
          'Foto cetak 4R x 80',
          'Unlimited shoot, all file at flashdisk',
          '2.5 roll foto',
          'Album foto magnetik'
        ],
        image: '/Aset/WEDDING PACKAGE (3).jpg'
      }
    ]
  },
  {
    id: 'Medium-wedding',
    label: 'Medium Wedding',
    packages: [
      {
        id: '12j-2',
        name: '12 Juta',
        price: 12000000,
        features: [
          'Dekorasi 6 x 3 m',
          'Setting meja kursi akad',
          'Bunga artificial mix fresh',
          '1 Kotak sumbang',
          'Mini garden & karpet depan pelaminan',
          'Makeup pengantin',
          'Ronce melati (fresh)',
          '3x Busana catin',
          '2x Retouch',
          '2 Pasang makeup & busana ortu',
          '2 Makeup & busana penjaga buku tamu',
          '2 Pengipas',
          '2 Foto roll & album foto',
          'Cetak frame 12RS',
          'Tenda tratak siap H-3',
          'MC & acara adat',
          '1 Blower',
          'FREE Soft lens, Nail Fake, Hand Bouquet',
        ],
        image: '/Aset/MediumWeddin (1)12juta.jpg' 
      },
      {
        id: '14j-2',
        name: '14 Juta',
        price: 14000000,
        features: [
          'Dekorasi 8 x 3 m',
          'Setting meja kursi akad',
          'Bunga artificial mix fresh',
          '1 Kotak sumbang',
          'Mini garden & karpet depan pelaminan',
          'Makeup pengantin',
          'Ronce melati (fresh)',
          '3x Busana catin',
          '2x Retouch',
          '2 Pasang makeup & busana ortu',
          '2 Pengipas anak',
          '4 Makeup & busana penjaga buku tamu',
          '4 Busana pager bagus',
          '2.5 Foto roll',
          'Album foto',
          'Cetak frame 12RS',
          'Tenda tratak siap H-3',
          'MC & acara adat',
          '1 Blower',
          'GRIYA RIAS RATIH',
          'FREE Soft lens, Nail Fake, Hand Bouquet',
        ],
        image: '/Aset/MediumWeddin (2)14juta.jpg' 
      },
      {
        id: '16j-2',
        name: '16 Juta',
        price: 16000000,
        features: [
          'Dekorasi max 8x3 m',
          'Setting meja kursi akad',
          'Bunga artificial mix fresh',
          '1 Kotak sumbang',
          'Welcome gate',
          '1 Meja buku tamu',
          'Makeup pengantin',
          'Ronce melati (fresh)',
          'Henna putih',
          '3x Busana catin',
          '2 Pasang makeup & busana ortu',
          '4 Makeup & busana penjaga buku tamu',
          '2 Pengipas',
          '2 Pager bagus',
          'Foto cetak 4R x 80, unlimited shoot, all file (flashdisk)',
          'Album foto magnetik',
          'Cetak frame 12RS',
          'Vclip 3/5 menit',
          'Tenda tratak siap H-3',
          'MC & acara adat',
          'Cucuk lampah',
          '2 Blower',
          'FREE Soft lens, Nail Fake, Hand Bouquet',
        ],
        image: '/Aset/MediumWeddin (3)16juta.jpg' 

      },
      {
        id: '20j-2',
        name: '20 Juta',
        price: 20000000,
        features: [
          'Dekorasi max 8x3 m',
          'Setting meja kursi akad',
          'Bunga artificial mix fresh',
          '1 Kotak sumbang',
          'Mini garden & karpet depan pelaminan',
          'Welcome gate',
          '1 Meja buku tamu',
          'Makeup pengantin',
          'Ronce melati (fresh)',
          'Henna putih',
          '3x Busana catin',
          '2x Retouch',
          '2 Pasang makeup & busana ortu',
          '4 Makeup & busana penjaga buku tamu',
          '2 Pengipas anak',
          '4 Busana pager bagus',
          '4 Pasang among tamu',
          'Foto cetak 4R x 100, unlimited shoot, all file (flashdisk)',
          'Album foto magnetik',
          'Vclip 3/5 menit',
          'Cetak frame 12RS',
          'Tenda tratak siap H-3',
          'MC & acara adat',
          'Cucuk lampah',
          'Hiburan (player, 2 singer, kendang, MC hiburan, panggung hiburan)',
          '2 Blower',
        ],
           image: '/Aset/MediumWeddin (4)20juta.jpg' 

      },
    ]
  },
  {
    id: 'complete-wedding',
    label: 'Complete Wedding',
    packages: [
      {
        id: '25j-3',
        name: '25 Juta',
        price: 25000000,
        features: [
          'FREE (SOFTLENS, NAIL FAKE, HAND BOUQUET)',
          'Dekorasi max 8 x 3 m',
          'Sett akad / pragola akad',
          'Bunga artificial mix fresh',
          '1 Kotak sumbang',
          'Taman depan pelaminan',
          'Karpet depan pelaminan',
          'Welcome gate',
          '2 Meja buku tamu',
          'Dekor lorong & area buku tamu',
          'Makeup catin',
          'Ronce melati (fresh)',
          'Henna putih',
          '3x Busana catin',
          '2x Retouch',
          '2 Pasang makeup & busana ortu',
          '4 Makeup & busana penjaga tamu',
          'Photo unlimited shoot (file di flashdisk)',
          'Album foto magnetik',
          'Vclip',
          'Tenda tratak siap h-3',
          'MC & acara adat',
          'Cucuk lampah',
          'Hiburan (player, 2 singer, kendang, MC hiburan)',
          'Panggung hiburan',
          '2 Meja 2 set alat prasmanan',
          '2 Meja bulat',
          '300 set alat makan (piring, gelas, mangkuk sup, sendok besar, sendok kecil)',
          '4 Gubukan',
          '2 Blower',
          '200 Kursi plastik + 100 cover kursi',
          'Griya Rias Ratih GRR',
        ],
        images: [
          '/Aset/complitewedding25jt (1).jpg',
          '/Aset/complitewedding25jt (2).jpg',
          '/Aset/complitewedding25jt (3).jpg'
        ]
      },
      {
        id: '30j-3',
        name: '30 Juta',
        price: 30000000,
        features: [
          'FREE (SOFTLENS, NAIL FAKE, HAND BOUQUET)',
          'Dekorasi max 8 x 3 m',
          'Set akad / pragola akad',
          'Bunga artificial mix fresh',
          '1 Kotak sumbang',
          'Taman depan pelaminan',
          'Karpet depan pelaminan',
          'Welcome gate',
          '2 Meja buku tamu',
          'Dekor tata ruang (lorong, standing flower, red karpet, photo booth)',
          'Makeup pengantin',
          'Ronce melati (fresh)',
          'Henna putih',
          '3x Busana catin',
          '2x Retouch',
          '2 Pasang makeup & busana ortu',
          '4 Makeup & busana penjaga tamu',
          'Album foto magnetik',
          'Vclip',
          'Tenda tratak siap h-3',
          'MC & acara adat',
          'Cucuk lampah',
          'Hiburan (player, 2 singer, MC hiburan)',
          'Sexophone / kendang',
          '2 Meja 2 set alat prasmanan',
          '2 Meja bulat',
          '300 set alat makan (piring, gelas, mangkuk sup, sendok besar, sendok kecil)',
          '4 Gubukan',
          '2 Blower',
          '200 Kursi plastik + 100 cover kursi',
          'EO Wedding',
        ],
        images: [
          '/Aset/complitewedding30jt (1).jpg',
          '/Aset/complitewedding30jt (2).jpg',
          '/Aset/complitewedding30jt (3).jpg'
        ]
      },
    ]
  },
  {
    id: 'paket-dekorasi',
    label: 'Paket Dekorasi',
    packages: [
      {
        id: '3_5j-4',
        name: '3,5 - 5 Juta',
        price: 3500000,
        features: [
    
          'DEKORASI 6 M LIGHTING',
          'SET AKAD',
          'MINI GARDEN',
          'WELCOME GATE',
          '1 KOTAK SUMBANG',
          'MEJA BUKU TAMU',
          'STAND FOTO PREWEDD',
          'HAND BOUQUET',
          'UMBUL - UMBUL',
        ],
        image: '/Aset/Dekorasi1.jpg' 
      },
      {
        id: '7j-4',
        name: '7 Juta',
        price: 7000000,
        features: [
          'SET AKAD',
          'DEKORASI 8 M LIGHTING',
          'MINI GARDEN',
          'WELCOME GATE MIRROR',
          '1 KOTAK SUMBANG',
          '2 MEJA BUKU TAMU',
          'MINI LORONG',
          'STAND FLOWER',
          'KARPET JALAN',
          'SPOT PHOTO BOOTH',
          'STAND PHOTO PREWEDD',
          'HAND BOUQUET',
          'UMBUL - UMBUL',
        ],
        image: '/Aset/Dekorasi2.jpg' 
      },
      {
        id: '9j-4',
        name: '9 Juta',
        price: 9000000,
        features: [
          'DEKORASI 8 M LIGHTING',
          'SET AKAD AKRILIK',
          'MINI GARDEN',
        ],
        image: '/Aset/Dekorasi3.jpg' 
      },
      {
        id: '14j-4',
        name: '14 Juta',
        price: 14000000,
        features: [
          'WELCOME GATE MIRROR',
          '1 KOTAK SUMBANG',
          '2 MEJA BUKU TAMU',
          'MINI LORONG',
          'STAND FLOWER',
          'KARPET JALAN',
          'SPOT PHOTO BOOTH',
          'STAND PHOTO PREWEDD',
          'HAND BOUQUET',
          'LIGHTING MOVING',
          'AC PELAMINAN',
          'DRY ICE / EFEK ASAP',
          'UMBUL - UMBUL',
        ],
        image: '/Aset/Dekorasi5.jpg' 
      },
      {
        id: 'ff-4',
        name: 'Full Fresh Flowers',
        price: 20000000,
        features: [
          'DEKORASI 8 M LIGHTING',
          'FULL FRESH FLOWERS',
          'SET AKAD AKRILIK',
          'MINI GARDEN',
          'WELCOME GATE MIRROR',
          '1 KOTAK SUMBANG',
          '2 MEJA BUKU TAMU',
          'MINI LORONG',
          'STAND FLOWER',
          'KARPET JALAN',
          'SPOT PHOTO BOOTH',
          'STAND PHOTO PREWEDD',
          'HAND BOUQUET',
          'LIGHTING MOVING',
          'AC PELAMINAN',
          'DRY ICE / EFEK ASAP',
          'UMBUL - UMBUL',
        ],
        image: '/Aset/Dekorasi4.jpg' 
      },
    ]
  },
];

import { useCart } from '../context/CartContext';

const Packages = () => {
  const [activeTab, setActiveTab] = useState(tabData[0].id);

  const { addItem } = useCart();

  const handleAddToCart = (pkg, categoryLabel) => {
    addItem({
      productId: pkg.id,
      name: pkg.name,
      category: categoryLabel,
      features: pkg.features,
      image: pkg.image || (pkg.images ? pkg.images[0] : ''),
      price: pkg.price,
      quantity: 1,
    });
  };

  return (
    <section className="pt-24 container mx-auto px-6 py-10 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-12 text-center">
        Paket & Harga
      </h1>
      <div className="mb-6 flex flex-wrap justify-center border-b border-gray-300">
        {tabData.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`px-4 py-2 m-1 font-semibold rounded-t-lg transition-colors duration-300 ${
              activeTab === id
                ? 'bg-yellow-400 text-yellow-900 border-t border-l border-r border-yellow-400'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {tabData.map(({ id, label, packages }) => {
          if (activeTab !== id || !packages) return null;

          return packages.map(({ id: pkgId, name, price, features, image, images }) => (
            <div
              key={pkgId}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {images ? (
                <div className="grid grid-cols-3 gap-1">
                  {images.map((imgSrc, index) => (
                    <img
                      key={index}
                      src={imgSrc}
                      alt={`${name} - image ${index + 1}`}
                      className="w-full h-48 object-cover"
                    />
                  ))}
                </div>
              ) : (
                <img src={image} alt={name} className="w-full h-48 object-cover" />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{name}</h2>
                <ul className="text-gray-700 text-sm list-disc list-inside space-y-1">
                  {features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
                <button
                  onClick={() => handleAddToCart({ id: pkgId, name, price, features, image, images }, label)}
                  className="mt-4 px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition"
                >
                  Masukkan Keranjang
                </button>
              </div>
            </div>
          ));
        })}
      </div>
    </section>
  );
};

export default Packages;

