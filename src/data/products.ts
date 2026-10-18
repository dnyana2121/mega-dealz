import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Royale Bridal 24-Piece Complete Makeup Vanity Kit',
    brand: 'GlamGoddess India',
    tagline: 'All-in-one luxury vanity box with foundation, primers, 18-shade eyeshadow, brushes & lip pigments',
    category: 'makeup-kits',
    categoryLabel: 'Makeup Kits & Combos',
    price: 199,
    originalPrice: 499,
    discountPercentage: 60,
    rating: 4.9,
    reviewCount: 1420,
    inStock: true,
    stockCount: 8,
    isDealOfTheDay: true,
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'The ultimate professional makeup kit customized for Indian skin tones. Includes 18 highly pigmented waterproof eyeshadow shades, 4 matte lipstick bullets, HD pore-blurring primer, luminous highlighter quad, contour palette, and 6 ultra-soft synthetic vegan brushes encased in a metallic rose-gold travel briefcase.',
    highlights: [
      'Tailored for warm, olive, and golden Indian undertones',
      'Sweatproof & 16-hour long-stay formula for weddings and festivities',
      'Dermatologically tested and 100% cruelty-free',
      'Includes gold-embossed travel vanity case with integrated LED mirror'
    ],
    shades: [
      { name: 'Bridal Warm Honey', hex: '#d49b6a' },
      { name: 'Royal Dusky Caramel', hex: '#b3784c' },
      { name: 'Golden Beige Fair', hex: '#e8c49e' }
    ],
    sizeOrVolume: '24 Items Full Vanity Set',
    keyIngredients: ['Argan Oil', 'Vitamin E', 'Hyaluronic Acid Micro-spheres', 'Jojoba Extract'],
    howToUse: 'Start with the HD pore primer across clean skin. Follow with contour and blendable foundation. Layer shadows starting with matte transitions before applying shimmer pigments. Finish with setting mist.',
    deliveryDays: 2
  },
  {
    id: 'prod-2',
    name: '18-Color Twilight Desert Rose Eyeshadow Palette',
    brand: 'Lakmé Absolute Elegance',
    tagline: 'Intense pigment butter-matte and pressed duochrome shimmers',
    category: 'lip-eye',
    categoryLabel: 'Lipsticks & Eye Makeup',
    price: 99,
    originalPrice: 299,
    discountPercentage: 67,
    rating: 4.8,
    reviewCount: 932,
    inStock: true,
    stockCount: 14,
    isDealOfTheDay: true,
    isTrending: true,
    image: 'https://images.unsplash.com/photo-1583241800698-e8ab01830a07?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1583241800698-e8ab01830a07?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Drench your eyelids in rich sunset golds, deep terracotta mattes, and celestial rose gold toppers. Ultra-fine micronized powder blends effortlessly without fallout, delivering crease-free wear for up to 14 hours.',
    highlights: [
      'Zero fallout and instant high-pigment single-swipe payoff',
      'Includes 10 velvety mattes, 6 reflective foils, and 2 pressed pearls',
      'Smudge-proof, monsoon-tested formula',
      'Double-ended blending brush included'
    ],
    sizeOrVolume: '19.8g Palette',
    keyIngredients: ['Kaolin Clay', 'Vitamin E', 'Micronized Mineral Pearls'],
    deliveryDays: 3
  },
  {
    id: 'prod-3',
    name: '10% Niacinamide & Rice Water Glass Glow Face Serum',
    brand: 'Minimalist Naturals',
    tagline: 'Minimizes enlarged pores, fades dark spots & strengthens skin barrier',
    category: 'skincare',
    categoryLabel: 'Skincare & Serums',
    price: 79,
    originalPrice: 249,
    discountPercentage: 68,
    rating: 4.9,
    reviewCount: 2840,
    inStock: true,
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608248597359-548483b8b982?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Formulated with pharmaceutical grade 10% pure Niacinamide paired with fermented Korean rice water and 1% Zinc PCA. Visibly refines skin texture, fades stubborn acne scars, regulates excess sebum, and delivers a radiant healthy glass-skin glow.',
    highlights: [
      'Clinically proven to reduce sebum and pore congestion within 14 days',
      'Alcohol-free, fragrance-free, essential oil-free formula',
      'Suitable for acne-prone, sensitive and combination Indian skin',
      'Fast-absorbing water-gel texture with zero stickiness'
    ],
    sizeOrVolume: '30ml Dropper Bottle',
    keyIngredients: ['Niacinamide (Vitamin B3) 10%', 'Fermented Rice Water 40%', 'Zinc PCA 1%', 'Centella Asiatica'],
    howToUse: 'Apply 2-3 drops morning and evening onto cleansed skin before moisturizers and sunscreen.',
    deliveryDays: 2
  },
  {
    id: 'prod-4',
    name: 'Velvet Matte Liquid Lipstick Trio (Nude, Berry & Crimson)',
    brand: 'Sugar Pop Supreme',
    tagline: 'Transferproof, featherlight 12-hour matte lipsticks set of 3',
    category: 'lip-eye',
    categoryLabel: 'Lipsticks & Eye Makeup',
    price: 79,
    originalPrice: 199,
    discountPercentage: 60,
    rating: 4.7,
    reviewCount: 715,
    inStock: true,
    stockCount: 6,
    isDealOfTheDay: true,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503236823255-94609f598e71?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Get 3 curated bestselling shades designed to complement desi undertones: Jaipur Rose (Everyday Dusty Pink), Bombay Bombshell (Warm Terracotta Brick), and Kolkata Crimson (Festive Royal Red). Non-drying whipped mousse formula enriched with sweet almond oil.',
    highlights: [
      'Zero transfer, non-sticky and weightless on lips',
      'Enriched with Vitamin E and Avocado Oil for moisturized lips',
      'Precision teardrop applicator for crisp contouring without liner',
      'Chai & snack resistant formula'
    ],
    shades: [
      { name: 'Jaipur Rose Nude', hex: '#c57874' },
      { name: 'Bombay Brick', hex: '#9d4a3e' },
      { name: 'Kolkata Crimson', hex: '#841922' }
    ],
    sizeOrVolume: '3 x 3.5ml Mini Lipsticks',
    keyIngredients: ['Sweet Almond Oil', 'Avocado Butter', 'Vitamin E', 'Candelilla Wax'],
    deliveryDays: 2
  },
  {
    id: 'prod-5',
    name: 'Kumkumadi Ayurvedic Radiance Night Gold Elixir Serum',
    brand: 'AyurVeda Botanics',
    tagline: 'Authentic 24K saffron & goat milk classical preparation for radiant skin',
    category: 'skincare',
    categoryLabel: 'Skincare & Serums',
    price: 129,
    originalPrice: 399,
    discountPercentage: 68,
    rating: 4.9,
    reviewCount: 1190,
    inStock: true,
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1608248597359-548483b8b982?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1608248597359-548483b8b982?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'A celebrated Ayurvedic formulation created with Kashmiri Mogra saffron (Kumkuma), pure Sandalwood, Lodhra, and organic goat milk. Massaged into damp skin before sleep, it brightens dull complexions, smoothes fine lines, and promotes natural radiance.',
    highlights: [
      '100% natural authentic Telapaka classical process',
      'Pure Kashmiri Saffron strands infused in cold-pressed Sesame oil',
      'Transforms tired and tanned skin into luminous golden glow',
      'Non-comedogenic, cruelty-free, zero mineral oils'
    ],
    sizeOrVolume: '25ml Dropper with Glass Pipette',
    keyIngredients: ['Kashmiri Saffron (Kumkuma)', 'Red Sandalwood (Raktachandana)', 'Manjistha', 'Licorice Root'],
    howToUse: 'Cleanse face and mist with rosewater. Take 3-4 drops onto palms, warm gently and press onto face and neck with upward circular strokes.',
    deliveryDays: 3
  },
  {
    id: 'prod-6',
    name: '12-Piece Premium Rose-Gold Marble Makeup Brush Set',
    brand: 'ProArtist Studio',
    tagline: 'Ultra-dense vegan silk bristles with velvet roll-up pouch',
    category: 'makeup-kits',
    categoryLabel: 'Makeup Kits & Combos',
    price: 149,
    originalPrice: 399,
    discountPercentage: 63,
    rating: 4.8,
    reviewCount: 654,
    inStock: true,
    stockCount: 11,
    isTrending: true,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Crafted for makeup enthusiasts and professional artists alike. Features dense yet cloud-soft nanofiber synthetic bristles that pick up liquid, cream, and powder makeup without absorption or shedding. Comes with elegant roll-up magnetic organizer.',
    highlights: [
      'Zero hair shedding with double-crimped copper ferrules',
      'Includes flat kabuki, tapered contour, angled blush, and 6 precision eye brushes',
      'Hypoallergenic fibers suitable for sensitive skin',
      'Washable and long-lasting ergonomic marbleized handles'
    ],
    sizeOrVolume: '12 Professional Brushes + Designer Pouch',
    keyIngredients: ['Synthetic Nanofiber Vegan Silk', 'Reinforced Aluminum Ferrules', 'FSC Beech Wood'],
    deliveryDays: 2
  },
  {
    id: 'prod-7',
    name: 'Rosemary & Red Onion Anti-Hair Fall Growth Combo',
    brand: 'KeshRoots Ayurveda',
    tagline: 'Herbal hair oil 200ml + Sulphate-free Keratin strengthening shampoo 250ml',
    category: 'haircare',
    categoryLabel: 'Haircare & Styling',
    price: 99,
    originalPrice: 299,
    discountPercentage: 67,
    rating: 4.7,
    reviewCount: 1530,
    inStock: true,
    isDealOfTheDay: true,
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Harness the clinically validated power of cold-pressed Rosemary extract and sulphur-rich organic Red Onion seed oil. Stimulates dormant hair follicles, combats monsoon dandruff, and stops breakage from roots.',
    highlights: [
      'Reduces hair fall up to 88% in 4 weeks of consistent application',
      'Sulphate, paraben, and silicone-free',
      'Comb-applicator cap included for deep root oiling without messy hands',
      'Enriched with Bhringraj, Amla, and Curry Leaves'
    ],
    sizeOrVolume: '200ml Oil + 250ml Shampoo',
    keyIngredients: ['Pure Rosemary Essential Oil', 'Red Onion Seed Oil', 'Bhringraj', 'Plant Keratin'],
    howToUse: 'Apply oil using comb nozzle onto scalp and massage for 10 minutes. Leave overnight or for 2 hours, then wash with the shampoo.',
    deliveryDays: 2
  },
  {
    id: 'prod-8',
    name: 'Royal Oudh & Velvet Kashmiri Rose Luxury Eau De Parfum',
    brand: 'Nawab Fragrances',
    tagline: 'Long-lasting artisan Indian attar perfume with 24-hour oriental sillage',
    category: 'fragrance',
    categoryLabel: 'Perfumes & Fragrance',
    price: 149,
    originalPrice: 449,
    discountPercentage: 67,
    rating: 4.9,
    reviewCount: 489,
    inStock: true,
    stockCount: 5,
    isTrending: true,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'An intoxicating blend of dark Assam agarwood (Oud), Damascus roses, spicy cardamom, and creamy Mysore sandalwood. Formulated at 22% oil concentration for magnetic lasting power through humid Indian weather.',
    highlights: [
      'Premium Eau De Parfum grade with 24-hour lingering fragrance',
      'Top notes: Cardamom & Pink Pepper | Heart: Kashmiri Rose & Geranium | Base: Royal Oud & Amber',
      'Elegant heavy glass flacon with magnetic gold crown cap',
      'Unisex blend suitable for wedding evenings, parties and gifting'
    ],
    sizeOrVolume: '100ml EDP Spray',
    deliveryDays: 3
  },
  {
    id: 'prod-9',
    name: 'Waterproof 24-Hour Jet Black Kajal & Volumizing Mascara Duo',
    brand: 'Maybelline New York India',
    tagline: 'Smudge-proof, contact lens friendly intense matte black eye duo',
    category: 'lip-eye',
    categoryLabel: 'Lipsticks & Eye Makeup',
    price: 49,
    originalPrice: 149,
    discountPercentage: 67,
    rating: 4.8,
    reviewCount: 3120,
    inStock: true,
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1503236823255-94609f598e71?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1503236823255-94609f598e71?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583241800698-e8ab01830a07?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Get deep kajal lined eyes and fluttery dramatic lashes in one stroke. Infused with soothing chamomile and almond oil, the retractable kajal glides effortlessly onto waterlines without stinging, while the lash-building mascara creates 10x volume without clumps.',
    highlights: [
      '100% waterproof, tear-proof and sweat-resistant for 24 hours',
      'Ophthalmologist tested and safe for sensitive eyes & contact lens wearers',
      'Deepest carbon black pigment formulation',
      'Special hourglass fiber brush lifts and curls straight Asian lashes'
    ],
    sizeOrVolume: '0.35g Kajal + 9.2ml Mascara',
    keyIngredients: ['Almond Oil', 'Chamomile Extract', 'Castor Oil Wax', 'Vitamin E'],
    deliveryDays: 2
  },
  {
    id: 'prod-10',
    name: 'Super Saver Festive Glam Bumper Combo Basket (Set of 6)',
    brand: 'MegaDealz Exclusive Curation',
    tagline: 'Primer + Foundation + Compact + Kajal + Lipstick + Makeup Sponge',
    category: 'combos',
    categoryLabel: 'Mega Deal Combos',
    price: 199,
    originalPrice: 599,
    discountPercentage: 67,
    rating: 4.9,
    reviewCount: 1870,
    inStock: true,
    stockCount: 19,
    isDealOfTheDay: true,
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Our top-rated viral festival beauty combo with unprecedented value! Everything you need for college, office, and festival gatherings packed into one value box. Includes blur primer, medium coverage liquid foundation, oil-control compact powder with SPF 20, matte red lipstick, smudge-proof kajal, and teardrop beauty blender sponge.',
    highlights: [
      'Massive savings compared to individual product purchases',
      'Guaranteed 100% genuine batch sealed directly from brand warehouses',
      'Includes complimentary glitter makeup pouch',
      'Available with Cash On Delivery & 7-day hassle-free replacement'
    ],
    shades: [
      { name: 'Light Ivory 01', hex: '#f0d3b6' },
      { name: 'Natural Honey 02', hex: '#dfb791' },
      { name: 'Warm Caramel 03', hex: '#ba8557' }
    ],
    sizeOrVolume: '6 Full-Size Products in Festival Gift Box',
    deliveryDays: 1
  },
  {
    id: 'prod-11',
    name: 'Ultra-Hydrating Hyaluronic Acid & Ceramide Water Cream',
    brand: 'GlowRx Derma',
    tagline: '72-Hour continuous barrier moisture for plump, dewy skin',
    category: 'skincare',
    categoryLabel: 'Skincare & Serums',
    price: 59,
    originalPrice: 199,
    discountPercentage: 70,
    rating: 4.8,
    reviewCount: 640,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Bursting with 5 multi-molecular weights of Hyaluronic Acid, 3 essential ceramides, and marine algae. Calms redness, locks in hydration without pore-clogging heaviness, and creates the ideal dewy canvas before makeup.',
    highlights: [
      'Oil-free quick absorbing gel-cream texture',
      'Fortifies damaged moisture barrier against air pollution and AC dryness',
      'Dermatologically tested, non-comedogenic',
      'Instant cooling sensation upon application'
    ],
    sizeOrVolume: '50g Glass Jar',
    keyIngredients: ['5D Hyaluronic Acid Complex', 'Ceramide NP, AP, EOP', 'Centella Asiatica', 'Allantoin'],
    howToUse: 'Scoop a dime-sized amount and gently massage onto face and neck until absorbed. Use twice daily.',
    deliveryDays: 2
  },
  {
    id: 'prod-12',
    name: 'Moroccan Argan Oil Deep Repair Hair Conditioning Mask',
    brand: 'KeshRoots Ayurveda',
    tagline: 'Revitalizes dry, frizzy, chemical-treated and heat-damaged hair',
    category: 'haircare',
    categoryLabel: 'Haircare & Styling',
    price: 79,
    originalPrice: 249,
    discountPercentage: 68,
    rating: 4.8,
    reviewCount: 812,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Salon-grade spa treatment in a jar. Cold-pressed virgin Moroccan Argan oil combined with hydrolyzed keratin and shea butter to restore split ends, eliminate humidity frizz, and restore mirror-like shine to rough tresses.',
    highlights: [
      'Smooths coarse frizz even in high humidity',
      'Color-safe and safe for keratin/rebonded hair',
      'Free from harsh parabens, sulfates, and mineral oils',
      'Delicious warm vanilla amber scent'
    ],
    sizeOrVolume: '200g Tub',
    keyIngredients: ['100% Pure Moroccan Argan Oil', 'Hydrolyzed Keratin', 'Shea Butter', 'Panthenol (Pro-Vitamin B5)'],
    deliveryDays: 2
  },
  {
    id: 'prod-13',
    name: 'Budget Clearance: 2-in-1 Cheek & Lip Tint Beetroot Glow',
    brand: 'Sugar Pop Supreme',
    tagline: 'Natural watercolor flush that stays fresh all day',
    category: 'clearance',
    categoryLabel: 'Clearance & Budget Steals',
    price: 39,
    originalPrice: 129,
    discountPercentage: 70,
    rating: 4.6,
    reviewCount: 420,
    inStock: true,
    stockCount: 4,
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Juicy, buildable tint made with organic beetroot juice and rosehip oil. Just dab two dots on apples of cheeks and lips for an effortlessly glowing "no-makeup" makeup look.',
    highlights: [
      'Multi-use for cheeks, lips and eyelids',
      'Non-patchy, featherlight blend with fingertips',
      'Enriched with antioxidant vitamin C and beetroot pigment',
      'Pocket-friendly everyday travel essential'
    ],
    sizeOrVolume: '10ml Tube',
    deliveryDays: 2
  },
  {
    id: 'prod-14',
    name: 'Sparkle Shimmer Body Mist & Perfumed Lotion Gift Set',
    brand: 'Nawab Fragrances',
    tagline: 'Subtle diamond sparkle particles with vanilla orchid fragrance',
    category: 'fragrance',
    categoryLabel: 'Perfumes & Fragrance',
    price: 99,
    originalPrice: 299,
    discountPercentage: 67,
    rating: 4.7,
    reviewCount: 390,
    inStock: true,
    stockCount: 9,
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Glow under the festive lights! Leaves skin shimmering with ultra-fine, eco-friendly mineral mica while wrapping you in sensual vanilla orchid, warm coconut, and white amber notes.',
    highlights: [
      'Micro-fine biodegradable sparkle for collarbones and arms',
      'Hydrating lotion leaves skin silky smooth for 24 hours',
      'Alcohol-reduced gentle formula',
      'Ideal gift set for Diwali, Eid, Rakhi and anniversaries'
    ],
    sizeOrVolume: '150ml Mist + 150ml Shimmer Body Lotion',
    deliveryDays: 2
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'All Mega Deals', icon: 'Sparkles', count: 14 },
  { id: 'makeup-kits', name: 'Makeup Kits & Vanity Sets', icon: 'PackageCheck', count: 3 },
  { id: 'skincare', name: 'Skincare & Serums', icon: 'Heart', count: 3 },
  { id: 'lip-eye', name: 'Lipsticks & Eye Makeup', icon: 'Eye', count: 3 },
  { id: 'haircare', name: 'Haircare & Growth', icon: 'Scissors', count: 2 },
  { id: 'fragrance', name: 'Perfumes & Mists', icon: 'Flame', count: 2 },
  { id: 'combos', name: 'Festive Bumper Combos', icon: 'Gift', count: 1 },
  { id: 'clearance', name: 'Clearance Under ₹99', icon: 'Tag', count: 1 },
];

