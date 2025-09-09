import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, Send, Droplets } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface WaterWiseAiChatProps {
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

export const WaterWiseAiChat: React.FC<WaterWiseAiChatProps> = ({ waterFootprint, items }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your WaterWise AI assistant. I can help you understand your water footprint and provide personalized recommendations for water conservation. How can I help you today?'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateWaterUsageContext = () => {
    const itemsList = items.map(item => `${item.quantity} ${item.unit} of ${item.name}`).join(', ');
    return `Current water footprint: ${waterFootprint.total.toFixed(1)} liters total (${waterFootprint.virtual.toFixed(1)} virtual, ${waterFootprint.direct.toFixed(1)} direct). Items: ${itemsList}`;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      role: 'user',
      content: inputMessage
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const waterUsageContext = generateWaterUsageContext();
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, newMessage],
          context: waterUsageContext
        }),
      });

      const data = await response.json();
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.message
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again later.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="flex flex-col h-[500px] shadow-water">
      <div className="p-4 border-b bg-gradient-ocean text-white">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          <h2 className="font-semibold">WaterWise AI Assistant</h2>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-primary text-white ml-4'
                    : 'bg-muted mr-4'
                }`}
              >
                {message.role === 'assistant' && (
                  <Droplets className="w-4 h-4 mb-1 text-primary" />
                )}
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-muted mr-4">
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 animate-bounce text-primary" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            placeholder="Ask about your water footprint..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            disabled={isLoading || !inputMessage.trim()}
            size="icon"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
