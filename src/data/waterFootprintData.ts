import { WaterFootprintItem, Category } from '../types';

export const categories: Category[] = [
  {
    id: 'food',
    name: 'Food & Beverages',
    icon: 'Apple',
    color: 'from-green-400 to-green-600',
    description: 'Agricultural products and processed foods'
  },
  {
    id: 'clothing',
    name: 'Clothing & Textiles',
    icon: 'Shirt',
    color: 'from-purple-400 to-purple-600',
    description: 'Apparel and textile products'
  },
  {
    id: 'electronics',
    name: 'Electronics',
    icon: 'Smartphone',
    color: 'from-blue-400 to-blue-600',
    description: 'Digital devices and electronics'
  },
  {
    id: 'household',
    name: 'Household Items',
    icon: 'Home',
    color: 'from-orange-400 to-orange-600',
    description: 'Daily household products'
  },
  {
    id: 'transportation',
    name: 'Transportation',
    icon: 'Car',
    color: 'from-red-400 to-red-600',
    description: 'Vehicle fuel and transport'
  },
  {
    id: 'personal',
    name: 'Personal Care',
    icon: 'User',
    color: 'from-pink-400 to-pink-600',
    description: 'Beauty and hygiene products'
  }
];

export const waterFootprintItems: WaterFootprintItem[] = [
  // Food & Beverages
  {
    id: 'beef_1kg',
    name: 'Beef',
    category: 'food',
    waterFootprint: 15415,
    unit: '1 kg',
    description: 'One of the most water-intensive foods',
    tips: ['Consider plant-based alternatives', 'Choose grass-fed options', 'Reduce portion sizes']
  },
  {
    id: 'rice_1kg',
    name: 'Rice',
    category: 'food',
    waterFootprint: 2497,
    unit: '1 kg',
    description: 'Staple grain crop',
    tips: ['Choose sustainable rice varieties', 'Avoid food waste']
  },
  {
    id: 'coffee_cup',
    name: 'Coffee',
    category: 'food',
    waterFootprint: 140,
    unit: '1 cup (125ml)',
    description: 'Popular morning beverage',
    tips: ['Choose sustainably sourced coffee', 'Use reusable cups']
  },
  {
    id: 'chocolate_bar',
    name: 'Chocolate Bar',
    category: 'food',
    waterFootprint: 1700,
    unit: '100g bar',
    description: 'Cocoa-based confectionery',
    tips: ['Choose fair-trade chocolate', 'Moderate consumption']
  },
  {
    id: 'apple_1kg',
    name: 'Apples',
    category: 'food',
    waterFootprint: 822,
    unit: '1 kg',
    description: 'Fresh fruit',
    tips: ['Buy local and seasonal', 'Avoid food waste']
  },
  
  // Clothing & Textiles
  {
    id: 'cotton_tshirt',
    name: 'Cotton T-Shirt',
    category: 'clothing',
    waterFootprint: 2495,
    unit: '1 shirt (250g)',
    description: 'Basic cotton garment',
    tips: ['Choose organic cotton', 'Buy quality items that last', 'Consider second-hand']
  },
  {
    id: 'jeans_pair',
    name: 'Pair of Jeans',
    category: 'clothing',
    waterFootprint: 7600,
    unit: '1 pair',
    description: 'Denim trousers',
    tips: ['Wash less frequently', 'Choose sustainable brands', 'Repair instead of replace']
  },
  {
    id: 'leather_shoes',
    name: 'Leather Shoes',
    category: 'clothing',
    waterFootprint: 8500,
    unit: '1 pair',
    description: 'Leather footwear',
    tips: ['Invest in quality shoes', 'Consider vegan alternatives', 'Repair when possible']
  },
  
  // Electronics
  {
    id: 'smartphone',
    name: 'Smartphone',
    category: 'electronics',
    waterFootprint: 12760,
    unit: '1 device',
    description: 'Mobile communication device',
    tips: ['Use for longer periods', 'Recycle responsibly', 'Buy refurbished']
  },
  {
    id: 'laptop',
    name: 'Laptop Computer',
    category: 'electronics',
    waterFootprint: 25600,
    unit: '1 device',
    description: 'Portable computer',
    tips: ['Extend device lifespan', 'Choose energy-efficient models', 'Recycle properly']
  },
  
  // Household Items
  {
    id: 'toilet_paper_roll',
    name: 'Toilet Paper',
    category: 'household',
    waterFootprint: 168,
    unit: '1 roll',
    description: 'Hygiene paper product',
    tips: ['Choose recycled options', 'Use mindfully', 'Consider bidets']
  },
  {
    id: 'paper_sheet',
    name: 'A4 Paper',
    category: 'household',
    waterFootprint: 10,
    unit: '1 sheet',
    description: 'Office/printing paper',
    tips: ['Print double-sided', 'Go digital when possible', 'Use recycled paper']
  },
  
  // Transportation
  {
    id: 'gasoline_liter',
    name: 'Gasoline',
    category: 'transportation',
    waterFootprint: 2.6,
    unit: '1 liter',
    description: 'Vehicle fuel',
    tips: ['Use public transport', 'Consider electric vehicles', 'Combine trips']
  },
  
  // Personal Care
  {
    id: 'shampoo_bottle',
    name: 'Shampoo',
    category: 'personal',
    waterFootprint: 1820,
    unit: '1 bottle (250ml)',
    description: 'Hair care product',
    tips: ['Choose concentrated formulas', 'Use appropriate amounts', 'Consider solid shampoos']
  },
  {
    id: 'soap_bar',
    name: 'Bar Soap',
    category: 'personal',
    waterFootprint: 170,
    unit: '1 bar (100g)',
    description: 'Body cleansing product',
    tips: ['Choose natural ingredients', 'Use completely before replacing']
  }
];