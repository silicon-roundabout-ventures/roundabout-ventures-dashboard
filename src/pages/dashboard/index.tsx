import React, { useEffect } from "react";
import { navigate, Link } from "gatsby";
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
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h2 className="text-3xl font-bold text-white mb-4">Welcome to Silicon Roundabout Ventures</h2>
        <p className="text-srv-gray mb-8">
          Hi{user?.name ? `, ${user.name}` : ""}. This is private space for portfolio founders and LPs to access our
          network and resources.
        </p>

        <div className="border-2 border-white/20 rounded-lg p-6 bg-black/30 backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-white mb-2">VC Connections</h3>
          <p className="text-srv-gray text-sm mb-4">
            Browse deeptech investors in our network, including contact details, investment stages, and areas of focus.
          </p>
          <Link
            to="/dashboard/vc-connections"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-200 text-srv-dark font-medium text-sm rounded-md transition-colors"
          >
            Browse VC Connections
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