export const TOP_BRANDS = [
  { name: 'Lakmé India', discount: 'Up to 67% Off', logoText: 'LAKMÉ' },
  { name: 'Sugar Cosmetics', discount: 'From ₹39 Only', logoText: 'SUGAR' },
  { name: 'Maybelline NY', discount: 'Kajal Duo @ ₹49', logoText: 'MAYBELLINE' },
  { name: 'Minimalist', discount: 'Serums @ ₹79', logoText: 'MINIMALIST' },
  { name: 'AyurVeda Botanics', discount: 'Night Oil @ ₹129', logoText: 'AYURVEDA' },
  { name: 'GlamGoddess', discount: 'Vanity Kits @ ₹199', logoText: 'GLAM GODDESS' },
];

export const PINCODES_DATABASE: Record<string, { city: string; state: string; days: number }> = {
  '110001': { city: 'New Delhi', state: 'Delhi', days: 1 },
  '400001': { city: 'Mumbai', state: 'Maharashtra', days: 1 },
  '560001': { city: 'Bengaluru', state: 'Karnataka', days: 2 },
  '500001': { city: 'Hyderabad', state: 'Telangana', days: 2 },
  '700001': { city: 'Kolkata', state: 'West Bengal', days: 2 },
  '600001': { city: 'Chennai', state: 'Tamil Nadu', days: 2 },
  '380001': { city: 'Ahmedabad', state: 'Gujarat', days: 2 },
  '302001': { city: 'Jaipur', state: 'Rajasthan', days: 2 },
  '226001': { city: 'Lucknow', state: 'Uttar Pradesh', days: 2 },
  '160017': { city: 'Chandigarh', state: 'Punjab/Haryana', days: 2 },
  '411001': { city: 'Pune', state: 'Maharashtra', days: 2 },
  '682001': { city: 'Kochi', state: 'Kerala', days: 3 },
  '781001': { city: 'Guwahati', state: 'Assam', days: 3 },
  '800001': { city: 'Patna', state: 'Bihar', days: 3 }
};
