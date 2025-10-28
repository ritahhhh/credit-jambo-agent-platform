import { useState } from "react";
import { TransactionCard } from "../TransactionCard";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Search, CheckCircle, XCircle, User, Calendar, DollarSign } from "lucide-react";
import { StatusBadge } from "../StatusBadge";
import { toast } from "sonner@2.0.3";

export function TransactionsPage() {
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const transactions = [
    {
      id: "1",
      type: "incoming" as const,
      amount: 15000,
      description: "Payment from Sarah Mwangi",
      customer: "Sarah Mwangi",
      phone: "+254 712 345 678",
      date: "Today, 2:30 PM",
      status: "pending" as const,
    },
    {
      id: "2",
      type: "outgoing" as const,
      amount: 5000,
      description: "Transfer to John Kamau",
      customer: "John Kamau",
      phone: "+254 723 456 789",
      date: "Today, 11:00 AM",
      status: "pending" as const,
    },
    {
      id: "3",
      type: "incoming" as const,
      amount: 25000,
      description: "Commission - Oct 2025",
      customer: "Credit Jambo",
      phone: "N/A",
      date: "Yesterday, 9:00 AM",
      status: "completed" as const,
    },
    {
      id: "4",
      type: "incoming" as const,
      amount: 8500,
      description: "Payment from Jane Ochieng",
      customer: "Jane Ochieng",
      phone: "+254 734 567 890",
      date: "Oct 26, 3:15 PM",
      status: "approved" as const,
    },
  ];

  const pendingTransactions = transactions.filter((t) => t.status === "pending");
  const approvedTransactions = transactions.filter((t) => t.status === "approved" || t.status === "completed");

  const selectedTxn = transactions.find((t) => t.id === selectedTransaction);

  const handleApprove = () => {
    toast.success("Transaction approved successfully");
    setSelectedTransaction(null);
  };

  const handleReject = () => {
    toast.error("Transaction rejected");
    setSelectedTransaction(null);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1>Transactions</h1>
        <p className="text-muted-foreground">Manage and approve customer transactions</p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search transactions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">
            Pending ({pendingTransactions.length})
          </TabsTrigger>
          <TabsTrigger value="approved">
            Approved ({approvedTransactions.length})
          </TabsTrigger>
          <TabsTrigger value="all">All ({transactions.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-3">
          {pendingTransactions.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              {...transaction}
              onClick={() => setSelectedTransaction(transaction.id)}
            />
          ))}
        </TabsContent>

        <TabsContent value="approved" className="space-y-3">
          {approvedTransactions.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              {...transaction}
              onClick={() => setSelectedTransaction(transaction.id)}
            />
          ))}
        </TabsContent>

        <TabsContent value="all" className="space-y-3">
          {transactions.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              {...transaction}
              onClick={() => setSelectedTransaction(transaction.id)}
            />
          ))}
        </TabsContent>
      </Tabs>

      {/* Transaction Detail Dialog */}
      <Dialog open={!!selectedTransaction} onOpenChange={() => setSelectedTransaction(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
            <DialogDescription>Review and approve or reject this transaction</DialogDescription>
          </DialogHeader>

          {selectedTxn && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p className="text-[#00B050]">
                    KSH {selectedTxn.amount.toLocaleString()}
                  </p>
                </div>
                <StatusBadge status={selectedTxn.status} />
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Customer</p>
                    <p>{selectedTxn.customer}</p>
                    <p className="text-sm text-muted-foreground">{selectedTxn.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Date & Time</p>
                    <p>{selectedTxn.date}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Description</p>
                    <p>{selectedTxn.description}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTxn?.status === "pending" && (
            <DialogFooter className="flex gap-2 sm:gap-2">
              <Button
                variant="outline"
                className="flex-1 text-destructive border-destructive hover:bg-destructive/10"
                onClick={handleReject}
              >
                <XCircle className="w-4 h-4 mr-2" />
                Reject
              </Button>
              <Button
                className="flex-1 bg-[#00B050] hover:bg-[#008F40]"
                onClick={handleApprove}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Approve
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
