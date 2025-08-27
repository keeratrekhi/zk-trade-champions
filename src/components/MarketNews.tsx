import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Newspaper, Clock } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  timestamp: string;
  impact: 'high' | 'medium' | 'low';
  affectedCommodities: string[];
}

const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "OPEC+ Announces Production Cut Extension",
    summary: "Major oil producers extend production cuts through Q3, expected to support crude oil prices amid global demand concerns.",
    timestamp: "2 hours ago",
    impact: "high",
    affectedCommodities: ["Crude Oil", "Natural Gas"]
  },
  {
    id: "2",
    title: "Federal Reserve Signals Rate Pause",
    summary: "Fed officials hint at holding rates steady, potentially weakening dollar and supporting precious metals.",
    timestamp: "4 hours ago", 
    impact: "medium",
    affectedCommodities: ["Gold", "Silver"]
  },
  {
    id: "3",
    title: "Weather Concerns Hit Agricultural Markets",
    summary: "Drought conditions in key growing regions raise supply concerns for wheat and corn crops.",
    timestamp: "6 hours ago",
    impact: "high", 
    affectedCommodities: ["Wheat", "Corn"]
  },
  {
    id: "4",
    title: "China Manufacturing Data Beats Expectations",
    summary: "Strong industrial output data from China boosts copper and other industrial metal prices.",
    timestamp: "8 hours ago",
    impact: "medium",
    affectedCommodities: ["Copper", "Aluminum"]
  }
];

const MarketNews = () => {
  const getImpactColor = (impact: NewsItem['impact']) => {
    switch (impact) {
      case 'high':
        return 'bg-danger text-danger-foreground';
      case 'medium':
        return 'bg-warning text-warning-foreground';
      case 'low':
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Newspaper className="h-5 w-5 text-primary" />
          <span>Market News & Events</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 max-h-64 overflow-y-auto">
        {mockNews.map((news) => (
          <div 
            key={news.id}
            className="p-4 rounded-lg border border-border/50 bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-sm leading-tight">{news.title}</h3>
                <Badge 
                  className={`ml-2 text-xs ${getImpactColor(news.impact)}`}
                >
                  {news.impact.toUpperCase()}
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground">
                {news.summary}
              </p>
              
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{news.timestamp}</span>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {news.affectedCommodities.map((commodity) => (
                    <Badge 
                      key={commodity}
                      variant="outline" 
                      className="text-xs"
                    >
                      {commodity}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default MarketNews;