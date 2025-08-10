import React from 'react';
import { Plus, Droplets, Info } from 'lucide-react';
import { WaterFootprintItem } from '../types';

interface ItemCardProps {
  item: WaterFootprintItem;
  onAddToCalculator: (item: WaterFootprintItem) => void;
  onShowDetails: (item: WaterFootprintItem) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item, onAddToCalculator, onShowDetails }) => {
  const formatWaterAmount = (liters: number) => {
    if (liters >= 1000) {
      return `${(liters / 1000).toFixed(1)}k L`;
    }
    return `${liters.toLocaleString()} L`;
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
          <p className="text-sm text-gray-500">{item.unit}</p>
        </div>
        <button
          onClick={() => onShowDetails(item)}
          className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all duration-200"
        >
          <Info className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex items-center space-x-2 mb-4">
        <Droplets className="w-5 h-5 text-blue-500" />
        <span className="text-2xl font-bold text-blue-600">
          {formatWaterAmount(item.waterFootprint)}
        </span>
      </div>
      
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{item.description}</p>
      
      <button
        onClick={() => onAddToCalculator(item)}
        className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-2.5 px-4 rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-all duration-200 transform hover:scale-105"
      >
        <Plus className="w-4 h-4" />
        <span className="font-medium">Add to Calculator</span>
      </button>
    </div>
  );
};