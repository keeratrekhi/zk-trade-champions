import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, Crown, ArrowLeft } from "lucide-react";

interface Player {
  id: string;
  username: string;
  totalAssets: number;
  profit: number;
  profitPercent: number;
  rank: number;
  country: string;
  gamesPlayed: number;
}

const mockRankings: Player[] = [
  {
    id: "1",
    username: "TradeKing2024",
    totalAssets: 150000,
    profit: 50000,
    profitPercent: 50.0,
    rank: 1,
    country: "USA",
    gamesPlayed: 12
  },
  {
    id: "2", 
    username: "CryptoWhale",
    totalAssets: 142500,
    profit: 42500,
    profitPercent: 42.5,
    rank: 2,
    country: "UK", 
    gamesPlayed: 8
  },
  {
    id: "3",
    username: "CommodityMaster",
    totalAssets: 135000,
    profit: 35000,
    profitPercent: 35.0,
    rank: 3,
    country: "Germany",
    gamesPlayed: 15
  },
  {
    id: "4",
    username: "OilBaron",
    totalAssets: 128000,
    profit: 28000,
    profitPercent: 28.0,
    rank: 4,
    country: "Canada",
    gamesPlayed: 6
  },
  {
    id: "5",
    username: "GoldDigger",
    totalAssets: 121000,
    profit: 21000,
    profitPercent: 21.0,
    rank: 5,
    country: "Australia",
    gamesPlayed: 10
  }
];

interface RankingsListProps {
  onBackToMenu: () => void;
}

const RankingsList = ({ onBackToMenu }: RankingsListProps) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-warning" />;
      case 2:
        return <Medal className="h-6 w-6 text-muted-foreground" />;
      case 3:
        return <Award className="h-6 w-6 text-warning" />;
      default:
        return <Trophy className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getRankBadgeVariant = (rank: number) => {
    if (rank <= 3) return "default";
    return "secondary";
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
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
          
          <div className="text-right">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Top Traders
            </h1>
            <p className="text-sm text-muted-foreground">Current Season Leaderboard</p>
          </div>
        </div>

        {/* Rankings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-warning" />
              <span>Global Rankings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockRankings.map((player) => (
              <div 
                key={player.id}
                className={`p-4 rounded-lg border transition-colors ${
                  player.rank <= 3 
                    ? 'border-primary/50 bg-primary/5 hover:bg-primary/10' 
                    : 'border-border/50 bg-muted/30 hover:bg-muted/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {getRankIcon(player.rank)}
                      <Badge variant={getRankBadgeVariant(player.rank)}>
                        #{player.rank}
                      </Badge>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-lg">{player.username}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{player.country}</span>
                        <span>•</span>
                        <span>{player.gamesPlayed} games</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right space-y-1">
                    <div className="text-lg font-bold">
                      ${player.totalAssets.toLocaleString()}
                    </div>
                    <div className="text-sm">
                      <span className="text-profit">
                        +${player.profit.toLocaleString()}
                      </span>
                      <span className="text-muted-foreground ml-1">
                        ({player.profitPercent.toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Season Info */}
        <Card className="bg-gradient-to-r from-card to-muted border-border/50">
          <CardContent className="p-6">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-semibold">Season 3 - Active</h2>
              <p className="text-muted-foreground">
                Rewards distributed automatically when prize pool reaches $10,000
              </p>
              <div className="flex items-center justify-center space-x-4 mt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">$7,420</div>
                  <div className="text-sm text-muted-foreground">Current Prize Pool</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">156</div>
                  <div className="text-sm text-muted-foreground">Active Players</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RankingsList;