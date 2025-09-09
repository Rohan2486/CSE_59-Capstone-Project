import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, X } from 'lucide-react';
import { WaterWiseAiChat } from './WaterWiseAiChat';

interface FloatingWaterWiseChatProps {
  waterFootprint: {
    virtual: number;
    direct: number;
    total: number;
  };
  items: Array<{
    name: string;
    quantity: number;
    unit: string;
    category: string;
  }>;
}

export const FloatingWaterWiseChat: React.FC<FloatingWaterWiseChatProps> = ({
  waterFootprint,
  items
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen ? (
        <div className="fixed bottom-4 right-4 w-[400px] z-50">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
            <WaterWiseAiChat waterFootprint={waterFootprint} items={items} />
          </div>
        </div>
      ) : (
        <Button
          className="fixed bottom-4 right-4 shadow-water bg-gradient-ocean hover:shadow-glow transition-smooth"
          onClick={() => setIsOpen(true)}
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          Ask WaterWise AI
        </Button>
      )}
    </>
  );
};
