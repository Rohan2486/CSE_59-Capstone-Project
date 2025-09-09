import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Droplets } from 'lucide-react';
import { WaterFootprint } from '@/data/waterFootprintData';

type Category = 'food' | 'household' | 'clothing' | 'electronics' | 'transportation';

interface ItemSelectorProps {
  items?: WaterFootprint[];
  categoryId?: string;
  onAddItem: (item: WaterFootprint, quantity?: number) => void;
}

const formatWaterUsage = (liters: number): string => {
  if (liters >= 1000) {
    return `${(liters / 1000).toFixed(1)}k L`;
  }
  return `${Math.round(liters)} L`;
};

export const ItemSelector: React.FC<ItemSelectorProps> = ({
  items = [],
  categoryId,
  onAddItem
}) => {
  const filteredItems = categoryId 
    ? items.filter(item => item.category.id === categoryId)
    : items;

  if (filteredItems.length === 0) {
    return (
      <Card className="p-6 text-center">
        <Droplets className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-20" />
        <p className="text-muted-foreground">
          No items found in this category.
          <br />
          Try searching for something else.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Search Results</h3>
      <div className="grid gap-4">
        {filteredItems.map((item) => (
          <div 
            key={item.id} 
            className="flex items-center justify-between p-3 rounded-lg border bg-card hover:shadow-sm transition-all"
          >
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium">{item.name}</h4>
                <span className="text-sm font-medium text-primary">
                  {formatWaterUsage(item.waterTypes.blue + item.waterTypes.green + item.waterTypes.grey)}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">per {item.unit}</span>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-600">
                    Blue: {formatWaterUsage(item.waterTypes.blue)}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-green-50 text-green-600">
                    Green: {formatWaterUsage(item.waterTypes.green)}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-gray-50 text-gray-600">
                    Grey: {formatWaterUsage(item.waterTypes.grey)}
                  </span>
                </div>
              </div>
            </div>
            <Button
              size="sm"
              className="ml-4"
              onClick={() => onAddItem(item)}
            >
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};
