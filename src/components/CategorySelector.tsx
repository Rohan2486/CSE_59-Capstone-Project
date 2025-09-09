import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Coffee, 
  Home, 
  Shirt, 
  Smartphone, 
  Car, 
  LucideIcon 
} from 'lucide-react';

export type Category = 'food' | 'household' | 'clothing' | 'electronics' | 'transportation';

interface CategoryInfo {
  id: Category;
  name: string;
  icon: LucideIcon;
}

const categories: CategoryInfo[] = [
  { id: 'food', name: 'Food & Beverages', icon: Coffee },
  { id: 'household', name: 'Household', icon: Home },
  { id: 'clothing', name: 'Clothing', icon: Shirt },
  { id: 'electronics', name: 'Electronics', icon: Smartphone },
  { id: 'transportation', name: 'Transportation', icon: Car }
];

interface CategorySelectorProps {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {categories.map((category) => {
        const IconComponent = category.icon;
        const isSelected = selectedCategory === category.id;
        
        return (
          <Button
            key={category.id}
            variant={isSelected ? "default" : "outline"}
            onClick={() => onSelectCategory(category.id)}
            className={`flex flex-col items-center p-4 h-auto gap-2 transition-smooth ${
              isSelected 
                ? 'bg-gradient-ocean text-white shadow-glow' 
                : 'hover:shadow-water hover:border-primary/50'
            }`}
          >
            <IconComponent className="w-6 h-6" />
            <span className="text-sm font-medium text-center whitespace-nowrap">{category.name}</span>
          </Button>
        );
      })}
    </div>
  );
};
