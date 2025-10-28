import { Card, CardContent } from "./ui/card";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { StatusBadge } from "./StatusBadge";

interface TransactionCardProps {
  id: string;
  type: "incoming" | "outgoing";
  amount: number;
  currency?: string;
  description: string;
  date: string;
  status: "pending" | "approved" | "rejected" | "completed";
  onClick?: () => void;
}

export function TransactionCard({
  id,
  type,
  amount,
  currency = "KSH",
  description,
  date,
  status,
  onClick,
}: TransactionCardProps) {
  const isIncoming = type === "incoming";

  return (
    <Card
      className="hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-4 flex items-center gap-4">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isIncoming ? "bg-[#D1FAE5]" : "bg-[#FEE2E2]"
          }`}
        >
          {isIncoming ? (
            <ArrowDownLeft className="w-5 h-5 text-[#00B050]" />
          ) : (
            <ArrowUpRight className="w-5 h-5 text-destructive" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="truncate">{description}</p>
          <p className="text-muted-foreground text-sm">{date}</p>
        </div>

        <div className="text-right">
          <p className={isIncoming ? "text-[#00B050]" : "text-foreground"}>
            {isIncoming ? "+" : "-"}{currency} {amount.toLocaleString()}
          </p>
          <StatusBadge status={status} className="mt-1" />
        </div>
      </CardContent>
    </Card>
  );
}
