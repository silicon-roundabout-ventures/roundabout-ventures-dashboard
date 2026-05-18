import React, { useEffect } from "react";
import { navigate } from "gatsby";
import { useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/components/layouts/DashboardLayout";

export default function DashboardPage() {
  const { user, isLoading, isAuthenticated, checkSession } = useAuth();

  useEffect(() => {
    checkSession().then((u) => {
      if (!u) navigate("/login");
    });
  }, [checkSession]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-srv-dark">
        <p className="text-srv-gray">Loading...</p>
      </div>
    );
  }

  return (
    <DashboardLayout activeItem="Dashboard">
      <div className="container mx-auto px-4 py-12">
        <p className="text-srv-gray">Welcome, {user?.name || user?.email}.</p>
      </div>
    </DashboardLayout>
  );
}
