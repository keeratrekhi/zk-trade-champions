import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, DollarSign, TrendingUp, Shield, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Fund {
  id: string;
  name: string;
  type: 'ETF' | 'MUTUAL' | 'HEDGE' | 'INDEX';
  currentNav: number;
  minInvestment: number;
  performance1Y: number;
  performance3Y: number;
  riskLevel: 'LOW' | 'MED' | 'HIGH';
  expenseRatio: number;
  aum: number;
  sector: string;
  description: string;
}

const mockFunds: Fund[] = [
  {
    id: '1',
    name: 'Tech Innovation Fund',
    type: 'ETF',
    currentNav: 125.80,
    minInvestment: 100,
    performance1Y: 15.2,
    performance3Y: 8.7,
    riskLevel: 'HIGH',
    expenseRatio: 0.65,
    aum: 2.5,
    sector: 'Technology',
    description: 'Focused on disruptive technology companies'
  },
  {
    id: '2',
    name: 'Global Balanced Fund',
    type: 'MUTUAL',
    currentNav: 98.45,
    minInvestment: 500,
    performance1Y: 7.8,
    performance3Y: 6.2,
    riskLevel: 'MED',
    expenseRatio: 0.85,
    aum: 5.8,
    sector: 'Mixed',
    description: 'Diversified portfolio with global exposure'
  },
  {
    id: '3',
    name: 'S&P 500 Index',
    type: 'INDEX',
    currentNav: 452.10,
    minInvestment: 50,
    performance1Y: 11.3,
    performance3Y: 9.1,
    riskLevel: 'LOW',
    expenseRatio: 0.03,
    aum: 15.2,
    sector: 'Broad Market',
    description: 'Tracks the S&P 500 index performance'
  },
  {
    id: '4',
    name: 'Crypto Hedge Fund Alpha',
    type: 'HEDGE',
    currentNav: 2847.90,
    minInvestment: 10000,
    performance1Y: 45.8,
    performance3Y: 22.3,
    riskLevel: 'HIGH',
    expenseRatio: 2.0,
    aum: 1.2,
    sector: 'Cryptocurrency',
    description: 'Aggressive crypto trading strategies'
  }
];

const Funds = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'ALL' | 'ETF' | 'MUTUAL' | 'HEDGE' | 'INDEX'>('ALL');
  
  const filteredFunds = filter === 'ALL' ? mockFunds : mockFunds.filter(fund => fund.type === filter);

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
      case 'ETF': return '📊';
      case 'MUTUAL': return '🏦';
      case 'HEDGE': return '🚀';
      case 'INDEX': return '📈';
      default: return '💰';
    }
  };

  const getPerformanceColor = (perf: number) => {
    return perf >= 10 ? 'text-profit' : perf >= 5 ? 'text-warning' : 'text-loss';
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
            <DollarSign className="h-5 w-5 text-primary" />
            <h1 className="text-2xl font-bold">Funds Explorer</h1>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Available Funds</p>
                  <p className="text-2xl font-bold text-primary">{mockFunds.length}</p>
                </div>
                <Shield className="h-6 w-6 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-profit/20 to-profit/5 border-profit/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Best Performer</p>
                  <p className="text-xl font-bold text-profit">+45.8%</p>
                </div>
                <TrendingUp className="h-6 w-6 text-profit" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/20 to-accent/5 border-accent/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total AUM</p>
                  <p className="text-xl font-bold text-accent">$24.7B</p>
                </div>
                <Zap className="h-6 w-6 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-warning/20 to-warning/5 border-warning/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Min Investment</p>
                  <p className="text-xl font-bold text-warning">$50</p>
                </div>
                <DollarSign className="h-6 w-6 text-warning" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters & Fund List */}
        <Card>
          <CardHeader>
            <CardTitle>Investment Funds</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2 mb-6">
              {['ALL', 'ETF', 'MUTUAL', 'HEDGE', 'INDEX'].map((type) => (
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredFunds.map((fund) => (
                <Card key={fund.id} className="bg-muted/30 border-border/50 hover:bg-muted/50 transition-all">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Fund Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{getTypeIcon(fund.type)}</span>
                          <div>
                            <h3 className="font-bold text-lg">{fund.name}</h3>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline">{fund.type}</Badge>
                              <Badge variant="outline" className={getRiskColor(fund.riskLevel)}>
                                {fund.riskLevel} RISK
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">NAV</p>
                          <p className="text-xl font-bold">${fund.currentNav.toFixed(2)}</p>
                        </div>
                      </div>

                      {/* Performance */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">1Y Performance</p>
                          <p className={`text-lg font-semibold ${getPerformanceColor(fund.performance1Y)}`}>
                            {fund.performance1Y > 0 ? '+' : ''}{fund.performance1Y.toFixed(1)}%
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">3Y Performance</p>
                          <p className={`text-lg font-semibold ${getPerformanceColor(fund.performance3Y)}`}>
                            {fund.performance3Y > 0 ? '+' : ''}{fund.performance3Y.toFixed(1)}%
                          </p>
                        </div>
                      </div>

                      {/* Fund Details */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Sector:</span>
                          <span className="font-medium">{fund.sector}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Expense Ratio:</span>
                          <span className="font-medium">{fund.expenseRatio}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">AUM:</span>
                          <span className="font-medium">${fund.aum.toFixed(1)}B</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Min Investment:</span>
                          <span className="font-medium">${fund.minInvestment.toLocaleString()}</span>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground italic">{fund.description}</p>

                      {/* Action Buttons */}
                      <div className="flex space-x-2 pt-4">
                        <Button variant="game" className="flex-1">
                          Invest Now
                        </Button>
                        <Button variant="outline" className="flex-1">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Funds;