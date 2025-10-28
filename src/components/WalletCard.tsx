import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Wallet, TrendingUp, Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface WalletCardProps {
  balance: number;
  currency?: string;
  change?: number;
  className?: string;
}

export function WalletCard({ balance, currency = "KSH", change, className }: WalletCardProps) {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <Card className={`bg-gradient-to-br from-[#00B050] to-[#0ACB8B] text-white border-0 ${className || ""}`}>
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div>
          <CardTitle className="text-white/90 text-sm">Total Balance</CardTitle>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-sm text-white/80">{currency}</span>
            <h2 className="text-white">
              {showBalance ? balance.toLocaleString() : "••••••"}
            </h2>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowBalance(!showBalance)}
          className="text-white hover:bg-white/20 h-8 w-8"
        >
          {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </Button>
      </CardHeader>
      <CardContent>
        {change !== undefined && (
          <div className="flex items-center gap-1 text-white/90 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>+{change}% from last month</span>
          </div>
        )}
        <div className="flex gap-2 mt-4">
          <Button variant="secondary" size="sm" className="bg-white dark:bg-card text-primary hover:bg-white/90 dark:hover:bg-card/90">
            <Wallet className="w-4 h-4 mr-2" />
            Add Money
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 border border-white/30">
            Withdraw
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
