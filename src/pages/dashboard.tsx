import React, { useEffect } from "react";
import { navigate } from "gatsby";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/parts/button";

export default function DashboardPage() {
  const { user, isLoading, isAuthenticated, checkSession, logout } = useAuth();

  useEffect(() => {
    checkSession().then((u) => {
      if (!u) navigate("/login");
    });
  }, [checkSession]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-input">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <h1 className="text-lg font-semibold text-foreground">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Sign out
            </Button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-12">
        <p className="text-muted-foreground">Welcome, {user?.name || user?.email}.</p>
      </main>
    </div>
  );
}
