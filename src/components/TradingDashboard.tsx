import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, Calendar, Expand, ArrowLeft, Briefcase, Receipt, Target } from "lucide-react";
import { Link } from "react-router-dom";
import CommodityList from "./CommodityList";
import PositionsList from "./PositionsList";
import MarketNews from "./MarketNews";

interface TradingDashboardProps {
  playerStats: {
    cash: number;
    totalAssets: number;
    transactionProgress: number;
    maxPositions: number;
    currentPositions: number;
  };
  onBackToMenu: () => void;
  onExpandPositions: () => void;
  onNextYear: () => void;
  onEndGame: () => void;
}

const TradingDashboard = ({ 
  playerStats, 
  onBackToMenu, 
  onExpandPositions,
  onNextYear,
  onEndGame 
}: TradingDashboardProps) => {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button 
            onClick={onBackToMenu}
            variant="outline"
            size="sm"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Menu
          </Button>
          
          <div className="flex space-x-2">
            <Link to="/portfolio">
              <Button variant="outline" size="sm">
                <Briefcase className="mr-2 h-4 w-4" />
                Portfolio
              </Button>
            </Link>
            <Link to="/funds">
              <Button variant="outline" size="sm">
                <Target className="mr-2 h-4 w-4" />
                Funds
              </Button>
            </Link>
            <Link to="/transactions">
              <Button variant="outline" size="sm">
                <Receipt className="mr-2 h-4 w-4" />
                Transactions
              </Button>
            </Link>
            <Button 
              onClick={onNextYear}
              variant="game"
              size="sm"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Next Year
            </Button>
            <Button 
              onClick={onEndGame}
              variant="danger"
              size="sm"
            >
              End Game
            </Button>
          </div>
        </div>

        {/* Player Stats */}
        <Card className="p-6 bg-gradient-to-r from-card to-muted border-border/50">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-success" />
                <span className="text-sm font-medium">Available Cash</span>
              </div>
              <p className="text-2xl font-bold text-success">
                ${playerStats.cash.toLocaleString()}
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Total Assets</span>
              </div>
              <p className="text-2xl font-bold text-primary">
                ${playerStats.totalAssets.toLocaleString()}
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Positions</span>
                <Badge variant="secondary">
                  {playerStats.currentPositions}/{playerStats.maxPositions}
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Progress 
                  value={(playerStats.currentPositions / playerStats.maxPositions) * 100} 
                  className="flex-1"
                />
                <Button 
                  onClick={onExpandPositions}
                  size="sm"
                  variant="outline"
                >
                  <Expand className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <span className="text-sm font-medium">Transaction Progress</span>
              <div className="space-y-1">
                <Progress value={playerStats.transactionProgress} />
                <p className="text-xs text-muted-foreground text-center">
                  {playerStats.transactionProgress}% Complete
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Market News */}
        <MarketNews />

        {/* Trading Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CommodityList />
          <PositionsList />
        </div>
      </div>
    </div>
  );
};

export default TradingDashboard;