import React from 'react';
import { Droplets, Globe, Leaf, TrendingDown, BookOpen, Target } from 'lucide-react';

export const LearnSection: React.FC = () => {
  const facts = [
    {
      icon: Globe,
      title: "Global Water Crisis",
      content: "Agriculture accounts for 70% of global freshwater consumption, making food choices crucial for water conservation."
    },
    {
      icon: Droplets,
      title: "Hidden Water",
      content: "Virtual water is the hidden water footprint in products. A single cotton t-shirt requires 2,495 liters of water to produce."
    },
    {
      icon: Leaf,
      title: "Environmental Impact",
      content: "Water footprints help us understand the environmental impact of our consumption choices on global water resources."
    },
    {
      icon: TrendingDown,
      title: "Reduction Strategies",
      content: "Small changes in daily habits can significantly reduce your water footprint and help preserve this precious resource."
    }
  ];

  const tips = [
    {
      category: "Food Choices",
      suggestions: [
        "Choose plant-based meals more often",
        "Reduce meat consumption, especially beef",
        "Buy local and seasonal produce",
        "Minimize food waste"
      ]
    },
    {
      category: "Clothing",
      suggestions: [
        "Buy fewer, higher-quality items",
        "Choose natural or recycled materials",
        "Shop second-hand when possible",
        "Repair and maintain clothing"
      ]
    },
    {
      category: "Technology",
      suggestions: [
        "Use devices for longer periods",
        "Buy refurbished electronics",
        "Recycle old devices properly",
        "Choose energy-efficient models"
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Learn About Water Footprints</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Understanding water footprints helps us make more sustainable choices and protect our planet's most precious resource.
        </p>
      </div>

      {/* Key Facts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {facts.map((fact, index) => {
          const IconComponent = fact.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
                  <IconComponent className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">{fact.title}</h3>
                  <p className="text-gray-600">{fact.content}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Water Footprint Categories */}
      <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Types of Water Footprints</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3">
              <Droplets className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2">Blue Water</h3>
            <p className="text-blue-100 text-sm">Surface and groundwater consumed during production</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2">Green Water</h3>
            <p className="text-blue-100 text-sm">Rainwater stored in soil used by plants</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2">Grey Water</h3>
            <p className="text-blue-100 text-sm">Water needed to dilute pollution from production</p>
          </div>
        </div>
      </div>

      {/* Conservation Tips */}
      <div>
        <div className="flex items-center space-x-3 mb-6">
          <Target className="w-6 h-6 text-green-600" />
          <h2 className="text-2xl font-bold text-gray-900">How to Reduce Your Water Footprint</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tips.map((tip, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">{tip.category}</h3>
              <ul className="space-y-3">
                {tip.suggestions.map((suggestion, suggestionIndex) => (
                  <li key={suggestionIndex} className="flex items-start space-x-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Start Making a Difference Today</h2>
        <p className="text-green-100 mb-6 max-w-2xl mx-auto">
          Every drop counts. Use our calculator to understand your water footprint and make informed choices for a more sustainable future.
        </p>
        <div className="inline-flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg transition-all duration-200 cursor-pointer">
          <Target className="w-5 h-5" />
          <span className="font-semibold">Track Your Impact</span>
        </div>
      </div>
    </div>
  );
};