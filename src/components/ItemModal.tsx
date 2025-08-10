import React from 'react';
import { X, Droplets, Lightbulb } from 'lucide-react';
import { WaterFootprintItem } from '../types';

interface ItemModalProps {
  item: WaterFootprintItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCalculator: (item: WaterFootprintItem) => void;
}

export const ItemModal: React.FC<ItemModalProps> = ({ item, isOpen, onClose, onAddToCalculator }) => {
  if (!isOpen || !item) return null;

  const formatWaterAmount = (liters: number) => {
    if (liters >= 1000) {
      return `${(liters / 1000).toFixed(1)}k L`;
    }
    return `${liters.toLocaleString()} L`;
  };

  const getWaterComparison = (liters: number) => {
    const bathTubs = Math.round(liters / 150);
    const showers = Math.round(liters / 65);
    const bottles = Math.round(liters / 0.5);
    
    const comparisons = [];
    if (bathTubs > 0) comparisons.push(`${bathTubs.toLocaleString()} bathtubs`);
    if (showers > 0) comparisons.push(`${showers.toLocaleString()} showers`);
    if (bottles > 0) comparisons.push(`${bottles.toLocaleString()} water bottles`);
    
    return comparisons.slice(0, 2);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl max-w-md w-full shadow-2xl transform transition-all duration-300">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">{item.name}</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Water Footprint */}
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
            <Droplets className="w-12 h-12 text-blue-500 mx-auto mb-3" />
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {formatWaterAmount(item.waterFootprint)}
            </div>
            <p className="text-gray-600">per {item.unit}</p>
          </div>
          
          {/* Description */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">About this item</h3>
            <p className="text-gray-600">{item.description}</p>
          </div>
          
          {/* Water Comparison */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Water Equivalent</h3>
            <div className="space-y-2">
              {getWaterComparison(item.waterFootprint).map((comparison, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  <span>Equivalent to {comparison}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Conservation Tips */}
          {item.tips && item.tips.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                <Lightbulb className="w-4 h-4 text-yellow-500" />
                <span>Conservation Tips</span>
              </h3>
              <ul className="space-y-2">
                {item.tips.map((tip, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="p-6 border-t border-gray-200 flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
          >
            Close
          </button>
          <button
            onClick={() => {
              onAddToCalculator(item);
              onClose();
            }}
            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-all duration-200 font-medium"
          >
            Add to Calculator
          </button>
        </div>
      </div>
    </div>
  );
};