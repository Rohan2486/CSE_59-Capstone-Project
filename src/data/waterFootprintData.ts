export interface WaterFootprint {
  id: string;
  name: string;
  category: Category;
  unit: string;
  waterTypes: {
    blue: number;    // Surface and groundwater
    green: number;   // Rainwater
    grey: number;    // Polluted water
  };
  total: number;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export const categories: Category[] = [
  { id: 'food', name: 'Food & Beverages', icon: 'Apple', color: 'water-green' },
  { id: 'clothing', name: 'Clothing & Textiles', icon: 'Shirt', color: 'water-blue' },
  { id: 'technology', name: 'Technology', icon: 'Smartphone', color: 'water-grey' },
  { id: 'household', name: 'Household Items', icon: 'Home', color: 'primary' }
];

export const waterFootprintData: WaterFootprint[] = [
  // Food & Beverages
  {
    id: 'beef-1kg',
    name: 'Beef',
    category: categories[0],
    unit: '1 kg',
    waterTypes: { blue: 550, green: 14414, grey: 451 },
    total: 15415,
    description: 'Beef has one of the highest water footprints among proteins'
  },
  {
    id: 'chicken-1kg',
    name: 'Chicken',
    category: categories[0],
    unit: '1 kg',
    waterTypes: { blue: 222, green: 3545, grey: 518 },
    total: 4285,
    description: 'A more water-efficient protein source compared to beef'
  },
  {
    id: 'pork-1kg',
    name: 'Pork',
    category: categories[0],
    unit: '1 kg',
    waterTypes: { blue: 459, green: 4907, grey: 632 },
    total: 5988,
    description: 'Moderate water footprint compared to other meats'
  },
  {
    id: 'lamb-1kg',
    name: 'Lamb',
    category: categories[0],
    unit: '1 kg',
    waterTypes: { blue: 522, green: 9813, grey: 579 },
    total: 10914,
    description: 'High water footprint due to grazing and feed production'
  },
  {
    id: 'fish-farmed-1kg',
    name: 'Farmed Fish',
    category: categories[0],
    unit: '1 kg',
    waterTypes: { blue: 2860, green: 1020, grey: 467 },
    total: 4347,
    description: 'Aquaculture requires significant water for operations'
  },
  {
    id: 'eggs-dozen',
    name: 'Eggs',
    category: categories[0],
    unit: '1 dozen',
    waterTypes: { blue: 196, green: 960, grey: 198 },
    total: 1354,
    description: 'Moderate water usage for feed and farming operations'
  },
  {
    id: 'rice-1kg',
    name: 'Rice',
    category: categories[0],
    unit: '1 kg',
    waterTypes: { blue: 1555, green: 1232, grey: 92 },
    total: 2879,
    description: 'Requires significant irrigation, mainly blue water'
  },
  {
    id: 'wheat-1kg',
    name: 'Wheat',
    category: categories[0],
    unit: '1 kg',
    waterTypes: { blue: 199, green: 1150, grey: 32 },
    total: 1381,
    description: 'More efficient grain crop with lower water needs'
  },
  {
    id: 'potatoes-1kg',
    name: 'Potatoes',
    category: categories[0],
    unit: '1 kg',
    waterTypes: { blue: 59, green: 192, grey: 21 },
    total: 272,
    description: 'Relatively low water footprint for staple crop'
  },
  {
    id: 'tomatoes-1kg',
    name: 'Tomatoes',
    category: categories[0],
    unit: '1 kg',
    waterTypes: { blue: 63, green: 108, grey: 43 },
    total: 214,
    description: 'Water-efficient vegetable when grown in season'
  },
  {
    id: 'lettuce-1kg',
    name: 'Lettuce',
    category: categories[0],
    unit: '1 kg',
    waterTypes: { blue: 28, green: 133, grey: 76 },
    total: 237,
    description: 'Relatively low water footprint for leafy greens'
  },
  {
    id: 'apples-1kg',
    name: 'Apples',
    category: categories[0],
    unit: '1 kg',
    waterTypes: { blue: 127, green: 697, grey: 127 },
    total: 951,
    description: 'Moderate water usage for tree fruit production'
  },
  {
    id: 'bananas-1kg',
    name: 'Bananas',
    category: categories[0],
    unit: '1 kg',
    waterTypes: { blue: 97, green: 660, grey: 33 },
    total: 790,
    description: 'Efficient water use for tropical fruit'
  },
  {
    id: 'oranges-1kg',
    name: 'Oranges',
    category: categories[0],
    unit: '1 kg',
    waterTypes: { blue: 110, green: 457, grey: 49 },
    total: 616,
    description: 'Moderate water requirements for citrus production'
  },
  {
    id: 'coffee-1cup',
    name: 'Coffee',
    category: categories[0],
    unit: '1 cup (125ml)',
    waterTypes: { blue: 4.2, green: 132, grey: 4.5 },
    total: 140.7,
    description: 'Your daily cup requires significant water for bean production'
  },
  {
    id: 'tea-1cup',
    name: 'Tea',
    category: categories[0],
    unit: '1 cup (250ml)',
    waterTypes: { blue: 1.8, green: 27, grey: 1.2 },
    total: 30,
    description: 'Lower water footprint compared to coffee'
  },
  {
    id: 'milk-1glass',
    name: 'Milk',
    category: categories[0],
    unit: '1 glass (200ml)',
    waterTypes: { blue: 20, green: 180, grey: 55 },
    total: 255,
    description: 'Dairy production requires water for feed and processing'
  },
  {
    id: 'beer-1glass',
    name: 'Beer',
    category: categories[0],
    unit: '1 glass (250ml)',
    waterTypes: { blue: 18, green: 61, grey: 17 },
    total: 96,
    description: 'Water used in growing barley and brewing process'
  },
  {
    id: 'wine-1glass',
    name: 'Wine',
    category: categories[0],
    unit: '1 glass (125ml)',
    waterTypes: { blue: 28, green: 56, grey: 25 },
    total: 109,
    description: 'Grape cultivation and wine production water use'
  },
  {
    id: 'chocolate-100g',
    name: 'Chocolate',
    category: categories[0],
    unit: '100 g',
    waterTypes: { blue: 54, green: 1400, grey: 87 },
    total: 1541,
    description: 'High water usage in cocoa farming and processing'
  },
  {
    id: 'nuts-100g',
    name: 'Mixed Nuts',
    category: categories[0],
    unit: '100 g',
    waterTypes: { blue: 402, green: 3363, grey: 135 },
    total: 3900,
    description: 'Tree nuts require significant water for growth'
  },
  
  // Clothing & Textiles
  {
    id: 'cotton-tshirt',
    name: 'Cotton T-shirt',
    category: categories[1],
    unit: '1 piece (250g)',
    waterTypes: { blue: 101, green: 2495, grey: 0 },
    total: 2596,
    description: 'Cotton requires significant irrigation for growth'
  },
  {
    id: 'jeans',
    name: 'Jeans',
    category: categories[1],
    unit: '1 pair (600g)',
    waterTypes: { blue: 1800, green: 4400, grey: 1500 },
    total: 7700,
    description: 'Denim production involves water-intensive processes'
  },
  {
    id: 'leather-shoes',
    name: 'Leather Shoes',
    category: categories[1],
    unit: '1 pair',
    waterTypes: { blue: 2257, green: 13856, grey: 1136 },
    total: 17249,
    description: 'Leather tanning requires substantial water processing'
  },
  {
    id: 'cotton-dress',
    name: 'Cotton Dress',
    category: categories[1],
    unit: '1 piece (400g)',
    waterTypes: { blue: 162, green: 3992, grey: 0 },
    total: 4154,
    description: 'Cotton fabric with additional processing'
  },
  {
    id: 'wool-sweater',
    name: 'Wool Sweater',
    category: categories[1],
    unit: '1 piece (500g)',
    waterTypes: { blue: 1975, green: 4525, grey: 1250 },
    total: 7750,
    description: 'Wool production and processing water usage'
  },
  {
    id: 'polyester-jacket',
    name: 'Polyester Jacket',
    category: categories[1],
    unit: '1 piece (400g)',
    waterTypes: { blue: 880, green: 0, grey: 760 },
    total: 1640,
    description: 'Synthetic fabric production water requirements'
  },
  {
    id: 'silk-scarf',
    name: 'Silk Scarf',
    category: categories[1],
    unit: '1 piece (100g)',
    waterTypes: { blue: 1250, green: 0, grey: 875 },
    total: 2125,
    description: 'Silk production and processing'
  },
  {
    id: 'linen-shirt',
    name: 'Linen Shirt',
    category: categories[1],
    unit: '1 piece (300g)',
    waterTypes: { blue: 426, green: 1824, grey: 450 },
    total: 2700,
    description: 'Flax cultivation and processing'
  },
  {
    id: 'canvas-shoes',
    name: 'Canvas Shoes',
    category: categories[1],
    unit: '1 pair',
    waterTypes: { blue: 650, green: 1950, grey: 400 },
    total: 3000,
    description: 'Cotton canvas and rubber production'
  },
  {
    id: 'leather-bag',
    name: 'Leather Bag',
    category: categories[1],
    unit: '1 piece',
    waterTypes: { blue: 3200, green: 19600, grey: 1600 },
    total: 24400,
    description: 'Leather processing and manufacturing'
  },
  {
    id: 'cotton-socks',
    name: 'Cotton Socks',
    category: categories[1],
    unit: '1 pair',
    waterTypes: { blue: 25, green: 624, grey: 0 },
    total: 649,
    description: 'Cotton processing for small items'
  },

  // Technology
  {
    id: 'smartphone',
    name: 'Smartphone',
    category: categories[2],
    unit: '1 device',
    waterTypes: { blue: 910, green: 0, grey: 0 },
    total: 910,
    description: 'Manufacturing semiconductors requires ultra-pure water'
  },
  {
    id: 'laptop',
    name: 'Laptop',
    category: categories[2],
    unit: '1 device',
    waterTypes: { blue: 2720, green: 0, grey: 0 },
    total: 2720,
    description: 'Computer manufacturing is water-intensive'
  },
  {
    id: 'desktop-pc',
    name: 'Desktop PC',
    category: categories[2],
    unit: '1 unit',
    waterTypes: { blue: 3600, green: 0, grey: 0 },
    total: 3600,
    description: 'Component manufacturing and assembly'
  },
  {
    id: 'lcd-monitor',
    name: 'LCD Monitor',
    category: categories[2],
    unit: '1 unit',
    waterTypes: { blue: 1200, green: 0, grey: 0 },
    total: 1200,
    description: 'Screen manufacturing process'
  },
  {
    id: 'tablet',
    name: 'Tablet',
    category: categories[2],
    unit: '1 device',
    waterTypes: { blue: 1100, green: 0, grey: 0 },
    total: 1100,
    description: 'Similar to smartphone but larger components'
  },
  {
    id: 'smart-watch',
    name: 'Smart Watch',
    category: categories[2],
    unit: '1 device',
    waterTypes: { blue: 450, green: 0, grey: 0 },
    total: 450,
    description: 'Miniaturized electronics production'
  },
  {
    id: 'gaming-console',
    name: 'Gaming Console',
    category: categories[2],
    unit: '1 unit',
    waterTypes: { blue: 1680, green: 0, grey: 0 },
    total: 1680,
    description: 'Gaming hardware manufacturing'
  },
  {
    id: 'wireless-earbuds',
    name: 'Wireless Earbuds',
    category: categories[2],
    unit: '1 pair',
    waterTypes: { blue: 250, green: 0, grey: 0 },
    total: 250,
    description: 'Small electronics manufacturing'
  },
  {
    id: 'printer',
    name: 'Printer',
    category: categories[2],
    unit: '1 unit',
    waterTypes: { blue: 1450, green: 0, grey: 0 },
    total: 1450,
    description: 'Electronics and mechanical parts production'
  },
  {
    id: 'external-hard-drive',
    name: 'External Hard Drive',
    category: categories[2],
    unit: '1 unit',
    waterTypes: { blue: 850, green: 0, grey: 0 },
    total: 850,
    description: 'Storage device manufacturing'
  },
  
  // Household Items
  {
    id: 'paper-a4',
    name: 'Paper (A4)',
    category: categories[3],
    unit: '1 A4 sheet',
    waterTypes: { blue: 2, green: 7, grey: 1 },
    total: 10,
    description: 'Paper production requires water for pulping and processing'
  },
  {
    id: 'plastic-bottle',
    name: 'Plastic Bottle',
    category: categories[3],
    unit: '1 bottle (0.5L)',
    waterTypes: { blue: 22, green: 0, grey: 0 },
    total: 22,
    description: 'Plastic manufacturing requires process water'
  },
  {
    id: 'glass-bottle',
    name: 'Glass Bottle',
    category: categories[3],
    unit: '1 bottle (1L)',
    waterTypes: { blue: 35, green: 0, grey: 15 },
    total: 50,
    description: 'Glass manufacturing process water usage'
  },
  {
    id: 'ceramic-mug',
    name: 'Ceramic Mug',
    category: categories[3],
    unit: '1 piece',
    waterTypes: { blue: 72, green: 0, grey: 28 },
    total: 100,
    description: 'Clay processing and firing water usage'
  },
  {
    id: 'wooden-chair',
    name: 'Wooden Chair',
    category: categories[3],
    unit: '1 piece',
    waterTypes: { blue: 685, green: 2315, grey: 500 },
    total: 3500,
    description: 'Timber processing and manufacturing'
  },
  {
    id: 'metal-pot',
    name: 'Metal Pot',
    category: categories[3],
    unit: '1 piece',
    waterTypes: { blue: 450, green: 0, grey: 250 },
    total: 700,
    description: 'Metal extraction and processing'
  },
  {
    id: 'cotton-towel',
    name: 'Cotton Towel',
    category: categories[3],
    unit: '1 piece',
    waterTypes: { blue: 81, green: 1996, grey: 0 },
    total: 2077,
    description: 'Cotton processing for home textiles'
  },
  {
    id: 'plastic-storage-box',
    name: 'Plastic Storage Box',
    category: categories[3],
    unit: '1 piece (medium)',
    waterTypes: { blue: 180, green: 0, grey: 45 },
    total: 225,
    description: 'Plastic molding and manufacturing'
  },
  {
    id: 'light-bulb-led',
    name: 'LED Light Bulb',
    category: categories[3],
    unit: '1 piece',
    waterTypes: { blue: 45, green: 0, grey: 15 },
    total: 60,
    description: 'Electronics and assembly water usage'
  },
  {
    id: 'soap-bar',
    name: 'Soap Bar',
    category: categories[3],
    unit: '1 piece (100g)',
    waterTypes: { blue: 15, green: 0, grey: 25 },
    total: 40,
    description: 'Chemical processing and manufacturing'
  }
];

export const getItemsByCategory = (categoryId: string): WaterFootprint[] => {
  return waterFootprintData.filter(item => item.category.id === categoryId);
};

export const searchItems = (query: string): WaterFootprint[] => {
  const lowercaseQuery = query.toLowerCase();
  return waterFootprintData.filter(item => 
    item.name.toLowerCase().includes(lowercaseQuery) ||
    item.description?.toLowerCase().includes(lowercaseQuery)
  );
};

export const getWaterFootprintComparison = (liters: number) => {
  return {
    bathtubs: Math.round(liters / 150), // Average bathtub capacity
    showers: Math.round(liters / 65),   // Average 8-minute shower
    bottles: Math.round(liters * 2),    // 0.5L bottles
    swimmingPools: (liters / 75000).toFixed(3), // Average pool size
  };
};