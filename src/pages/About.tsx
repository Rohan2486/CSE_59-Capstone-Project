import { Card } from '@/components/ui/card';
import { Droplets, Target, Users, Earth } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-ocean rounded-full shadow-water">
              <Droplets className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-primary">About Water Footprint</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Understanding the true water cost of our consumption choices and building a more sustainable future together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* What is Water Footprint */}
          <Card className="p-8 shadow-water">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-water-blue/10 rounded-lg">
                <Droplets className="w-6 h-6 text-water-blue" />
              </div>
              <h2 className="text-2xl font-bold text-primary">What is a Water Footprint?</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                A water footprint measures the total amount of freshwater used to produce the goods and services we consume. 
                It includes three components:
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-water-blue rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-semibold text-water-blue">Blue Water:</span> Surface and groundwater used in production
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-water-green rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-semibold text-water-green">Green Water:</span> Rainwater stored in soil and used by plants
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-water-grey rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-semibold text-water-grey">Grey Water:</span> Water needed to dilute pollution from production
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Why It Matters */}
          <Card className="p-8 shadow-water">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Earth className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-primary">Why It Matters</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                With growing global population and climate change, freshwater scarcity affects over 2 billion people worldwide.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Agriculture accounts for 70% of global freshwater use
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Many products require far more water than visible
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Consumer choices can drive water-efficient production
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Understanding helps prioritize conservation efforts
                </li>
              </ul>
            </div>
          </Card>
        </div>

        {/* Mission and Goals */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8 shadow-water">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-secondary/50 rounded-lg">
                <Target className="w-6 h-6 text-secondary-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-primary">Our Mission</h2>
            </div>
            <p className="text-muted-foreground">
              To empower individuals and organizations with knowledge about water consumption, 
              enabling informed decisions that contribute to global water conservation and sustainability. 
              We believe that awareness is the first step toward meaningful change.
            </p>
          </Card>

          <Card className="p-8 shadow-water">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-accent/50 rounded-lg">
                <Users className="w-6 h-6 text-accent-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-primary">Join the Movement</h2>
            </div>
            <p className="text-muted-foreground">
              Every calculation you make contributes to a growing understanding of water consumption patterns. 
              Share your insights, learn from others, and be part of a community committed to preserving 
              our planet's most vital resource for future generations.
            </p>
          </Card>
        </div>

        {/* Data Sources */}
        <Card className="p-8 shadow-water mt-12">
          <h2 className="text-2xl font-bold text-primary mb-6">Data Sources & Methodology</h2>
          <div className="prose max-w-none text-muted-foreground">
            <p className="mb-4">
              Our water footprint calculations are based on peer-reviewed research and data from leading institutions:
            </p>
            <ul className="space-y-2">
              <li>• Water Footprint Network (WFN) global database</li>
              <li>• UNESCO-IHE Institute for Water Education research</li>
              <li>• FAO (Food and Agriculture Organization) water statistics</li>
              <li>• Life Cycle Assessment (LCA) studies from academic institutions</li>
            </ul>
            <p className="mt-4">
              We continuously update our database to reflect the latest research and regional variations in water use efficiency.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default About;