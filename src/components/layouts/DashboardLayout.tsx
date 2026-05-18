import React from "react";
import { Link, navigate } from "gatsby";
import { useAuth } from "@/context/AuthContext";

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
    <div className="min-h-screen bg-srv-dark">
      <header className="border-b border-white/10">
        <div className="container mx-auto flex items-center justify-between h-14 px-4">
          <nav className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`text-sm font-medium transition-colors hover:text-white ${
                  activeItem === item.label
                    ? "text-white"
                    : "text-white/50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <span className="text-sm text-srv-gray">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="text-sm px-3 py-1.5 rounded-md border border-white/20 text-white hover:bg-white/10 transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default DashboardLayout;
