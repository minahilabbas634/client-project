import { Product } from '../types';

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 'ittifaq-01',
    slug: 'ivory-woven-shawl-embroidered-border',
    name: 'Ivory Woven Shawl with Embroidered Border',
    category: 'traditional',
    categories: ['traditional', 'winter'],
    categoryLabel: 'Traditional & Embroidered',
    gender: 'men',
    audience: 'men',
    description: 'Fine textured warm ivory woven shawl featuring an authentic multi-color geometric embroidered border band in earthy tones and finished fringe tassels. Sized for an elegant, dignified drape.',
    price: 18500, // PKR 18,500
    currency: 'PKR',
    image: '/assets/aistudio/Ivory_Woven_Throw_with_Embroidered_Trim_d5885064.png',
    images: [
      '/assets/aistudio/Ivory_Woven_Throw_with_Embroidered_Trim_d5885064.png',
    ],
    colours: ['Warm Ivory with Earthy Geometric Trim'],
    fabric: 'Fine Woven Wool with Embroidered Selvedge',
    dimensions: 'Full Men\'s Doshala / Unisex Drape',
    availability: 'In Stock',
    featured: true,
    isDemoSample: false,
    verifiedBadges: ['Authentic Product Photo', 'Embroidered Border'],
  },
  {
    id: 'ittifaq-02',
    slug: 'classic-black-winter-shawl-embroidered-trim',
    name: 'Classic Black Winter Shawl with Embroidered Trim',
    category: 'winter',
    categories: ['winter', 'traditional'],
    categoryLabel: 'Winter Shawls',
    gender: 'men',
    audience: 'men',
    description: 'Rich deep black winter shawl crafted with an elaborate embroidered geometric border band featuring gold, terracotta, and emerald tones with fine twisted fringe. Tailored for classic winter warmth.',
    price: 22500, // PKR 22,500
    currency: 'PKR',
    image: '/assets/aistudio/Black_Shawls_with_Embroidered_Borders_bfff21eb.png',
    images: [
      '/assets/aistudio/Black_Shawls_with_Embroidered_Borders_bfff21eb.png',
    ],
    colours: ['Jet Black with Multi-Tone Border'],
    fabric: 'Heavyweight Winter Wool',
    dimensions: 'Full Men\'s Doshala Drape',
    availability: 'In Stock',
    featured: true,
    isDemoSample: false,
    verifiedBadges: ['Authentic Product Photo', 'Winter Weight'],
  },
  {
    id: 'ittifaq-03',
    slug: 'heather-grey-twill-shawl-geometric-border',
    name: 'Heather Grey Twill Shawl with Geometric Border',
    category: 'winter',
    categories: ['winter', 'traditional'],
    categoryLabel: 'Winter Shawls',
    gender: 'men',
    audience: 'men',
    description: 'Textured heather grey twill-weave shawl with an authentic traditional geometric border strip in rich ochre, burgundy, and black with hand-knotted fringe tassels.',
    price: 16500, // PKR 16,500
    currency: 'PKR',
    image: '/assets/aistudio/Grey_Woven_Shawl_with_Geometric_Trim_13037005.png',
    images: [
      '/assets/aistudio/Grey_Woven_Shawl_with_Geometric_Trim_13037005.png',
    ],
    colours: ['Heather Grey with Ochre Geometric Border'],
    fabric: 'Twill Weave Pure Wool',
    dimensions: 'Standard Men\'s Winter Cut',
    availability: 'In Stock',
    featured: true,
    isDemoSample: false,
    verifiedBadges: ['Authentic Product Photo', 'Twill Weave'],
  },
  {
    id: 'ittifaq-04',
    slug: 'ivory-floral-embroidered-shawl-tulip-border',
    name: 'Ivory Floral Embroidered Shawl with Tulip Border',
    category: 'traditional',
    categories: ['traditional', 'winter'],
    categoryLabel: 'Traditional & Embroidered',
    gender: 'women',
    audience: 'women',
    description: 'Gracefully draped soft ivory shawl detailed with colorful botanical tulip needlework along the fringed border and scattered delicate booti motifs across the body.',
    price: 24000, // PKR 24,000
    currency: 'PKR',
    image: '/assets/aistudio/Embroidered_Ivory_Shawl_with_Floral_Border_d80124fa.png',
    images: [
      '/assets/aistudio/Embroidered_Ivory_Shawl_with_Floral_Border_d80124fa.png',
    ],
    colours: ['Soft Ivory with Botanical Tulip Embroidery'],
    fabric: 'Fine Embroidered Wool Blend',
    dimensions: 'Women\'s Full Wrap (approx. 40 in × 80 in)',
    availability: 'In Stock',
    featured: true,
    isDemoSample: false,
    verifiedBadges: ['Authentic Product Photo', 'Floral Needlework'],
  },
  {
    id: 'ittifaq-05',
    slug: 'black-embroidered-shawl-magenta-diamond-motif',
    name: 'Black Embroidered Shawl with Magenta Diamond Motif',
    category: 'traditional',
    categories: ['traditional', 'fashion'],
    categoryLabel: 'Traditional & Embroidered',
    gender: 'women',
    audience: 'women',
    description: 'Striking black draped shawl embellished with an all-over vibrant magenta and pink geometric diamond cross-stitch embroidery pattern. Bold, festive, and timeless.',
    price: null, // Price on request (Artisan Hand Embroidery)
    currency: 'PKR',
    image: '/assets/aistudio/Magenta_Embroidered_Black_Draped_Textile_6d21603b.png',
    images: [
      '/assets/aistudio/Magenta_Embroidered_Black_Draped_Textile_6d21603b.png',
    ],
    colours: ['Jet Black with Magenta Diamond Embroidery'],
    fabric: 'Embroidered Fine Textile',
    dimensions: 'Women\'s Full Wrap',
    availability: 'In Stock',
    featured: true,
    isDemoSample: false,
    verifiedBadges: ['Authentic Product Photo', 'All-Over Embroidery'],
  },
  {
    id: 'ittifaq-06',
    slug: 'black-draped-shawl-silver-floral-booti',
    name: 'Black Draped Shawl with Silver Floral Booti Motifs',
    category: 'fashion',
    categories: ['fashion', 'traditional', 'winter'],
    categoryLabel: 'Contemporary & Festive Shawls',
    gender: 'women',
    audience: 'women',
    description: 'Sophisticated black draped shawl featuring delicate silver-white floral booti motifs arranged along diagonal vines, finished with neat embroidered border lines and fringe.',
    price: null, // Price on request (Bespoke festive craft)
    currency: 'PKR',
    image: '/assets/aistudio/Embroidered_Black_Draped_Shawl_d6f0af87.png',
    images: [
      '/assets/aistudio/Embroidered_Black_Draped_Shawl_d6f0af87.png',
    ],
    colours: ['Jet Black with Silver-White Floral Motifs'],
    fabric: 'Soft Drape Wool Blend',
    dimensions: 'Women\'s Full Wrap',
    availability: 'In Stock',
    featured: true,
    isDemoSample: false,
    verifiedBadges: ['Authentic Product Photo', 'Festive Drape'],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return SAMPLE_PRODUCTS.find((p) => p.slug === slug);
}

export function getRelatedProducts(currentId: string, limit = 3): Product[] {
  const current = SAMPLE_PRODUCTS.find((p) => p.id === currentId);
  if (!current) return SAMPLE_PRODUCTS.slice(0, limit);
  
  // Prefer same audience/gender, then same category
  const related = SAMPLE_PRODUCTS.filter((p) => p.id !== currentId)
    .sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;
      if (a.gender === current.gender) scoreA += 2;
      if (b.gender === current.gender) scoreB += 2;
      if (a.category === current.category) scoreA += 1;
      if (b.category === current.category) scoreB += 1;
      return scoreB - scoreA;
    });

  return related.slice(0, limit);
}
