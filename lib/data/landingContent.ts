export interface ProductExample {
  slug: string;
  title: string;
  sourceMaterial: string;
  caption: string;
  safetyNote?: string;
  gradient: [string, string];
  isDemo: boolean;
}

export const PRODUCT_EXAMPLES: ProductExample[] = [
  {
    slug: 'tyre-wall-planter',
    title: 'Tyre Wall Planter',
    sourceMaterial: 'Scrap rubber tyre',
    caption: 'Cleaned, painted rim planter mounted for herbs or ornamentals.',
    gradient: ['#123D33', '#B7E36B'],
    isDemo: true,
  },
  {
    slug: 'tyre-vertical-garden',
    title: 'Tyre Vertical Garden',
    sourceMaterial: 'Stacked old tyres',
    caption: 'Tiered outdoor planter tower using weatherproof exterior paint.',
    gradient: ['#1B2A26', '#FFD23F'],
    isDemo: true,
  },
  {
    slug: 'egg-tray-wall-panel',
    title: 'Egg Tray Wall Panel',
    sourceMaterial: 'Pulp egg cartons',
    caption: 'Modular acoustic-style painted wall tiles for dry indoor studios.',
    safetyNote: 'Use fire-retardant sealers for studio interiors.',
    gradient: ['#C8A26B', '#FFD23F'],
    isDemo: true,
  },
  {
    slug: 'plastic-bag-wall-art',
    title: 'Plastic Bag Wall Art',
    sourceMaterial: 'Clean HDPE/LDPE bags',
    caption: 'Heat-pressed fused plastic collage framed as geometric wall decor.',
    safetyNote: 'Press only in a well-ventilated workspace with temperature control.',
    gradient: ['#FF4F9A', '#3D7BFF'],
    isDemo: true,
  },
  {
    slug: 'plastic-bottle-sculpture',
    title: 'Plastic Bottle Sculpture',
    sourceMaterial: 'Clear & coloured PET bottles',
    caption: 'Cut and heat-shaped botanical canopy or display installation.',
    gradient: ['#3D7BFF', '#B7E36B'],
    isDemo: true,
  },
  {
    slug: 'cardboard-sculpture',
    title: 'Cardboard Sculpture',
    sourceMaterial: 'Corrugated cartons',
    caption: 'Laser- or hand-slotted layered relief art and display stands.',
    gradient: ['#C8A26B', '#123D33'],
    isDemo: true,
  },
  {
    slug: 'ewaste-circuit-art',
    title: 'E-Waste Circuit Art',
    sourceMaterial: 'Obsolete PCBs & keys',
    caption: 'Display art only. Framed mosaic of stripped non-hazardous boards.',
    safetyNote: 'Display art only. Never heat, sand, or smelt PCBs; route batteries & capacitors to authorised recyclers.',
    gradient: ['#123D33', '#3D7BFF'],
    isDemo: true,
  },
  {
    slug: 'glass-bottle-lamp',
    title: 'Glass Bottle Lamp',
    sourceMaterial: 'Whole glass bottles',
    caption: 'Cleaned bottle paired with low-voltage LED pendant or cork light.',
    safetyNote: 'Smooth any cut edges and use certified electrical fittings.',
    gradient: ['#3D7BFF', '#FFD23F'],
    isDemo: true,
  },
  {
    slug: 'fabric-patchwork-bag',
    title: 'Fabric Patchwork Bag',
    sourceMaterial: 'Tailor offcuts & denim',
    caption: 'Colour-blocked tote and utility pouch stitched from garment scraps.',
    gradient: ['#FF4F9A', '#FFD23F'],
    isDemo: true,
  },
  {
    slug: 'marble-mosaic-coasters',
    title: 'Marble Mosaic Coasters',
    sourceMaterial: 'Tile & stone offcuts',
    caption: 'Tumbled offcut fragments grouted onto cork-backed coasters.',
    gradient: ['#C8A26B', '#F7F7F4'],
    isDemo: true,
  },
  {
    slug: 'wood-offcut-toys',
    title: 'Wood Offcut Toys',
    sourceMaterial: 'Untreated carpentry blocks',
    caption: 'Sanded stacking blocks finished with food-safe beeswax polish.',
    safetyNote: 'Use only untreated wood and non-toxic finishes; avoid choking-hazard sizes.',
    gradient: ['#C8A26B', '#B7E36B'],
    isDemo: true,
  },
  {
    slug: 'coconut-shell-bowl',
    title: 'Coconut Shell Bowl',
    sourceMaterial: 'Discarded coconut shells',
    caption: 'Sanded and oil-rubbed decorative trinket or dry-snack bowl.',
    gradient: ['#123D33', '#C8A26B'],
    isDemo: true,
  },
  {
    slug: 'newspaper-paper-beads',
    title: 'Newspaper Paper Beads',
    sourceMaterial: 'Old newsprint & magazines',
    caption: 'Rolled, sealed paper beads strung into lightweight craft jewellery.',
    gradient: ['#FFD23F', '#FF4F9A'],
    isDemo: true,
  },
  {
    slug: 'can-lantern',
    title: 'Tin Can Lantern',
    sourceMaterial: 'Clean food/beverage cans',
    caption: 'Punched geometric light shade for battery tea lights or garden hooks.',
    safetyNote: 'De-burr rims thoroughly before handling.',
    gradient: ['#1B2A26', '#FF4F9A'],
    isDemo: true,
  },
  {
    slug: 'jute-sack-planter',
    title: 'Jute Sack Planter',
    sourceMaterial: 'Coffee/grain burlap sacks',
    caption: 'Breathable stitched sleeve for indoor potted plants or storage bins.',
    gradient: ['#C8A26B', '#123D33'],
    isDemo: true,
  },
  {
    slug: 'candle-wax-recycled-candles',
    title: 'Recycled Wax Candles',
    sourceMaterial: 'Leftover candle stubs',
    caption: 'Filtered, re-wicked pillar or jar candles poured into reused glass.',
    gradient: ['#FFD23F', '#C8A26B'],
    isDemo: true,
  },
  {
    slug: 'used-wire-copper',
    title: 'Used Insulated Wire',
    sourceMaterial: 'Scrap electrical cable',
    caption: 'Never burn wire. Give to an authorised recycler.',
    safetyNote: 'Never burn wire. Give to an authorised recycler.',
    gradient: ['#FF4F9A', '#1B2A26'],
    isDemo: true,
  },
];

