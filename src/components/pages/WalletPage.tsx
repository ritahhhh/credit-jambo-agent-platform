import { useState } from "react";
import { WalletCard } from "../WalletCard";
import { TransactionCard } from "../TransactionCard";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Send, Download, RefreshCw, Plus } from "lucide-react";
import { toast } from "sonner@2.0.3";

export function WalletPage() {
  const [showSendDialog, setShowSendDialog] = useState(false);
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false);

  const transactions = [
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
      status: "completed" as const,
    },
    {
      id: "3",
      type: "incoming" as const,
      amount: 25000,
      description: "Commission - Oct 2025",
      date: "Yesterday, 9:00 AM",
      status: "completed" as const,
    },
    {
      id: "4",
      type: "incoming" as const,
      amount: 8500,
      description: "Payment from Jane Ochieng",
      date: "Oct 26, 3:15 PM",
      status: "completed" as const,
    },
    {
      id: "5",
      type: "outgoing" as const,
      amount: 12000,
      description: "Withdrawal to Bank",
      date: "Oct 25, 1:20 PM",
      status: "completed" as const,
    },
  ];

  const handleSendMoney = () => {
    toast.success("Money sent successfully");
    setShowSendDialog(false);
  };

  const handleWithdraw = () => {
    toast.success("Withdrawal request submitted");
    setShowWithdrawDialog(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1>Wallet</h1>
        <p className="text-muted-foreground">Manage your funds and view transaction history</p>
      </div>

      {/* Wallet Card */}
      <WalletCard balance={245600} change={12.5} />

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Button
          onClick={() => setShowSendDialog(true)}
          className="h-auto py-6 flex-col gap-2 bg-[#00B050] hover:bg-[#008F40]"
        >
          <Send className="w-6 h-6" />
          Send Money
        </Button>
        <Button
          onClick={() => setShowWithdrawDialog(true)}
          variant="outline"
          className="h-auto py-6 flex-col gap-2"
        >
          <Download className="w-6 h-6" />
          Withdraw
        </Button>
        <Button variant="outline" className="h-auto py-6 flex-col gap-2">
          <RefreshCw className="w-6 h-6" />
          Request Money
        </Button>
        <Button variant="outline" className="h-auto py-6 flex-col gap-2">
          <Plus className="w-6 h-6" />
          Add Money
        </Button>
      </div>

      {/* Transaction History */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Transaction History</CardTitle>
          <Button variant="outline" size="sm">
            Export
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {transactions.map((transaction) => (
            <TransactionCard key={transaction.id} {...transaction} />
          ))}
        </CardContent>
      </Card>

      {/* Send Money Dialog */}
      <Dialog open={showSendDialog} onOpenChange={setShowSendDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Money</DialogTitle>
            <DialogDescription>Transfer funds to another wallet or merchant</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient Phone Number</Label>
              <Input id="recipient" placeholder="+254 700 000 000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (KSH)</Label>
              <Input id="amount" type="number" placeholder="0.00" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="note">Note (Optional)</Label>
              <Input id="note" placeholder="Payment for..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSendDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-[#00B050] hover:bg-[#008F40]" onClick={handleSendMoney}>
              Send Money
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Withdraw Dialog */}
      <Dialog open={showWithdrawDialog} onOpenChange={setShowWithdrawDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Withdraw to Bank</DialogTitle>
            <DialogDescription>Transfer funds to your bank account</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Available Balance</p>
              <p className="text-[#00B050]">KSH 245,600</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="withdraw-amount">Amount (KSH)</Label>
              <Input id="withdraw-amount" type="number" placeholder="0.00" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bank">Bank Account</Label>
              <Input id="bank" placeholder="Account Number" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowWithdrawDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-[#00B050] hover:bg-[#008F40]" onClick={handleWithdraw}>
              Withdraw
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
