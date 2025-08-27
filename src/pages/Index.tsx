import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import MainMenu from "@/components/MainMenu";
import TradingDashboard from "@/components/TradingDashboard";
import RankingsList from "@/components/RankingsList";

type GameScreen = 'menu' | 'game' | 'rankings';

interface PlayerStats {
  cash: number;
  totalAssets: number;
  transactionProgress: number;
  maxPositions: number;
  currentPositions: number;
}

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('menu');
  const [playerStats, setPlayerStats] = useState<PlayerStats>({
    cash: 100000,
    totalAssets: 100000,
    transactionProgress: 0,
    maxPositions: 5,
    currentPositions: 3
  });
  const { toast } = useToast();

  const handleStartGame = () => {
    // Simulate registration payment
    toast({
      title: "Game Started!",
      description: "$2 registration fee processed. Good luck trading!",
    });
    setCurrentScreen('game');
  };

  const handleShowRankings = () => {
    setCurrentScreen('rankings');
  };

  const handleBackToMenu = () => {
    setCurrentScreen('menu');
  };

  const handleExpandPositions = () => {
    const expansionCost = Math.min(10, playerStats.totalAssets * 0.5);
    if (playerStats.cash >= expansionCost) {
      setPlayerStats(prev => ({
        ...prev,
        cash: prev.cash - expansionCost,
        maxPositions: prev.maxPositions + 1
      }));
      toast({
        title: "Position Limit Expanded!",
        description: `Paid $${expansionCost.toLocaleString()} to increase position limit.`,
      });
    } else {
      toast({
        title: "Insufficient Funds",
        description: "Not enough cash to expand position limit.",
        variant: "destructive"
      });
    }
  };

  const handleNextYear = () => {
    setPlayerStats(prev => ({
      ...prev,
      transactionProgress: Math.min(prev.transactionProgress + 25, 100)
    }));
    toast({
      title: "Year Advanced",
      description: "Zero-knowledge proof generated for your trades.",
    });
  };

  const handleEndGame = () => {
    toast({
      title: "Game Ended",
      description: `Final score: $${playerStats.totalAssets.toLocaleString()}. Transaction verified on blockchain.`,
    });
    setCurrentScreen('menu');
    // Reset game state
    setPlayerStats({
      cash: 100000,
      totalAssets: 100000,
      transactionProgress: 0,
      maxPositions: 5,
      currentPositions: 3
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {currentScreen === 'menu' && (
        <MainMenu 
          onStartGame={handleStartGame}
          onShowRankings={handleShowRankings}
        />
      )}
      
      {currentScreen === 'game' && (
        <TradingDashboard 
          playerStats={playerStats}
          onBackToMenu={handleBackToMenu}
          onExpandPositions={handleExpandPositions}
          onNextYear={handleNextYear}
          onEndGame={handleEndGame}
        />
      )}
      
      {currentScreen === 'rankings' && (
        <RankingsList onBackToMenu={handleBackToMenu} />
      )}
    </div>
  );
};

export default Index;
