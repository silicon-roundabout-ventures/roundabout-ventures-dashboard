import React, { useEffect } from "react";
import { navigate } from "gatsby";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import InvestorDirectory from "@/components/widgets/InvestorDirectory";
import { fetchVCInvestors } from "@/services/vc-investors-api";

export default function VCConnectionsPage() {
  const { isLoading: authLoading, isAuthenticated, checkSession } = useAuth();

  useEffect(() => {
    checkSession().then((u) => {
      if (!u) navigate("/login");
    });
  }, [checkSession]);

  const {
    data: investors,
    isLoading: investorsLoading,
    error,
  } = useQuery({
    queryKey: ["vc-investors"],
    queryFn: fetchVCInvestors,
    enabled: isAuthenticated,
  });

  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <DashboardLayout activeItem="VC Connections">
      <div className="container mx-auto px-4 py-8">
        {investorsLoading && (
          <p className="text-muted-foreground">Loading investors...</p>
        )}
        {error && (
          <p className="text-destructive">Failed to load investors. Please try again.</p>
        )}
        {investors && (
          <InvestorDirectory
            investors={investors}
            showContacts
            headerSlot={
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground mb-2">VC Connections</h1>
                <p className="text-sm text-muted-foreground">
                  Browse deeptech investors in our network, including contact details.
                </p>
              </div>
            }
          />
        )}
      </div>
    </DashboardLayout>
  );
}
