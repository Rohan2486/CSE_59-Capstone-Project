import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Droplets, Calculator } from 'lucide-react';
import { CategorySelector } from './CategorySelector';
import { ItemSelector } from './ItemSelector';
import { ResultsDisplay } from './ResultsDisplay';
import { FloatingWaterWiseChat } from './FloatingWaterWiseChat';
import { WaterFootprint, searchItems, waterFootprintData } from '@/data/waterFootprintData';
// Using the Category type from waterFootprintData
import type { Category } from './CategorySelector';

interface CalculatorItem extends WaterFootprint {
  quantity: number;
}

export const WaterFootprintCalculator = () => {
  console.log('WaterFootprintCalculator component rendering');
  const [selectedCategory, setSelectedCategory] = useState<Category>('food');
  const [calculatorItems, setCalculatorItems] = useState<CalculatorItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<WaterFootprint[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setIsSearching(true);
      setSearchResults(searchItems(query));
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  };

  const addItem = (item: WaterFootprint, quantity: number = 1) => {
    const existingIndex = calculatorItems.findIndex(ci => ci.id === item.id);
    
    if (existingIndex >= 0) {
      const updated = [...calculatorItems];
      updated[existingIndex].quantity += quantity;
      setCalculatorItems(updated);
    } else {
      setCalculatorItems([...calculatorItems, { ...item, quantity }]);
    }
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      setCalculatorItems(calculatorItems.filter(item => item.id !== itemId));
    } else {
      setCalculatorItems(calculatorItems.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      ));
    }
  };

  const removeItem = (itemId: string) => {
    setCalculatorItems(calculatorItems.filter(item => item.id !== itemId));
  };

  const clearAll = () => {
    setCalculatorItems([]);
  };

  const totalWaterFootprint = calculatorItems.reduce((total, item) => {
    return {
      blue: total.blue + (item.waterTypes.blue * item.quantity),
      green: total.green + (item.waterTypes.green * item.quantity),
      grey: total.grey + (item.waterTypes.grey * item.quantity),
      total: total.total + (item.total * item.quantity),
    };
  }, { blue: 0, green: 0, grey: 0, total: 0 });

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-ocean rounded-full shadow-water">
              <Droplets className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-primary">Water Footprint Calculator</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the hidden water consumption behind everyday items and make informed choices for a sustainable future.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Item Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search */}
            <Card className="p-6 shadow-water">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search for items (e.g., coffee, t-shirt, smartphone)..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              {isSearching && (
                <div className="mt-4">
                  <h3 className="font-semibold mb-3">Search Results</h3>
                  <ItemSelector 
                    items={searchResults}
                    onAddItem={addItem}
                  />
                </div>
              )}
            </Card>

            {/* Category Selection */}
            {!isSearching && (
              <Card className="p-6 shadow-water">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-primary" />
                  Browse by Category
                </h2>
                <CategorySelector 
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />
                <div className="mt-6">
                  <ItemSelector 
                    items={waterFootprintData.filter(item => item.category.id === selectedCategory)}
                    onAddItem={addItem}
                  />
                </div>
              </Card>
            )}
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            <ResultsDisplay 
              items={calculatorItems.map(item => ({
                ...item,
                category: item.category.id,
                virtual_water_l_per_unit: item.waterTypes.blue + item.waterTypes.green,
                direct_water_l_per_unit: item.waterTypes.grey
              }))}
              waterFootprint={{
                virtual: totalWaterFootprint.blue + totalWaterFootprint.green,
                direct: totalWaterFootprint.grey,
                total: totalWaterFootprint.total
              }}
              onUpdateQuantity={updateQuantity}
              onRemove={removeItem}
              onClear={clearAll}
            />
          </div>
        </div>
      </div>
      <FloatingWaterWiseChat 
        waterFootprint={{
          virtual: totalWaterFootprint.blue + totalWaterFootprint.green,
          direct: totalWaterFootprint.grey,
          total: totalWaterFootprint.total
        }}
        items={calculatorItems.map(item => ({
          name: item.name,
          quantity: item.quantity,
          unit: item.unit,
          category: item.category.id
        }))}
      />
    </div>
  );
};