export const MARQUEE_ROW_ONE = [
  'PET BOTTLES',
  'OLD TYRES',
  'CARDBOARD',
  'FABRIC OFFCUTS',
  'EGG TRAYS',
  'WOOD OFFCUTS',
  'MARBLE SCRAPS',
  'GLASS BOTTLES',
];

export const MARQUEE_ROW_TWO = [
  'COCONUT SHELLS',
  'E-WASTE PCBS',
  'JUTE SACKS',
  'CANDLE WAX',
  'RICE HUSK',
  'TIN CANS',
  'NEWSPAPER',
  'USED WIRE (AUTHORISED ONLY)',
];

export const SELLER_STEPS = [
  {
    step: '01',
    title: 'Snap & upload material',
    detail: 'Add up to 4 photos, material name, quantity, and condition.',
  },
  {
    step: '02',
    title: 'Set your own price or offer',
    detail: 'You always set asking price and negotiable terms — never AI.',
  },
  {
    step: '03',
    title: 'Run AI possibility scan',
    detail: 'Get 5–8 practical product ideas, safety flags, and missing-info prompts.',
  },
  {
    step: '04',
    title: 'See real registered buyers',
    detail: 'Deterministic DB query matches buyers by category & city only.',
  },
  {
    step: '05',
    title: 'Accept enquiries directly',
    detail: 'Review buyer enquiries and unlock contact details when you accept.',
  },
];

export const BUYER_STEPS = [
  {
    step: '01',
    title: 'Filter local materials',
    detail: 'Search by category, city, quantity, condition, and negotiable terms.',
  },
  {
    step: '02',
    title: 'Inspect full batch details',
    detail: 'Check photos, supply frequency, condition notes, and seller terms.',
  },
  {
    step: '03',
    title: 'Generate "AI Ideas"',
    detail: 'Explore product concepts, tools needed, quick steps, and safety limits.',
  },
  {
    step: '04',
    title: 'Test unit economics',
    detail: 'Plug YOUR yield, labour, packaging, and price into the deterministic calculator.',
  },
  {
    step: '05',
    title: 'Enquire & verify in person',
    detail: 'Send an enquiry to the seller and inspect samples before committing.',
  },
];

export const AUDIENCE_BENTO = [
  {
    title: 'Individuals & Households',
    badge: 'RE-USE',
    summary:
      'Turn accumulating bottles, jars, cartons, and old textiles into listed batches instead of mixed landfill.',
    span: 'wide',
  },
  {
    title: 'Students & Makers',
    badge: 'PROTOTYPE',
    summary:
      'Source low-cost offcuts for studio models, campus craft fairs, and material experiments.',
    span: 'normal',
  },
  {
    title: 'Women Creators & Artisans',
    badge: 'CRAFT',
    summary:
      'Discover fabric scraps, jute sacks, paper, and natural shells paired with practical upcycling workflows.',
    span: 'normal',
  },
  {
    title: 'Small Businesses & Workshops',
    badge: 'LOCAL',
    summary:
      'Either offload predictable offcuts (wood, marble, textile) or buy consistent secondary stock locally.',
    span: 'normal',
  },
  {
    title: 'Industries & Recyclers',
    badge: 'VOLUME',
    summary:
      'List recurring production byproducts with transparent condition notes and route hazardous streams safely.',
    span: 'wide',
  },
];

export interface MaterialPreviewItem {
  slug: string;
  name: string;
  category: string;
  hazardLevel: 'Low' | 'Caution' | 'Authorised Recycler';
  sampleIdeas: string[];
  evidenceLabel: string;
}

