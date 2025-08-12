# Documentation

## Data Types

### WaterFootprintItem
```typescript
interface WaterFootprintItem {
  id: string;              // Unique identifier
  name: string;            // Display name
  category: string;        // Category ID
  waterFootprint: number;  // Water consumption in liters
  unit: string;           // Measurement unit
  description: string;     // Item description
  tips?: string[];        // Conservation tips (optional)
}
```

### Category
```typescript
interface Category {
  id: string;          // Unique identifier
  name: string;        // Display name
  icon: string;        // Lucide icon name
  color: string;       // Tailwind gradient classes
  description: string; // Category description
}
```

### CalculatorItem
```typescript
interface CalculatorItem {
  item: WaterFootprintItem; // The water footprint item
  quantity: number;         // User-selected quantity
  totalWater: number;       // Calculated total water usage
}
```

## Component APIs

### Calculator Component
```typescript
interface CalculatorProps {
  items: CalculatorItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearAll: () => void;
}
```

### ItemCard Component
```typescript
interface ItemCardProps {
  item: WaterFootprintItem;
  onAddToCalculator: (item: WaterFootprintItem) => void;
  onShowDetails: (item: WaterFootprintItem) => void;
}
```

### CategoryCard Component
```typescript
interface CategoryCardProps {
  category: Category;
  itemCount: number;
  onClick: () => void;
}
```

### SearchBar Component
```typescript
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}
```

## Utility Functions

### formatWaterAmount
Formats water amounts for display:
```typescript
const formatWaterAmount = (liters: number): string => {
  if (liters >= 1000000) {
    return `${(liters / 1000000).toFixed(1)}M L`;
  }
  if (liters >= 1000) {
    return `${(liters / 1000).toFixed(1)}k L`;
  }
  return `${liters.toLocaleString()} L`;
}
```

### getWaterComparison
Provides relatable water usage comparisons:
```typescript
const getWaterComparison = (liters: number): string => {
  const bathTubs = Math.round(liters / 150);
  const showers = Math.round(liters / 65);
  const bottles = Math.round(liters / 0.5);
  
  if (bathTubs > 0) return `≈ ${bathTubs.toLocaleString()} bathtubs`;
  if (showers > 0) return `≈ ${showers.toLocaleString()} showers`;
  return `≈ ${bottles.toLocaleString()} water bottles`;
}
```

## State Management

The application uses React's built-in state management with hooks:

- `useState` for component-level state
- `useMemo` for computed values and filtering
- Props drilling for data flow between components

## Data Flow

1. **Data Loading**: Static data loaded from `waterFootprintData.ts`
2. **Category Selection**: User selects category, filters items
3. **Item Selection**: User adds items to calculator
4. **Calculation**: Real-time calculation of total water footprint
5. **Display**: Results shown with comparisons and tips
