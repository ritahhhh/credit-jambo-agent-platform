import { WalletCard } from "../WalletCard";
import { StatsCard } from "../StatsCard";
import { TransactionCard } from "../TransactionCard";
import { Clock, CheckCircle, Users, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

interface DashboardPageProps {
  onTransactionClick?: (id: string) => void;
}

export function DashboardPage({ onTransactionClick }: DashboardPageProps) {
  const recentTransactions = [
    {
      id: "1",
      type: "incoming" as const,
      amount: 15000,
      description: "Payment from Sarah Mwangi",
      date: "Today, 2:30 PM",
      status: "completed" as const,
    },
    {
      id: "2",
      type: "outgoing" as const,
      amount: 5000,
      description: "Transfer to John Kamau",
      date: "Today, 11:00 AM",
      status: "pending" as const,
    },
    {
      id: "3",
      type: "incoming" as const,
      amount: 25000,
      description: "Commission - Oct 2025",
      date: "Yesterday, 9:00 AM",
      status: "completed" as const,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1>Dashboard</h1>
        <p className="text-muted-foreground">Overview of your agent wallet activity</p>
      </div>

      {/* Wallet Card */}
      <WalletCard balance={245600} change={12.5} />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Pending Transactions"
          value="8"
          change="+2 from yesterday"
          icon={Clock}
          trend="up"
        />
        <StatsCard
          title="Approved Today"
          value="24"
          change="+15% from yesterday"
          icon={CheckCircle}
          trend="up"
        />
        <StatsCard
          title="Active Merchants"
          value="156"
          change="+3 this week"
          icon={Users}
          trend="up"
        />
        <StatsCard
          title="Today's Commission"
          value="KSH 8,450"
          change="+22% from yesterday"
          icon={TrendingUp}
          trend="up"
        />
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm">Send Money</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm">Withdraw</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm">Add Merchant</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm">Approve</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Transactions</CardTitle>
          <Button variant="link" className="text-primary">
            View All
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentTransactions.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              {...transaction}
              onClick={() => onTransactionClick?.(transaction.id)}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
