import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Trash2, Bath, Waves, X, Droplets, TrendingUp } from 'lucide-react';
import { 
  Progress 
} from '@/components/ui/progress';

interface CalculatorItem {
  id: string;
  name: string;
  unit: string;
  quantity: number;
  category: string;
  virtual_water_l_per_unit: number;
  direct_water_l_per_unit: number;
}

interface WaterFootprint {
  virtual: number;
  direct: number;
  total: number;
}

interface ResultsDisplayProps {
  items: CalculatorItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
  onClear: () => void;
  waterFootprint: WaterFootprint;
}

const formatWater = (liters: number): string => {
  if (liters >= 1000) {
    return `${(liters / 1000).toFixed(1)}k L`;
  }
  return `${Math.round(liters)} L`;
};

const getComparisonText = (total: number): string => {
  const showers = Math.round(total / 40); // 40L per 5-min shower
  const days = Math.round(total / 150); // 150L per person per day
  
  if (total < 100) {
    return `That's less than a typical shower (40L)`;
  } else if (total < 1000) {
    return `Equivalent to about ${showers} five-minute showers`;
  } else {
    return `Equivalent to ${days} days of personal water use`;
  }
};

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  items,
  onUpdateQuantity,
  onRemove,
  onClear,
  waterFootprint
}) => {
  const { virtual, direct, total } = waterFootprint;
  const comparison = getComparisonText(total);

  return (
    <div className="space-y-6">
      {/* Current Calculation */}
      <Card className="p-6 shadow-water">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Your Water Footprint</h2>
          {items.length > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onClear}
              className="text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Droplets className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p>Add items to calculate their water footprint</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{item.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemove(item.id)}
                        className="h-6 w-6 p-0 hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value) || 0)}
                        className="w-20 h-8"
                      />
                      <span className="text-sm text-muted-foreground">{item.unit}</span>
                      <span className="text-sm text-muted-foreground ml-auto">
                        {formatWater((item.virtual_water_l_per_unit + item.direct_water_l_per_unit) * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            {/* Total Water Usage */}
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <Waves className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                  <div className="text-sm font-medium text-blue-700">{formatWater(virtual)}</div>
                  <div className="text-xs text-blue-600">Virtual Water</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <Bath className="w-5 h-5 text-green-500 mx-auto mb-1" />
                  <div className="text-sm font-medium text-green-700">{formatWater(direct)}</div>
                  <div className="text-xs text-green-600">Direct Water</div>
                </div>
                <div className="text-center p-3 bg-primary/10 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-primary mx-auto mb-1" />
                  <div className="text-sm font-medium text-primary">{formatWater(total)}</div>
                  <div className="text-xs text-primary/80">Total Impact</div>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-3 text-sm text-center">
                {comparison}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Daily Target (150L)</span>
                  <span className="font-medium">{Math.round((total / 150) * 100)}%</span>
                </div>
                <Progress value={(total / 150) * 100} className="h-2" />
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};
