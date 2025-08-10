import React from 'react';
import { ChevronRight } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
  itemCount: number;
  onClick: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, itemCount, onClick }) => {
  const IconComponent = Icons[category.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
  
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-blue-200"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-gradient-to-br ${category.color}`}>
          <IconComponent className="w-6 h-6 text-white" />
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
      </div>
      
      <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
      <p className="text-sm text-gray-600 mb-3">{category.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">{itemCount} items</span>
        <div className="h-1 w-16 bg-gray-200 rounded-full overflow-hidden">
          <div className={`h-full bg-gradient-to-r ${category.color} w-3/4 transition-all duration-300`} />
        </div>
      </div>
    </div>
  );
};