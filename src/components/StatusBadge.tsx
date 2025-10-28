import { Badge } from "./ui/badge";

type Status = "pending" | "approved" | "rejected" | "completed" | "active" | "inactive" | "verified";

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const variants: Record<Status, { label: string; color: string }> = {
    pending: { label: "Pending", color: "bg-[#FEF3C7] dark:bg-[#92400E]/20 text-[#92400E] dark:text-[#FEF3C7] border-[#FDE68A] dark:border-[#92400E]" },
    approved: { label: "Approved", color: "bg-primary/10 dark:bg-primary/20 text-[#065F46] dark:text-primary border-primary/30 dark:border-primary/50" },
    rejected: { label: "Rejected", color: "bg-[#FEE2E2] dark:bg-[#991B1B]/20 text-[#991B1B] dark:text-[#FEE2E2] border-[#FECACA] dark:border-[#991B1B]" },
    completed: { label: "Completed", color: "bg-primary/10 dark:bg-primary/20 text-[#065F46] dark:text-primary border-primary/30 dark:border-primary/50" },
    active: { label: "Active", color: "bg-primary/10 dark:bg-primary/20 text-[#065F46] dark:text-primary border-primary/30 dark:border-primary/50" },
    inactive: { label: "Inactive", color: "bg-muted text-muted-foreground border-border" },
    verified: { label: "Verified", color: "bg-[#DBEAFE] dark:bg-[#1E40AF]/20 text-[#1E40AF] dark:text-[#DBEAFE] border-[#BFDBFE] dark:border-[#1E40AF]" },
  };

  const variant = variants[status];

  return (
    <Badge className={`${variant.color} border ${className || ""}`} variant="outline">
      {variant.label}
    </Badge>
  );
}
