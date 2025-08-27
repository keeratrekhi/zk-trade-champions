import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TrendingUp, TrendingDown, Target, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PortfolioItem {
  id: string;
  name: string;
  type: 'COM' | 'CRY' | 'STOCK' | 'FUND';
  currentPrice: number;
  quantity: number;
  avgPrice: number;
  pnl: number;
  pnlPercent: number;
  risk: 'LOW' | 'MED' | 'HIGH';
}

const mockPortfolio: PortfolioItem[] = [
  { id: '1', name: 'Crude Oil', type: 'COM', currentPrice: 82.45, quantity: 100, avgPrice: 79.20, pnl: 325, pnlPercent: 4.10, risk: 'MED' },
  { id: '2', name: 'Bitcoin', type: 'CRY', currentPrice: 43250.00, quantity: 0.5, avgPrice: 41000.00, pnl: 1125, pnlPercent: 5.49, risk: 'HIGH' },
  { id: '3', name: 'AAPL', type: 'STOCK', currentPrice: 175.25, quantity: 20, avgPrice: 168.50, pnl: 135, pnlPercent: 4.01, risk: 'LOW' },
  { id: '4', name: 'Tech Fund', type: 'FUND', currentPrice: 125.80, quantity: 50, avgPrice: 122.00, pnl: 190, pnlPercent: 3.11, risk: 'LOW' }
];

const Portfolio = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'ALL' | 'COM' | 'CRY' | 'STOCK' | 'FUND'>('ALL');
  
  const filteredPortfolio = filter === 'ALL' ? mockPortfolio : mockPortfolio.filter(item => item.type === filter);
  const totalValue = mockPortfolio.reduce((sum, item) => sum + (item.currentPrice * item.quantity), 0);
  const totalPnL = mockPortfolio.reduce((sum, item) => sum + item.pnl, 0);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'LOW': return 'text-profit';
      case 'MED': return 'text-warning';
      case 'HIGH': return 'text-loss';
      default: return 'text-muted-foreground';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'COM': return '🛢️';
      case 'CRY': return '₿';
      case 'STOCK': return '📈';
      case 'FUND': return '💼';
      default: return '💰';
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button onClick={() => navigate('/')} variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Game
          </Button>
          <div className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-primary" />
            <h1 className="text-2xl font-bold">Portfolio Manager</h1>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Value</p>
                  <p className="text-3xl font-bold text-primary">${totalValue.toLocaleString()}</p>
                </div>
                <Zap className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-profit/20 to-profit/5 border-profit/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total P&L</p>
                  <p className="text-3xl font-bold text-profit">+${totalPnL.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-profit" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/20 to-accent/5 border-accent/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Positions</p>
                  <p className="text-3xl font-bold text-accent">{mockPortfolio.length}</p>
                </div>
                <Target className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Asset Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2 mb-6">
              {['ALL', 'COM', 'CRY', 'STOCK', 'FUND'].map((type) => (
                <Button
                  key={type}
                  onClick={() => setFilter(type as any)}
                  variant={filter === type ? "game" : "outline"}
                  size="sm"
                >
                  {type}
                </Button>
              ))}
            </div>

            {/* Portfolio Table */}
            <div className="space-y-4">
              {filteredPortfolio.map((item) => {
                const isProfit = item.pnl >= 0;
                return (
                  <div key={item.id} className="p-4 border border-border/50 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all">
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{getTypeIcon(item.type)}</span>
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <Badge variant="outline" className="text-xs">{item.type}</Badge>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground">Quantity</p>
                        <p className="font-semibold">{item.quantity}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground">Avg Price</p>
                        <p className="font-mono">${item.avgPrice.toFixed(2)}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground">Current Price</p>
                        <p className="font-mono">${item.currentPrice.toFixed(2)}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground">P&L</p>
                        <div className={`font-semibold ${isProfit ? 'text-profit' : 'text-loss'}`}>
                          {isProfit ? '+' : ''}${item.pnl.toFixed(0)}
                          <span className="text-xs ml-1">({isProfit ? '+' : ''}{item.pnlPercent.toFixed(2)}%)</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className={getRiskColor(item.risk)}>
                          {item.risk} RISK
                        </Badge>
                        <Button size="sm" variant="game">Trade</Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Portfolio;