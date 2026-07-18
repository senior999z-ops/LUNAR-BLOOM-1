export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  category: 'pret' | 'formal' | 'accessories';
  type: 'stitched' | 'unstitched';
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  notes: string[];
  fabric: string;
  size: string;
}

export const products: Product[] = [
  {
    id: 'chandni-rose-pret',
    name: 'Chandni Rose Pret',
    tagline: 'Three-Piece Ready-to-Wear',
    description:
      'A flowing chiffon kameez in moonlit rose, paired with a silk dupatta embroidered with silver thread. Crafted for the woman who carries the grace of a Lahore evening wherever she goes.',
    price: 18900,
    category: 'pret',
    type: 'stitched',
    image:
      'https://images.pexels.com/photos/2065200/pexels-photo-2065200.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    reviews: 312,
    badge: 'Bestseller',
    notes: ['Chiffon', 'Silver Embroidery', 'Silk Dupatta'],
    fabric: 'Chiffon Kameez, Silk Dupatta, Cotton Trousers',
    size: 'XS — XL',
  },
  {
    id: 'shahtoot-formal',
    name: 'Shahtoot Formal',
    tagline: 'Embroidered Formal Suit',
    description:
      'Deep mulberry silk with intricate gota work along the neckline and sleeves. A piece inspired by the mango orchards of Punjab, blooming with golden thread.',
    price: 34500,
    category: 'formal',
    type: 'stitched',
    image:
      'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    reviews: 198,
    notes: ['Silk', 'Gota Work', 'Hand-Embroidered'],
    fabric: 'Pure Silk, Net Dupatta, Raw Silk Trousers',
    size: 'XS — XL',
  },
  {
    id: 'gulab-pret',
    name: 'Gulab Pret',
    tagline: 'Lawn Summer Suit',
    description:
      'A breathable cotton lawn suit in soft rose, printed with delicate floral motifs. The everyday elegance of a Karachi summer, light as the sea breeze.',
    price: 8500,
    category: 'pret',
    type: 'stitched',
    image:
      'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.7,
    reviews: 156,
    notes: ['Cotton Lawn', 'Digital Print', 'Chiffon Dupatta'],
    fabric: 'Cotton Lawn, Chiffon Dupatta, Cotton Trouser',
    size: 'XS — XXL',
  },
  {
    id: 'mahool-formal',
    name: 'Mahool Formal',
    tagline: 'Velvet Winter Formal',
    description:
      'A rich velvet formal in midnight blue with silver tilla embroidery. Designed for winter celebrations in Islamabad, where the air is crisp and the evenings warm.',
    price: 42500,
    category: 'formal',
    type: 'stitched',
    image:
      'https://images.pexels.com/photos/2065200/pexels-photo-2065200.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    reviews: 267,
    badge: 'New',
    notes: ['Velvet', 'Tilla Work', 'Net Dupatta'],
    fabric: 'Velvet, Net Dupatta, Raw Silk Trousers',
    size: 'XS — XL',
  },
  {
    id: 'chameli-pret',
    name: 'Chameli Pret',
    tagline: 'Chikankari Cotton Suit',
    description:
      'Pure white cotton with delicate chikankari thread work, inspired by the jasmine flowers that bloom in the courtyards of Old Lahore. Effortless grace for every day.',
    price: 12500,
    category: 'pret',
    type: 'stitched',
    image:
      'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.6,
    reviews: 143,
    notes: ['Cotton', 'Chikankari', 'Thread Work'],
    fabric: 'Cotton Kameez, Cotton Dupatta, Cotton Trouser',
    size: 'XS — XXL',
  },
  {
    id: 'motia-accessories',
    name: 'Motia Dupatta',
    tagline: 'Hand-Embroidered Dupatta',
    description:
      'A sheer net dupatta with hand-embroidered motia flowers along the border. The finishing touch to any outfit, carrying the scent of a monsoon garden.',
    price: 6500,
    category: 'accessories',
    type: 'stitched',
    image:
      'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.7,
    reviews: 112,
    notes: ['Net', 'Hand-Embroidered', 'Motia'],
    fabric: 'Net Dupatta',
    size: '2.5 Yards',
  },
  {
    id: 'shalimar-formal',
    name: 'Shalimar Formal',
    tagline: 'Garden Print Formal Suit',
    description:
      'Inspired by the Shalimar Gardens, this formal suit features a cascading floral print on organza with hand-painted borders. A walk through a Mughal garden, captured in fabric.',
    price: 28500,
    category: 'formal',
    type: 'stitched',
    image:
      'https://images.pexels.com/photos/2065200/pexels-photo-2065200.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    reviews: 189,
    notes: ['Organza', 'Hand-Painted', 'Floral Print'],
    fabric: 'Organza Kameez, Net Dupatta, Silk Trouser',
    size: 'XS — XL',
  },
  {
    id: 'sufi-pret',
    name: 'Sufi Pret',
    tagline: 'Block Print Lawn Suit',
    description:
      'A traditional block print lawn suit in earthy tones, hand-printed by artisans in Sindh. Each stamp tells a story of the Indus Valley, worn with quiet pride.',
    price: 7800,
    category: 'pret',
    type: 'stitched',
    image:
      'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    reviews: 178,
    notes: ['Cotton Lawn', 'Block Print', 'Handmade'],
    fabric: 'Cotton Lawn, Cotton Dupatta, Cotton Trouser',
    size: 'XS — XXL',
  },
  {
    id: 'kashmir-shawl',
    name: 'Kashmir Shawl',
    tagline: 'Hand-Woven Pashmina',
    description:
      'A pure pashmina shawl woven in the valleys of Kashmir, with delicate aari embroidery along the border. Warmth and heritage, draped across your shoulders.',
    price: 22500,
    category: 'accessories',
    type: 'stitched',
    image:
      'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    reviews: 95,
    badge: 'New',
    notes: ['Pashmina', 'Aari Work', 'Hand-Woven'],
    fabric: 'Pure Pashmina',
    size: '100 x 200 cm',
  },
  // Unstitched
  {
    id: 'gulnar-unstitched',
    name: 'Gulnar Unstitched',
    tagline: 'Embroidered Lawn 3-Piece',
    description:
      'An unstitched 3-piece lawn suit with embroidered neckline and printed dupatta. Tailor it to your own fit and style — the freedom of unstitched elegance.',
    price: 6800,
    category: 'pret',
    type: 'unstitched',
    image:
      'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.7,
    reviews: 134,
    notes: ['Cotton Lawn', 'Embroidered Neckline', 'Printed Dupatta'],
    fabric: 'Cotton Lawn, Printed Dupatta, Cotton Trouser',
    size: 'Unstitched — 3 Pieces',
  },
  {
    id: 'yasmine-unstitched',
    name: 'Yasmine Unstitched',
    tagline: 'Chiffon Embroidered 3-Piece',
    description:
      'An unstitched chiffon 3-piece with sequined neckline and dyed dupatta. Perfect for semi-formal gatherings — stitch it your way.',
    price: 14500,
    category: 'formal',
    type: 'unstitched',
    image:
      'https://images.pexels.com/photos/2065200/pexels-photo-2065200.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    reviews: 89,
    badge: 'New',
    notes: ['Chiffon', 'Sequin Work', 'Dyed Dupatta'],
    fabric: 'Chiffon, Dyed Dupatta, Cotton Trouser',
    size: 'Unstitched — 3 Pieces',
  },
  {
    id: 'rani-unstitched',
    name: 'Rani Unstitched',
    tagline: 'Silk Formal 3-Piece',
    description:
      'An unstitched silk 3-piece with zari border and embroidered motifs. For the woman who wants the artistry of formal wear, tailored to her own measurements.',
    price: 22000,
    category: 'formal',
    type: 'unstitched',
    image:
      'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    reviews: 76,
    notes: ['Silk', 'Zari Border', 'Embroidered'],
    fabric: 'Pure Silk, Net Dupatta, Raw Silk Trouser',
    size: 'Unstitched — 3 Pieces',
  },
  {
    id: 'badan-unstitched',
    name: 'Badan Unstitched',
    tagline: 'Cotton Lawn Printed 3-Piece',
    description:
      'An unstitched printed cotton lawn 3-piece, light and breezy for summer days. The everyday luxury of unstitched fabric, ready for your tailor.',
    price: 5200,
    category: 'pret',
    type: 'unstitched',
    image:
      'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.6,
    reviews: 112,
    notes: ['Cotton Lawn', 'Digital Print', 'Cotton Dupatta'],
    fabric: 'Cotton Lawn, Cotton Dupatta, Cotton Trouser',
    size: 'Unstitched — 3 Pieces',
  },
  {
    id: 'mehfil-unstitched',
    name: 'Mehfil Unstitched',
    tagline: 'Organza Embroidered 3-Piece',
    description:
      'An unstitched organza 3-piece with delicate thread embroidery and a painted dupatta. For celebrations where you want to stand out, stitched to perfection.',
    price: 18500,
    category: 'formal',
    type: 'unstitched',
    image:
      'https://images.pexels.com/photos/2065200/pexels-photo-2065200.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    reviews: 67,
    badge: 'Bestseller',
    notes: ['Organza', 'Thread Embroidery', 'Painted Dupatta'],
    fabric: 'Organza, Painted Dupatta, Silk Trouser',
    size: 'Unstitched — 3 Pieces',
  },
  {
    id: 'saheli-unstitched',
    name: 'Saheli Unstitched',
    tagline: 'Lawn Block Print 3-Piece',
    description:
      'An unstitched block print lawn 3-piece, hand-printed by Sindhi artisans. The joy of choosing your own silhouette, with the heritage of handcraft.',
    price: 4500,
    category: 'pret',
    type: 'unstitched',
    image:
      'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.7,
    reviews: 98,
    notes: ['Cotton Lawn', 'Block Print', 'Handmade'],
    fabric: 'Cotton Lawn, Cotton Dupatta, Cotton Trouser',
    size: 'Unstitched — 3 Pieces',
  },
];

