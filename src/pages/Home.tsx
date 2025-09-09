import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Droplets, Calculator, BookOpen, TrendingDown, Globe, Leaf } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-4 bg-gradient-ocean rounded-full shadow-glow">
              <Droplets className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-primary">AquaFootprint</h1>
          </div>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Discover the hidden water consumption behind everyday items and make informed choices for a sustainable future. 
            Every product has a water story - let's explore yours.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-ocean hover:opacity-90">
              <Link to="/calculator">
                <Calculator className="w-5 h-5 mr-2" />
                Start Calculating
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/learn">
                <BookOpen className="w-5 h-5 mr-2" />
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Why Water Footprint Matters</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Understanding water consumption helps us make better choices for our planet's most precious resource.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6 text-center shadow-water hover:shadow-glow transition-all">
            <div className="w-12 h-12 bg-water-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingDown className="w-6 h-6 text-water-blue" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Reduce Consumption</h3>
            <p className="text-muted-foreground">
              Identify high water-use items and find sustainable alternatives to reduce your impact.
            </p>
          </Card>

          <Card className="p-6 text-center shadow-water hover:shadow-glow transition-all">
            <div className="w-12 h-12 bg-water-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-6 h-6 text-water-green" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Global Impact</h3>
            <p className="text-muted-foreground">
              Connect your daily choices to global water scarcity and conservation efforts worldwide.
            </p>
          </Card>

          <Card className="p-6 text-center shadow-water hover:shadow-glow transition-all">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Sustainable Living</h3>
            <p className="text-muted-foreground">
              Make informed decisions that contribute to a more sustainable and water-conscious lifestyle.
            </p>
          </Card>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="bg-gradient-wave py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary mb-8">Water Footprint Facts</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-water-blue">2,700L</div>
              <div className="text-muted-foreground">Water to make 1 cotton T-shirt</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-water-green">140L</div>
              <div className="text-muted-foreground">Water for 1 cup of coffee</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">15,400L</div>
              <div className="text-muted-foreground">Water for 1kg beef</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-water-grey">3,000L</div>
              <div className="text-muted-foreground">Daily water footprint per person</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;