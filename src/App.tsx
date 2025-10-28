import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { TopBar } from "./components/TopBar";
import { LoginPage } from "./components/pages/LoginPage";
import { KYCPage } from "./components/pages/KYCPage";
import { DashboardPage } from "./components/pages/DashboardPage";
import { WalletPage } from "./components/pages/WalletPage";
import { TransactionsPage } from "./components/pages/TransactionsPage";
import { MerchantsPage } from "./components/pages/MerchantsPage";
import { CommissionsPage } from "./components/pages/CommissionsPage";
import { Toaster } from "./components/ui/sonner";

type AppFlow = "login" | "kyc" | "app";
type Page = "dashboard" | "wallet" | "transactions" | "merchants" | "commissions" | "settings";

export default function App() {
  const [flow, setFlow] = useState<AppFlow>("login");
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");
  const [darkMode, setDarkMode] = useState(false);

  const handleLogin = () => {
    setFlow("kyc");
  };

  const handleKYCComplete = () => {
    setFlow("app");
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Login Flow
  if (flow === "login") {
    return (
      <>
        <LoginPage onLogin={handleLogin} />
        <Toaster />
      </>
    );
  }

  // KYC Flow
  if (flow === "kyc") {
    return (
      <>
        <KYCPage onComplete={handleKYCComplete} />
        <Toaster />
      </>
    );
  }

  // Main Application
  return (
    <div className="flex h-screen bg-background">
      <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
        
        <main className="flex-1 overflow-y-auto bg-muted/30">
          {currentPage === "dashboard" && <DashboardPage />}
          {currentPage === "wallet" && <WalletPage />}
          {currentPage === "transactions" && <TransactionsPage />}
          {currentPage === "merchants" && <MerchantsPage />}
          {currentPage === "commissions" && <CommissionsPage />}
          {currentPage === "settings" && (
            <div className="p-6">
              <h1>Settings</h1>
              <p className="text-muted-foreground">Manage your account settings and preferences</p>
            </div>
          )}
        </main>
      </div>
      
      <Toaster />
    </div>
  );
}