export const MATERIAL_LIBRARY_PREVIEW: MaterialPreviewItem[] = [
  {
    slug: 'pet-plastic-bottles',
    name: 'PET Plastic Bottles',
    category: 'Plastics',
    hazardLevel: 'Low',
    sampleIdeas: ['Botanical sculpture', 'Filament strip cutter', 'Self-watering planter'],
    evidenceLabel: 'AI-suggested (verify before use)',
  },
  {
    slug: 'scrap-rubber-tyres',
    name: 'Old Rubber Tyres',
    category: 'Rubber',
    hazardLevel: 'Caution',
    sampleIdeas: ['Painted wall planter', 'Vertical garden tower', 'Authorised crumb recycling'],
    evidenceLabel: 'Context-dependent',
  },
  {
    slug: 'corrugated-cardboard',
    name: 'Corrugated Cardboard',
    category: 'Paper & Pulp',
    hazardLevel: 'Low',
    sampleIdeas: ['Layered relief sculpture', 'Display shelving', 'Moulded pulp trays'],
    evidenceLabel: 'AI-suggested (verify before use)',
  },
  {
    slug: 'garment-fabric-scraps',
    name: 'Fabric & Denim Offcuts',
    category: 'Textiles',
    hazardLevel: 'Low',
    sampleIdeas: ['Patchwork tote bag', 'Quilted laptop sleeve', 'Braided rug'],
    evidenceLabel: 'AI-suggested (verify before use)',
  },
  {
    slug: 'marble-tile-offcuts',
    name: 'Marble & Tile Offcuts',
    category: 'Stone & Ceramic',
    hazardLevel: 'Caution',
    sampleIdeas: ['Mosaic coasters', 'Terrazzo tabletop aggregate', 'Trivet tiles'],
    evidenceLabel: 'Context-dependent',
  },
  {
    slug: 'untreated-wood-offcuts',
    name: 'Wood Offcuts',
    category: 'Timber',
    hazardLevel: 'Low',
    sampleIdeas: ['Sanded toy blocks', 'Pegboard organiser', 'Planter crate'],
    evidenceLabel: 'AI-suggested (verify before use)',
  },
  {
    slug: 'coconut-shells-coir',
    name: 'Coconut Shells & Coir',
    category: 'Agri-Waste',
    hazardLevel: 'Low',
    sampleIdeas: ['Polished shell bowl', 'Coir plant liner', 'Hanging planter'],
    evidenceLabel: 'AI-suggested (verify before use)',
  },
  {
    slug: 'used-insulated-wire',
    name: 'Used Insulated Wire',
    category: 'E-Waste & Metals',
    hazardLevel: 'Authorised Recycler',
    sampleIdeas: ['Handover to authorised e-waste/copper recycler (never burn)'],
    evidenceLabel: 'Context-dependent',
  },
];

export const FAQ_ITEMS = [
  {
    q: 'Are the product ideas generated by AI guaranteed to sell or be safe?',
    a: 'No. Every AI output is labelled as a suggestion, not a guarantee. You must verify structural safety, chemical/food-contact suitability, quality standards, and local legal requirements before making or selling anything.',
  },
  {
    q: 'How does ByproductIQ match sellers with buyers?',
    a: 'Matches shown to a seller come strictly from a deterministic database query across real registered buyers (filtered by material category interests and city). AI never invents or fabricates buyer profiles.',
  },
  {
    q: 'Does AI set material prices or calculate profits?',
    a: 'Never. Sellers set their own asking prices and negotiable terms. Buyers use a transparent, deterministic server-side calculator where every yield, labour, cost, and selling price assumption is entered by the buyer.',
  },
  {
    q: 'What happens with hazardous waste like e-waste, batteries, or used wire?',
    a: 'For hazardous streams (e-waste, used wire insulation, batteries, used oil, chemicals, medical or asbestos-suspect items), ByproductIQ prioritises handover to authorised recyclers and blocks unsafe DIY processing steps like burning wire.',
  },
  {
    q: 'Why do sample items show a "Sample data" badge?',
    a: 'Honesty comes first. Any seeded demonstration listings, accounts, or example showcases are explicitly marked is_demo = true with a visible "Sample data" badge so nothing looks like fake traction.',
  },
  {
    q: 'When are seller contact details shared with buyers?',
    a: 'Seller phone numbers are hidden by default unless a seller explicitly enables sharing, or until the seller accepts a buyer enquiry. Only logged-in buyers can view unlocked contact details.',
  },
  {
    q: 'Can I use ByproductIQ without a Google Gemini API key during testing?',
    a: 'Yes. The server supports AI_MODE = live | fixture | off. In fixture mode, deterministic recorded demo outputs are served safely without calling external APIs.',
  },
  {
    q: 'What happens if the AI service is unavailable or returns invalid output?',
    a: 'Every Gemini response is strictly validated with Zod on the server. If validation fails after one retry, ByproductIQ falls back to the curated Material Library record or prompts you to try again.',
  },
];
