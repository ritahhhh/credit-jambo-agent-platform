import { Card, CardContent } from "./ui/card";
import { Store, MapPin, Phone } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";

interface MerchantCardProps {
  id: string;
  name: string;
  category: string;
  location: string;
  phone: string;
  status: "active" | "inactive" | "pending" | "verified";
  transactions: number;
  revenue: number;
  onClick?: () => void;
}

export function MerchantCard({
  name,
  category,
  location,
  phone,
  status,
  transactions,
  revenue,
  onClick,
}: MerchantCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12 bg-primary/10 dark:bg-primary/20">
              <AvatarFallback className="text-primary">
                <Store className="w-6 h-6" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h4>{name}</h4>
              <p className="text-muted-foreground text-sm">{category}</p>
            </div>
          </div>
          <StatusBadge status={status} />
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            {location}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="w-4 h-4" />
            {phone}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-muted rounded-lg">
          <div>
            <p className="text-sm text-muted-foreground">Transactions</p>
            <p>{transactions}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Revenue</p>
            <p className="text-primary">KSH {revenue.toLocaleString()}</p>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={onClick}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
