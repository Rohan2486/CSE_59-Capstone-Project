import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { CategoryCard } from './components/CategoryCard';
import { ItemCard } from './components/ItemCard';
import { Calculator } from './components/Calculator';
import { ItemModal } from './components/ItemModal';
import { SearchBar } from './components/SearchBar';
import { LearnSection } from './components/LearnSection';
import { categories, waterFootprintItems } from './data/waterFootprintData';
import { WaterFootprintItem, CalculatorItem } from './types';
import { ArrowLeft } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('calculator');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [calculatorItems, setCalculatorItems] = useState<CalculatorItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<WaterFootprintItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = useMemo(() => {
    let items = waterFootprintItems;
    
    if (selectedCategory) {
      items = items.filter(item => item.category === selectedCategory);
    }
    
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase().trim();
      items = items.filter(item =>
        item.name.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search)
      );
    }
    
    return items;
  }, [selectedCategory, searchTerm]);

  const handleAddToCalculator = (item: WaterFootprintItem) => {
    const existingItem = calculatorItems.find(ci => ci.item.id === item.id);
    
    if (existingItem) {
      setCalculatorItems(items =>
        items.map(ci =>
          ci.item.id === item.id
            ? { ...ci, quantity: ci.quantity + 1, totalWater: (ci.quantity + 1) * item.waterFootprint }
            : ci
        )
      );
    } else {
      const newCalculatorItem: CalculatorItem = {
        item,
        quantity: 1,
        totalWater: item.waterFootprint
      };
      setCalculatorItems(items => [...items, newCalculatorItem]);
    }
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) return;
    
    setCalculatorItems(items =>
      items.map(ci =>
        ci.item.id === itemId
          ? { ...ci, quantity, totalWater: quantity * ci.item.waterFootprint }
          : ci
      )
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCalculatorItems(items => items.filter(ci => ci.item.id !== itemId));
  };

  const handleClearAll = () => {
    setCalculatorItems([]);
  };

  const handleShowDetails = (item: WaterFootprintItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const renderCalculatorContent = () => {
    if (selectedCategory) {
      const category = categories.find(c => c.id === selectedCategory);
      
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSelectedCategory(null)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Categories</span>
            </button>
            
            <div className="text-sm text-gray-500">
              {filteredItems.length} items in {category?.name}
            </div>
          </div>
          
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder={`Search ${category?.name.toLowerCase()}...`}
          />
          
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No items found matching your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onAddToCalculator={handleAddToCalculator}
                  onShowDetails={handleShowDetails}
                />
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="space-y-8">
        {/* Search */}
        <div className="max-w-md">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search all items..."
          />
        </div>

        {searchTerm.trim() ? (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Search Results ({filteredItems.length})
            </h2>
            {filteredItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No items found matching "{searchTerm}".</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    onAddToCalculator={handleAddToCalculator}
                    onShowDetails={handleShowDetails}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Categories */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Browse by Category</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    itemCount={waterFootprintItems.filter(item => item.category === category.id).length}
                    onClick={() => setSelectedCategory(category.id)}
                  />
                ))}
              </div>
            </div>

            {/* Calculator */}
            {calculatorItems.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Water Footprint</h2>
                <Calculator
                  items={calculatorItems}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                  onClearAll={handleClearAll}
                />
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'calculator' ? renderCalculatorContent() : <LearnSection />}
      </main>

      <ItemModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCalculator={handleAddToCalculator}
      />
    </div>
  );
}

export default App;