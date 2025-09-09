import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Droplets, 
  Utensils, 
  Shirt, 
  Smartphone, 
  Car,
  Lightbulb,
  TrendingUp,
  Globe
} from 'lucide-react';

const Learn = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-ocean rounded-full shadow-water">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-primary">Learn About Water Footprints</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Dive deep into the world of water consumption and discover how your choices impact our planet's water resources.
          </p>
        </div>

        <Tabs defaultValue="basics" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="basics">Basics</TabsTrigger>
            <TabsTrigger value="categories">By Category</TabsTrigger>
            <TabsTrigger value="tips">Conservation Tips</TabsTrigger>
            <TabsTrigger value="global">Global Impact</TabsTrigger>
          </TabsList>

          <TabsContent value="basics">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="p-8 shadow-water">
                <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                  <Droplets className="w-6 h-6" />
                  Understanding the Basics
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Water footprint accounting helps us understand the hidden water use in our daily lives. 
                    While we might think we only use water when we drink, shower, or cook, nearly everything 
                    we consume has required water to produce.
                  </p>
                  <div className="bg-gradient-wave p-4 rounded-lg">
                    <h3 className="font-semibold text-primary mb-2">Quick Example:</h3>
                    <p>A single hamburger requires approximately 2,400 liters of water to produce - 
                    from growing feed for cattle to processing the meat.</p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 shadow-water">
                <h2 className="text-2xl font-bold text-primary mb-6">Virtual Water</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Virtual water is the hidden flow of water when goods are traded from one place to another. 
                    When you buy a cotton t-shirt made in India, you're importing the water used to grow 
                    the cotton and manufacture the shirt.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="text-center p-4 bg-water-blue/10 rounded-lg">
                      <div className="text-2xl font-bold text-water-blue">1,800L</div>
                      <div className="text-sm">1 slice of bread</div>
                    </div>
                    <div className="text-center p-4 bg-water-green/10 rounded-lg">
                      <div className="text-2xl font-bold text-water-green">25L</div>
                      <div className="text-sm">1 tomato</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="categories">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6 shadow-water">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Utensils className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary">Food & Beverages</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Beef (1kg)</span>
                    <Badge variant="destructive">15,400L</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Rice (1kg)</span>
                    <Badge variant="secondary">2,500L</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Coffee (1 cup)</span>
                    <Badge variant="outline">140L</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Apple (1 piece)</span>
                    <Badge variant="outline">70L</Badge>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-water">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Shirt className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary">Clothing</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Cotton T-shirt</span>
                    <Badge variant="destructive">2,700L</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Jeans</span>
                    <Badge variant="destructive">8,000L</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Leather shoes</span>
                    <Badge variant="secondary">8,200L</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Wool sweater</span>
                    <Badge variant="secondary">5,100L</Badge>
                  </div>
                </div>
              </Card>

              <Card className="p-6 shadow-water">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Smartphone className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary">Electronics</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Smartphone</span>
                    <Badge variant="secondary">910L</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Laptop</span>
                    <Badge variant="destructive">25,600L</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Tablet</span>
                    <Badge variant="secondary">1,280L</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>TV (32")</span>
                    <Badge variant="secondary">2,400L</Badge>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tips">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="p-8 shadow-water">
                <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                  <Lightbulb className="w-6 h-6" />
                  Daily Conservation Tips
                </h2>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="font-semibold text-primary">Food Choices</h3>
                    <p className="text-muted-foreground">Reduce meat consumption, especially beef. Choose seasonal and local produce when possible.</p>
                  </div>
                  <div className="border-l-4 border-water-green pl-4">
                    <h3 className="font-semibold text-primary">Clothing</h3>
                    <p className="text-muted-foreground">Buy less, choose quality over quantity, and consider second-hand options.</p>
                  </div>
                  <div className="border-l-4 border-water-blue pl-4">
                    <h3 className="font-semibold text-primary">Electronics</h3>
                    <p className="text-muted-foreground">Extend device lifespans, repair instead of replacing, and recycle responsibly.</p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 shadow-water">
                <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6" />
                  Making an Impact
                </h2>
                <div className="space-y-6">
                  <div className="text-center p-4 bg-gradient-wave rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-2">30%</div>
                    <p className="text-muted-foreground">Potential reduction in personal water footprint through conscious choices</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <span className="text-muted-foreground">One less beef meal per week saves 15,400L monthly</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <span className="text-muted-foreground">Wearing clothes 2x longer cuts textile water use in half</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <span className="text-muted-foreground">Using devices 1 year longer reduces replacement impact</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="global">
            <div className="space-y-8">
              <Card className="p-8 shadow-water">
                <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                  <Globe className="w-6 h-6" />
                  Global Water Crisis
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-destructive/10 rounded-lg">
                    <div className="text-3xl font-bold text-destructive mb-2">2B+</div>
                    <p className="text-muted-foreground">People lack access to safe drinking water at home</p>
                  </div>
                  <div className="text-center p-4 bg-orange-500/10 rounded-lg">
                    <div className="text-3xl font-bold text-orange-500 mb-2">3.6B</div>
                    <p className="text-muted-foreground">People live in areas with water scarcity at least one month per year</p>
                  </div>
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-2">70%</div>
                    <p className="text-muted-foreground">Of global freshwater is used for agriculture</p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 shadow-water">
                <h2 className="text-2xl font-bold text-primary mb-6">Regional Variations</h2>
                <p className="text-muted-foreground mb-6">
                  Water footprints vary significantly by region due to climate, technology, and production methods:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-primary">High Water Stress Regions:</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Middle East & North Africa</li>
                      <li>• South Asia</li>
                      <li>• Parts of sub-Saharan Africa</li>
                      <li>• Western United States</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold text-primary">Water-Rich Regions:</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Northern Europe</li>
                      <li>• Canada</li>
                      <li>• Parts of South America</li>
                      <li>• Southeast Asia (monsoon regions)</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Learn;