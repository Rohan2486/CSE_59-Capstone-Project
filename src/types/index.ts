export interface WaterFootprintItem {
  id: string;
  name: string;
  category: string;
  waterFootprint: number; // liters
  unit: string;
  description: string;
  tips?: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

export interface CalculatorItem {
  item: WaterFootprintItem;
  quantity: number;
  totalWater: number;
}