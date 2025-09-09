import { WaterFootprintCalculator } from '@/components/WaterFootprintCalculator';

const Calculator = () => {
  console.log('Calculator component rendering');
  return (
    <div className="w-full min-h-screen">
      <WaterFootprintCalculator />
    </div>
  );
};

export default Calculator;