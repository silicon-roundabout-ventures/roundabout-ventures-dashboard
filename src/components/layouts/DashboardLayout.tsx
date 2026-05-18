import React from "react";
import { Link, navigate } from "gatsby";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/parts/button";

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeItem?: string;
}

const navItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "VC Connections", to: "/dashboard/vc-connections" },
];

const DashboardLayout = ({ children, activeItem }: DashboardLayoutProps) => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-input">
        <div className="container mx-auto flex items-center justify-between h-14 px-4">
          <nav className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`text-sm font-medium transition-colors hover:text-foreground ${
                  activeItem === item.label
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Sign out
            </Button>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default DashboardLayout;
