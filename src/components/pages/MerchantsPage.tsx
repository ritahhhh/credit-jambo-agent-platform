import { useState } from "react";
import { MerchantCard } from "../MerchantCard";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Search, Plus, Store, MapPin, Phone, Mail, TrendingUp } from "lucide-react";
import { StatusBadge } from "../StatusBadge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export function MerchantsPage() {
  const [selectedMerchant, setSelectedMerchant] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const merchants = [
    {
      id: "1",
      name: "Mama Mboga Fresh Produce",
      category: "Grocery & Food",
      location: "Nairobi, Westlands",
      phone: "+254 712 345 678",
      email: "mama.mboga@email.com",
      status: "active" as const,
      transactions: 245,
      revenue: 456000,
      joinDate: "Jan 2025",
    },
    {
      id: "2",
      name: "Tech Hub Electronics",
      category: "Electronics",
      location: "Nairobi, CBD",
      phone: "+254 723 456 789",
      email: "info@techhub.com",
      status: "active" as const,
      transactions: 189,
      revenue: 1250000,
      joinDate: "Dec 2024",
    },
    {
      id: "3",
      name: "Fashion Boutique",
      category: "Fashion & Apparel",
      location: "Mombasa, Nyali",
      phone: "+254 734 567 890",
      email: "contact@fashionboutique.com",
      status: "verified" as const,
      transactions: 156,
      revenue: 780000,
      joinDate: "Feb 2025",
    },
    {
      id: "4",
      name: "Quick Mart",
      category: "Retail",
      location: "Kisumu, Town",
      phone: "+254 745 678 901",
      email: "quickmart@email.com",
      status: "pending" as const,
      transactions: 23,
      revenue: 45000,
      joinDate: "Oct 2025",
    },
  ];

  const activeMerchants = merchants.filter((m) => m.status === "active" || m.status === "verified");
  const pendingMerchants = merchants.filter((m) => m.status === "pending");

  const selectedMerchantData = merchants.find((m) => m.id === selectedMerchant);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Merchants</h1>
          <p className="text-muted-foreground">Manage and verify merchant accounts</p>
        </div>
        <Button className="bg-[#00B050] hover:bg-[#008F40]">
          <Plus className="w-4 h-4 mr-2" />
          Add Merchant
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search merchants..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Merchants ({merchants.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({activeMerchants.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingMerchants.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {merchants.map((merchant) => (
              <MerchantCard
                key={merchant.id}
                {...merchant}
                onClick={() => setSelectedMerchant(merchant.id)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeMerchants.map((merchant) => (
              <MerchantCard
                key={merchant.id}
                {...merchant}
                onClick={() => setSelectedMerchant(merchant.id)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pendingMerchants.map((merchant) => (
              <MerchantCard
                key={merchant.id}
                {...merchant}
                onClick={() => setSelectedMerchant(merchant.id)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Merchant Detail Dialog */}
      <Dialog open={!!selectedMerchant} onOpenChange={() => setSelectedMerchant(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Merchant Profile</DialogTitle>
            <DialogDescription>Detailed information about this merchant</DialogDescription>
          </DialogHeader>

          {selectedMerchantData && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h3>{selectedMerchantData.name}</h3>
                  <p className="text-muted-foreground">{selectedMerchantData.category}</p>
                </div>
                <StatusBadge status={selectedMerchantData.status} />
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                  <MapPin className="w-5 h-5 text-[#00B050] mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="text-sm">{selectedMerchantData.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                  <Phone className="w-5 h-5 text-[#00B050] mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="text-sm">{selectedMerchantData.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                  <Mail className="w-5 h-5 text-[#00B050] mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="text-sm">{selectedMerchantData.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                  <Store className="w-5 h-5 text-[#00B050] mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Join Date</p>
                    <p className="text-sm">{selectedMerchantData.joinDate}</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-gradient-to-br from-[#00B050]/10 to-[#74DCBA]/10 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Total Transactions</p>
                  <p className="text-foreground">
                    {selectedMerchantData.transactions}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-[#00B050]" />
                    <p className="text-[#00B050]">
                      KSH {selectedMerchantData.revenue.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  View Transactions
                </Button>
                <Button className="flex-1 bg-[#00B050] hover:bg-[#008F40]">
                  Contact Merchant
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
