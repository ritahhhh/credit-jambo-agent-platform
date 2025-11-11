import { LayoutDashboard, Wallet, Users, TrendingUp, Settings, LogOut } from "lucide-react";
import { Button } from "./ui/button";

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "wallet", label: "Wallet", icon: Wallet },
    { id: "transactions", label: "Transactions", icon: TrendingUp },
    { id: "merchants", label: "Merchants", icon: Users },
    { id: "commissions", label: "Commissions", icon: TrendingUp },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-border bg-card h-screen flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-primary">WalletIQ</h1>
        <p className="text-muted-foreground text-sm mt-1">Agent Wallet</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start gap-3 ${
                isActive 
                  ? "bg-primary text-white hover:bg-primary-hover" 
                  : "text-foreground hover:bg-muted"
              }`}
              onClick={() => onNavigate(item.id)}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Button>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-border">
        <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:bg-destructive/10">
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
