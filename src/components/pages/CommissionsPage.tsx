import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { StatsCard } from "../StatsCard";
import {
  DollarSign,
  TrendingUp,
  Calendar,
  Download,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function CommissionsPage() {
  const chartData = [
    { month: "May", earnings: 18000 },
    { month: "Jun", earnings: 22000 },
    { month: "Jul", earnings: 19500 },
    { month: "Aug", earnings: 25000 },
    { month: "Sep", earnings: 28000 },
    { month: "Oct", earnings: 32000 },
  ];

  const commissionHistory = [
    {
      id: "1",
      date: "Oct 28, 2025",
      type: "Transaction Commission",
      merchant: "Mama Mboga Fresh Produce",
      transactions: 15,
      amount: 4500,
      status: "Paid",
    },
    {
      id: "2",
      date: "Oct 27, 2025",
      type: "Transaction Commission",
      merchant: "Tech Hub Electronics",
      transactions: 8,
      amount: 3200,
      status: "Paid",
    },
    {
      id: "3",
      date: "Oct 26, 2025",
      type: "Monthly Bonus",
      merchant: "Credit Jambo",
      transactions: 156,
      amount: 25000,
      status: "Paid",
    },
    {
      id: "4",
      date: "Oct 25, 2025",
      type: "Transaction Commission",
      merchant: "Fashion Boutique",
      transactions: 12,
      amount: 3600,
      status: "Pending",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Commissions & Earnings</h1>
          <p className="text-muted-foreground">
            Track your earnings and commission breakdown
          </p>
        </div>
        <Button className="bg-[#00B050] hover:bg-[#008F40]">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          title="Total Earnings (Oct)"
          value="KSH 32,000"
          change="+14.3% from last month"
          icon={DollarSign}
          trend="up"
        />
        <StatsCard
          title="Pending Commission"
          value="KSH 3,600"
          change="1 transaction pending"
          icon={Calendar}
        />
        <StatsCard
          title="Average per Transaction"
          value="KSH 300"
          change="+5% from last month"
          icon={TrendingUp}
          trend="up"
        />
      </div>

      {/* Earnings Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Earnings Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient
                  id="earningsGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#00B050"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="#00B050"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e5e5"
              />
              <XAxis dataKey="month" stroke="#666666" />
              <YAxis stroke="#666666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e5e5",
                  borderRadius: "8px",
                }}
              />
              <Area
                type="monotone"
                dataKey="earnings"
                stroke="#00B050"
                strokeWidth={2}
                fill="url(#earningsGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Commission Breakdown */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Commission History</CardTitle>
          <Button variant="outline" size="sm">
            Filter
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Merchant</TableHead>
                <TableHead className="text-right">
                  Transactions
                </TableHead>
                <TableHead className="text-right">
                  Amount
                </TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {commissionHistory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.merchant}</TableCell>
                  <TableCell className="text-right">
                    {item.transactions}
                  </TableCell>
                  <TableCell className="text-right text-[#00B050]">
                    KSH {item.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        item.status === "Paid"
                          ? "bg-[#D1FAE5] text-[#065F46]"
                          : "bg-[#FEF3C7] text-[#92400E]"
                      }`}
                    >
                      {item.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Monthly Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>This Month's Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span className="text-muted-foreground">
                Transaction Commission
              </span>
              <span className="text-[#00B050]">KSH 24,500</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span className="text-muted-foreground">
                Merchant Onboarding Bonus
              </span>
              <span className="text-[#00B050]">KSH 5,000</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span className="text-muted-foreground">
                Performance Bonus
              </span>
              <span className="text-[#00B050]">KSH 2,500</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gradient-to-br from-[#00B050]/10 to-[#74DCBA]/10 rounded-lg border-2 border-[#00B050]">
              <span>Total Earnings</span>
              <span className="text-[#00B050]">KSH 32,000</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Earning Merchants</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: "Tech Hub Electronics", amount: 8500 },
              {
                name: "Mama Mboga Fresh Produce",
                amount: 6200,
              },
              { name: "Fashion Boutique", amount: 4800 },
              { name: "Quick Mart", amount: 3500 },
            ].map((merchant, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#00B050] text-white rounded-full flex items-center justify-center text-sm">
                    {index + 1}
                  </div>
                  <span>{merchant.name}</span>
                </div>
                <span className="text-[#00B050]">
                  KSH {merchant.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}