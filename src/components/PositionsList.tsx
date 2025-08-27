import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, TrendingUp, TrendingDown } from "lucide-react";

interface Position {
  id: string;
  commodityName: string;
  quantity: number;
  avgPurchasePrice: number;
  currentPrice: number;
  totalValue: number;
  unrealizedPnL: number;
  unrealizedPnLPercent: number;
}

const mockPositions: Position[] = [
  {
    id: "1",
    commodityName: "Crude Oil",
    quantity: 100,
    avgPurchasePrice: 79.20,
    currentPrice: 82.45,
    totalValue: 8245,
    unrealizedPnL: 325,
    unrealizedPnLPercent: 4.10
  },
  {
    id: "2",
    commodityName: "Gold",
    quantity: 5,
    avgPurchasePrice: 2010.25,
    currentPrice: 1987.50,
    totalValue: 9937.50,
    unrealizedPnL: -113.75,
    unrealizedPnLPercent: -1.13
  },
  {
    id: "3",
    commodityName: "Wheat",
    quantity: 50,
    avgPurchasePrice: 635.80,
    currentPrice: 648.25,
    totalValue: 32412.50,
    unrealizedPnL: 622.50,
    unrealizedPnLPercent: 1.96
  }
];

const PositionsList = () => {
  const handleSell = (position: Position, quantity?: number) => {
    // Handle sell logic
    console.log(`Selling ${quantity || 'all'} of ${position.commodityName}`);
  };

  const totalValue = mockPositions.reduce((sum, pos) => sum + pos.totalValue, 0);
  const totalPnL = mockPositions.reduce((sum, pos) => sum + pos.unrealizedPnL, 0);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Briefcase className="h-5 w-5 text-primary" />
            <span>Your Positions</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Total: ${totalValue.toLocaleString()}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockPositions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No positions yet. Start trading to build your portfolio!</p>
          </div>
        ) : (
          <>
            {/* Summary */}
            <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
              <div className="flex items-center justify-between text-sm">
                <span>Total P&L:</span>
                <div className={`flex items-center space-x-1 font-semibold ${
                  totalPnL >= 0 ? 'text-profit' : 'text-loss'
                }`}>
                  {totalPnL >= 0 ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  <span>${Math.abs(totalPnL).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Positions */}
            {mockPositions.map((position) => {
              const isProfit = position.unrealizedPnL >= 0;
              const pnlColor = isProfit ? "text-profit" : "text-loss";
              
              return (
                <div 
                  key={position.id}
                  className="p-4 rounded-lg border border-border/50 bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{position.commodityName}</h3>
                      <Badge variant="outline" className="text-xs">
                        {position.quantity} units
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Avg Price:</span>
                        <div className="font-mono font-semibold">
                          ${position.avgPurchasePrice.toFixed(2)}
                        </div>
                      </div>
                      
                      <div>
                        <span className="text-muted-foreground">Current:</span>
                        <div className="font-mono font-semibold">
                          ${position.currentPrice.toFixed(2)}
                        </div>
                      </div>
                      
                      <div>
                        <span className="text-muted-foreground">Value:</span>
                        <div className="font-mono font-semibold">
                          ${position.totalValue.toLocaleString()}
                        </div>
                      </div>
                      
                      <div>
                        <span className="text-muted-foreground">P&L:</span>
                        <div className={`font-mono font-semibold ${pnlColor}`}>
                          {isProfit ? '+' : ''}${position.unrealizedPnL.toFixed(0)}
                          <span className="text-xs ml-1">
                            ({isProfit ? '+' : ''}{position.unrealizedPnLPercent.toFixed(2)}%)
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        onClick={() => handleSell(position, Math.floor(position.quantity / 2))}
                        size="sm"
                        variant="outline"
                        className="flex-1"
                      >
                        Sell 50%
                      </Button>
                      <Button 
                        onClick={() => handleSell(position)}
                        size="sm"
                        variant="danger"
                        className="flex-1"
                      >
                        Sell All
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default PositionsList;