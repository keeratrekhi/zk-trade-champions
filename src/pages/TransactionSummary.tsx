import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Receipt, TrendingUp, TrendingDown, Clock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Transaction {
  id: string;
  type: 'BUY' | 'SELL';
  asset: string;
  assetType: 'COM' | 'CRY' | 'STOCK' | 'FUND';
  quantity: number;
  price: number;
  total: number;
  fee: number;
  timestamp: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  pnl?: number;
}

const mockTransactions: Transaction[] = [
  {
    id: 'TXN001',
    type: 'BUY',
    asset: 'Crude Oil',
    assetType: 'COM',
    quantity: 100,
    price: 79.20,
    total: 7920,
    fee: 15.84,
    timestamp: '2024-01-15 14:30:00',
    status: 'COMPLETED'
  },
  {
    id: 'TXN002',
    type: 'SELL',
    asset: 'Gold',
    assetType: 'COM',
    quantity: 2,
    price: 2010.25,
    total: 4020.50,
    fee: 8.04,
    timestamp: '2024-01-15 11:45:00',
    status: 'COMPLETED',
    pnl: 125.30
  },
  {
    id: 'TXN003',
    type: 'BUY',
    asset: 'Bitcoin',
    assetType: 'CRY',
    quantity: 0.5,
    price: 41000.00,
    total: 20500,
    fee: 41.00,
    timestamp: '2024-01-14 16:20:00',
    status: 'COMPLETED'
  },
  {
    id: 'TXN004',
    type: 'BUY',
    asset: 'AAPL',
    assetType: 'STOCK',
    quantity: 20,
    price: 168.50,
    total: 3370,
    fee: 6.74,
    timestamp: '2024-01-14 09:15:00',
    status: 'PENDING'
  }
];

const TransactionSummary = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'ALL' | 'BUY' | 'SELL'>('ALL');
  
  const filteredTransactions = filter === 'ALL' ? mockTransactions : mockTransactions.filter(tx => tx.type === filter);
  const totalVolume = mockTransactions.reduce((sum, tx) => sum + tx.total, 0);
  const totalFees = mockTransactions.reduce((sum, tx) => sum + tx.fee, 0);
  const totalPnL = mockTransactions.reduce((sum, tx) => sum + (tx.pnl || 0), 0);

  const getAssetIcon = (type: string) => {
    switch (type) {
      case 'COM': return '🛢️';
      case 'CRY': return '₿';
      case 'STOCK': return '📈';
      case 'FUND': return '💼';
      default: return '💰';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'text-profit';
      case 'PENDING': return 'text-warning';
      case 'FAILED': return 'text-loss';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED': return <CheckCircle className="h-4 w-4" />;
      case 'PENDING': return <Clock className="h-4 w-4" />;
      case 'FAILED': return <TrendingDown className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
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
            <Receipt className="h-5 w-5 text-primary" />
            <h1 className="text-2xl font-bold">Transaction Summary</h1>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Volume</p>
                  <p className="text-2xl font-bold text-primary">${totalVolume.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-profit/20 to-profit/5 border-profit/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total P&L</p>
                  <p className="text-2xl font-bold text-profit">+${totalPnL.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-profit" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-warning/20 to-warning/5 border-warning/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Fees</p>
                  <p className="text-2xl font-bold text-warning">${totalFees.toFixed(2)}</p>
                </div>
                <Receipt className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/20 to-accent/5 border-accent/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Transactions</p>
                  <p className="text-2xl font-bold text-accent">{mockTransactions.length}</p>
                </div>
                <Clock className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transaction Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Transaction History</span>
              <div className="flex space-x-2">
                {['ALL', 'BUY', 'SELL'].map((type) => (
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
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="transactions" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="zkproof">ZK Proofs</TabsTrigger>
              </TabsList>
              
              <TabsContent value="transactions" className="space-y-4">
                <div className="space-y-4">
                  {filteredTransactions.map((tx) => (
                    <div key={tx.id} className="p-4 border border-border/50 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all">
                      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{getAssetIcon(tx.assetType)}</span>
                          <div>
                            <p className="font-semibold">{tx.asset}</p>
                            <p className="text-sm text-muted-foreground">{tx.id}</p>
                          </div>
                        </div>
                        
                        <div>
                          <Badge variant={tx.type === 'BUY' ? 'default' : 'secondary'}>
                            {tx.type}
                          </Badge>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground">Quantity</p>
                          <p className="font-semibold">{tx.quantity}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground">Price</p>
                          <p className="font-mono">${tx.price.toFixed(2)}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground">Total</p>
                          <p className="font-mono">${tx.total.toLocaleString()}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground">P&L</p>
                          {tx.pnl ? (
                            <p className={`font-semibold ${tx.pnl >= 0 ? 'text-profit' : 'text-loss'}`}>
                              {tx.pnl >= 0 ? '+' : ''}${tx.pnl.toFixed(2)}
                            </p>
                          ) : (
                            <p className="text-sm text-muted-foreground">N/A</p>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className={`flex items-center space-x-1 ${getStatusColor(tx.status)}`}>
                            {getStatusIcon(tx.status)}
                            <span className="text-sm">{tx.status}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(tx.timestamp).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="zkproof" className="space-y-4">
                <div className="text-center py-12">
                  <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg p-8 border border-primary/20">
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Zero-Knowledge Proofs Generated</h3>
                    <p className="text-muted-foreground mb-6">
                      All your transactions have been verified using zero-knowledge proofs, 
                      ensuring privacy while maintaining transparency.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-primary">4</p>
                        <p className="text-sm text-muted-foreground">Proofs Generated</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-profit">100%</p>
                        <p className="text-sm text-muted-foreground">Verification Rate</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-accent">256-bit</p>
                        <p className="text-sm text-muted-foreground">Encryption</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TransactionSummary;