export const collections = [
  {
    id: 'pret-collection',
    name: 'Pret Collection',
    description: 'Everyday elegance for the modern Pakistani woman.',
    image:
      'https://images.pexels.com/photos/2065200/pexels-photo-2065200.jpeg?auto=compress&cs=tinysrgb&w=1200',
    productIds: ['chandni-rose-pret', 'gulab-pret', 'chameli-pret', 'sufi-pret'],
  },
  {
    id: 'formal-edit',
    name: 'Formal Edit',
    description: 'For gatherings and celebrations that deserve more.',
    image:
      'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?auto=compress&cs=tinysrgb&w=1200',
    productIds: ['shahtoot-formal', 'mahool-formal', 'shalimar-formal'],
  },
  {
    id: 'unstitched-edit',
    name: 'Unstitched Edit',
    description: 'Choose your own silhouette — tailored to your measurements.',
    image:
      'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?auto=compress&cs=tinysrgb&w=1200',
    productIds: ['gulnar-unstitched', 'yasmine-unstitched', 'rani-unstitched', 'mehfil-unstitched'],
  },
  {
    id: 'accessories',
    name: 'Accessories',
    description: 'Dupattas, shawls, and the finishing touches.',
    image:
      'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?auto=compress&cs=tinysrgb&w=1200',
    productIds: ['motia-accessories', 'kashmir-shawl'],
  },
];

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

export function formatPKR(amount: number): string {
  return 'Rs ' + amount.toLocaleString('en-PK');
}