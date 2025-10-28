import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  trend?: "up" | "down";
  className?: string;
}

export function StatsCard({ title, value, change, icon: Icon, trend, className }: StatsCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-muted-foreground text-sm">{title}</CardTitle>
        <Icon className="w-5 h-5 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-foreground">{value}</div>
        {change && (
          <p className={`text-sm mt-1 ${trend === "up" ? "text-primary" : "text-destructive"}`}>
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
