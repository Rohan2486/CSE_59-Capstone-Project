import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Droplets, Plus, Minus, Save, Trash2, Search } from 'lucide-react';

interface Item {
  id: string;
  name: string;
  category: string;
  default_unit: string;
}

interface Footprint {
  item_id: string;
  direct_water_l_per_unit: number;
  virtual_water_l_per_unit: number;
  unit: string;
}

interface CalculatorItem extends Item {
  quantity: number;
  footprint: Footprint;
  total_water: number;
}

export const WaterFootprintCalculatorSupabase = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [items, setItems] = useState<Item[]>([]);
  const [footprints, setFootprints] = useState<Footprint[]>([]);
  const [calculatorItems, setCalculatorItems] = useState<CalculatorItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // Load items and footprints from Supabase
  useEffect(() => {
    loadItems();
    loadFootprints();
  }, []);

  const loadItems = async () => {
    try {
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .order('name');
      
      if (error) throw error;
      setItems(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading items",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const loadFootprints = async () => {
    try {
      const { data, error } = await supabase
        .from('footprints')
        .select('*');
      
      if (error) throw error;
      setFootprints(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading footprints",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const categories = [...new Set(items.map(item => item.category))];
  
  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addItem = (item: Item) => {
    const footprint = footprints.find(f => f.item_id === item.id);
    if (!footprint) {
      toast({
        title: "No footprint data",
        description: "Water footprint data not available for this item",
        variant: "destructive",
      });
      return;
    }

    const existingItem = calculatorItems.find(ci => ci.id === item.id);
    if (existingItem) {
      updateQuantity(item.id, existingItem.quantity + 1);
    } else {
      const total_water = (footprint.direct_water_l_per_unit || 0) + (footprint.virtual_water_l_per_unit || 0);
      const newCalculatorItem: CalculatorItem = {
        ...item,
        quantity: 1,
        footprint,
        total_water
      };
      setCalculatorItems([...calculatorItems, newCalculatorItem]);
    }
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    
    setCalculatorItems(calculatorItems.map(item => 
      item.id === itemId ? { ...item, quantity } : item
    ));
  };

  const removeItem = (itemId: string) => {
    setCalculatorItems(calculatorItems.filter(item => item.id !== itemId));
  };

  const clearAll = () => {
    setCalculatorItems([]);
  };

  const saveCalculation = async () => {
    if (!user || calculatorItems.length === 0) return;
    
    setLoading(true);
    try {
      const totalWaterFootprint = calculatorItems.reduce(
        (sum, item) => sum + (item.total_water * item.quantity), 0
      );

      const { error } = await supabase
        .from('user_logs')
        .insert({
          user_id: user.id,
          action: 'calculation_saved',
          payload: {
            items: calculatorItems.map(item => ({
              id: item.id,
              name: item.name,
              quantity: item.quantity,
              unit: item.footprint.unit,
              water_per_unit: item.total_water,
              total_water: item.total_water * item.quantity
            })),
            total_water_footprint: totalWaterFootprint
          }
        });

      if (error) throw error;

      toast({
        title: "Calculation saved!",
        description: "Your water footprint calculation has been saved.",
      });
    } catch (error: any) {
      toast({
        title: "Error saving calculation",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const totalFootprint = calculatorItems.reduce(
    (sum, item) => sum + (item.total_water * item.quantity), 0
  );

  return (
    <div className="container mx-auto p-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Droplets className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Water Footprint Calculator</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Calculate the water footprint of your daily consumption using real data from our database.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Item Selection */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add Items</CardTitle>
              <CardDescription>Search and select items to calculate your water footprint</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {filteredItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-2 border rounded-lg">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {item.category} • {item.default_unit}
                      </div>
                    </div>
                    <Button size="sm" onClick={() => addItem(item)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Your Water Footprint</CardTitle>
                <CardDescription>
                  Total: {totalFootprint.toLocaleString()} liters
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={saveCalculation}
                  disabled={loading || calculatorItems.length === 0}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {calculatorItems.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  Add items to see your water footprint calculation
                </p>
              ) : (
                <div className="space-y-3">
                  {calculatorItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {(item.total_water * item.quantity).toLocaleString()} L total
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Badge variant="secondary">
                          {item.quantity}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {totalFootprint > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Water Footprint Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {Math.round(totalFootprint / 150)}
                    </div>
                    <div className="text-muted-foreground">Bathtubs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {Math.round(totalFootprint / 65)}
                    </div>
                    <div className="text-muted-foreground">8-min Showers</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};