import React, { useState } from 'react';
import { Trash2, Calculator as CalculatorIcon, TrendingUp } from 'lucide-react';
import { CalculatorItem, WaterFootprintItem } from '../types';

interface CalculatorProps {
  items: CalculatorItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearAll: () => void;
}

export const Calculator: React.FC<CalculatorProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearAll
}) => {
  const totalWater = items.reduce((sum, item) => sum + item.totalWater, 0);
  
  const formatWaterAmount = (liters: number) => {
    if (liters >= 1000000) {
      return `${(liters / 1000000).toFixed(1)}M L`;
    }
    if (liters >= 1000) {
      return `${(liters / 1000).toFixed(1)}k L`;
    }
    return `${liters.toLocaleString()} L`;
  };

  const getWaterComparison = (liters: number) => {
    const bathTubs = Math.round(liters / 150); // Average bathtub = 150L
    const showers = Math.round(liters / 65); // Average shower = 65L
    const bottles = Math.round(liters / 0.5); // 500ml bottle
    
    if (bathTubs > 0) return `≈ ${bathTubs.toLocaleString()} bathtubs`;
    if (showers > 0) return `≈ ${showers.toLocaleString()} showers`;
    return `≈ ${bottles.toLocaleString()} water bottles`;
  };

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
        <CalculatorIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No items added yet</h3>
        <p className="text-gray-600">Browse categories and add items to calculate your water footprint</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Water Footprint Summary</h2>
          <button
            onClick={onClearAll}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-200 text-sm font-medium"
          >
            Clear All
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-blue-100 text-sm mb-1">Total Water</p>
            <p className="text-2xl font-bold">{formatWaterAmount(totalWater)}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-blue-100 text-sm mb-1">Items Tracked</p>
            <p className="text-2xl font-bold">{items.length}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-blue-100 text-sm mb-1">Equivalent to</p>
            <p className="text-lg font-semibold">{getWaterComparison(totalWater)}</p>
          </div>
        </div>
      </div>

      {/* Items List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <span>Tracked Items</span>
          </h3>
        </div>
        
        <div className="divide-y divide-gray-100">
          {items.map((calculatorItem) => (
            <div key={calculatorItem.item.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{calculatorItem.item.name}</h4>
                  <p className="text-sm text-gray-500 mb-2">{calculatorItem.item.unit} • {formatWaterAmount(calculatorItem.item.waterFootprint)} each</p>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <label className="text-sm text-gray-600">Quantity:</label>
                      <input
                        type="number"
                        min="1"
                        value={calculatorItem.quantity}
                        onChange={(e) => onUpdateQuantity(calculatorItem.item.id, parseInt(e.target.value) || 1)}
                        className="w-20 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      Total: <span className="font-semibold text-blue-600">{formatWaterAmount(calculatorItem.totalWater)}</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => onRemoveItem(calculatorItem.item.id)}
                  className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};