
import { Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'BB-001',
    name: 'iPhone 15 Pro Max',
    category: 'Phones',
    price: 18500,
    description: 'Forged in titanium and featuring the groundbreaking A17 Pro chip. The ultimate iPhone experience.',
    image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=800',
    stock: 8,
    featured: true,
    specs: ['256GB Storage', 'A17 Pro Chip', '48MP Main Camera', 'USB-C Charging'],
    variants: [
      { name: 'Color', options: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'] },
      { name: 'Storage', options: ['256GB', '512GB', '1TB'] }
    ]
  },
  {
    id: 'BB-002',
    name: 'MacBook Pro 14-inch',
    category: 'Laptops',
    price: 24500,
    description: 'The world’s best laptop display. A pro laptop like no other, now with the M3 family of chips.',
    image: 'https://images.unsplash.com/photo-1517336714467-d13a2323485d?auto=format&fit=crop&q=80&w=800',
    stock: 4,
    featured: true,
    specs: ['Apple M3 Pro', '18GB RAM', '512GB SSD', 'Liquid Retina XDR'],
    variants: [
      { name: 'Color', options: ['Space Black', 'Silver'] },
      { name: 'Chip', options: ['M3', 'M3 Pro', 'M3 Max'] }
    ]
  },
  {
    id: 'BB-003',
    name: 'AirPods Max',
    category: 'Audio',
    price: 6800,
    description: 'The ultimate personal listening experience is here. High-fidelity audio meets industry-leading Active Noise Cancellation.',
    image: 'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&q=80&w=800',
    stock: 12,
    specs: ['Active Noise Cancellation', 'Spatial Audio', '20 Hours Battery'],
    variants: [
      { name: 'Color', options: ['Silver', 'Space Gray', 'Sky Blue', 'Pink', 'Green'] }
    ]
  },
  {
    id: 'BB-004',
    name: 'PlayStation 5 Slim',
    category: 'Consoles',
    price: 8200,
    description: 'Experience lightning-fast loading and deeper immersion with haptic feedback and 3D Audio.',
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&q=80&w=800',
    stock: 6,
    specs: ['1TB SSD', '4K Gaming', 'DualSense Controller', 'High Speed HDMI'],
    variants: [
      { name: 'Version', options: ['Disc Version', 'Digital Version'] }
    ]
  },
  {
    id: 'BB-005',
    name: 'iPad Pro 12.9 M2',
    category: 'Laptops',
    price: 16500,
    description: 'Astonishing performance. Incredibly advanced displays. Superfast wireless connectivity.',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800',
    stock: 5,
    specs: ['M2 Chip', 'Liquid Retina XDR', 'Thunderbolt 4', 'Face ID'],
    variants: [
      { name: 'Color', options: ['Space Gray', 'Silver'] },
      { name: 'Connectivity', options: ['Wi-Fi', 'Wi-Fi + Cellular'] }
    ]
  },
  {
    id: 'BB-006',
    name: 'iPhone 13',
    category: 'Phones',
    price: 9200,
    description: 'Your new superpower. Advanced dual-camera system. Lightning-fast A15 Bionic chip.',
    image: 'https://images.unsplash.com/photo-1633114127188-99b4dd741180?auto=format&fit=crop&q=80&w=800',
    stock: 15,
    specs: ['128GB Storage', 'A15 Bionic', 'Ceramic Shield', 'IP68 Water Resistance'],
    variants: [
      { name: 'Color', options: ['Midnight', 'Starlight', 'Blue', 'Pink', 'Green'] }
    ]
  }
];
