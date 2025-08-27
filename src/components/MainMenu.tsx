import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TrendingUp, Trophy, DollarSign } from "lucide-react";

interface MainMenuProps {
  onStartGame: () => void;
  onShowRankings: () => void;
}

const MainMenu = ({ onStartGame, onShowRankings }: MainMenuProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 text-center space-y-8 bg-gradient-to-br from-card via-card to-muted shadow-2xl border-border/50">
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <TrendingUp className="h-12 w-12 text-primary" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              zkSimulatedTrading
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-md mx-auto">
            Experience real-world commodity trading with zero-knowledge proof security. 
            Prove your trading skills without revealing your strategies.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button 
            onClick={onStartGame}
            size="lg"
            variant="game"
            className="w-full max-w-sm mx-auto text-lg font-semibold"
          >
            <DollarSign className="mr-2 h-5 w-5" />
            Start Game ($2 Registration)
          </Button>
          
          <Button 
            onClick={onShowRankings}
            size="lg"
            variant="secondary"
            className="w-full max-w-sm mx-auto text-lg font-semibold"
          >
            <Trophy className="mr-2 h-5 w-5" />
            Rank List
          </Button>
        </div>
        
        <div className="pt-4 border-t border-border/30">
          <p className="text-sm text-muted-foreground">
            Powered by Zero-Knowledge Proofs • Blockchain Verified
          </p>
        </div>
      </Card>
    </div>
  );
};

export default MainMenu;