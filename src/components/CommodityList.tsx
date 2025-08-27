import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface Commodity {
  id: string;
  name: string;
  currentPrice: number;
  priceChange: number;
  priceChangePercent: number;
  minPrice: number;
  maxPrice: number;
  category: string;
}

const mockCommodities: Commodity[] = [
  {
    id: "1",
    name: "Crude Oil",
    currentPrice: 82.45,
    priceChange: 2.15,
    priceChangePercent: 2.68,
    minPrice: 78.30,
    maxPrice: 85.60,
    category: "Energy"
  },
  {
    id: "2", 
    name: "Gold",
    currentPrice: 1987.50,
    priceChange: -8.25,
    priceChangePercent: -0.41,
    minPrice: 1945.00,
    maxPrice: 2020.75,
    category: "Precious Metals"
  },
  {
    id: "3",
    name: "Wheat",
    currentPrice: 648.25,
    priceChange: 12.50,
    priceChangePercent: 1.97,
    minPrice: 620.00,
    maxPrice: 675.80,
    category: "Agriculture"
  },
  {
    id: "4",
    name: "Natural Gas",
    currentPrice: 3.82,
    priceChange: -0.15,
    priceChangePercent: -3.77,
    minPrice: 3.45,
    maxPrice: 4.20,
    category: "Energy"
  },
  {
    id: "5",
    name: "Copper",
    currentPrice: 4.12,
    priceChange: 0.08,
    priceChangePercent: 1.98,
    minPrice: 3.98,
    maxPrice: 4.35,
    category: "Industrial Metals"
  }
];

const CommodityList = () => {
  const handleBuy = (commodity: Commodity) => {
    // Handle buy logic
    console.log(`Buying ${commodity.name}`);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <span>Available Commodities</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockCommodities.map((commodity) => {
          const isPositive = commodity.priceChange >= 0;
          const TrendIcon = isPositive ? TrendingUp : commodity.priceChange < 0 ? TrendingDown : Minus;
          const changeColor = isPositive ? "text-profit" : commodity.priceChange < 0 ? "text-loss" : "text-neutral";
          
          return (
            <div 
              key={commodity.id}
              className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{commodity.name}</h3>
                  <Badge variant="outline" className="text-xs">
                    {commodity.category}
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-4 text-sm">
                  <span className="font-mono font-bold">
                    ${commodity.currentPrice.toFixed(2)}
                  </span>
                  
                  <div className={`flex items-center space-x-1 ${changeColor}`}>
                    <TrendIcon className="h-3 w-3" />
                    <span className="font-mono">
                      {isPositive ? '+' : ''}{commodity.priceChange.toFixed(2)}
                    </span>
                    <span className="font-mono">
                      ({isPositive ? '+' : ''}{commodity.priceChangePercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <span>Range: ${commodity.minPrice.toFixed(2)} - ${commodity.maxPrice.toFixed(2)}</span>
                </div>
              </div>
              
              <Button 
                onClick={() => handleBuy(commodity)}
                size="sm"
                variant="game"
                className="ml-4"
              >
                Buy
              </Button>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default CommodityList;