export interface Product {
  id: string;
  name: string;
  code: string;
  tagline: string;
  description: string;
  price: number;
  category: 'pret' | 'formal' | 'accessories';
  type: 'stitched' | 'unstitched';
  image: string;
  badge?: string;
  notes: string[];
  fabric: string;
  size: string;
}

export const products: Product[] = [
  {
    id: 'lb01-rose-mist',
    name: 'Rose Mist',
    code: 'LB01',
    tagline: 'Hand-Printed Floral Unstitched Suit',
    description:
      'A soft sage-green unstitched suit with delicate rose motifs, printed on breathable poly lawn. Paired with a flowing chiffon dupatta finished with matching rose prints and lace edging.',
    price: 3500,
    category: 'pret',
    type: 'unstitched',
    image: '/products/lb01.png',
    badge: 'New',
    notes: ['Poly Lawn', 'Chiffon Dupatta', 'Floral Print'],
    fabric: 'Poly Lawn Kameez & Trouser, Chiffon Dupatta',
    size: 'Unstitched — 3 Pieces',
  },
];

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

export function formatPKR(amount: number): string {
  return 'Rs ' + amount.toLocaleString('en-PK');
}
