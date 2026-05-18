import React, { useEffect, useState } from "react";
import { navigate } from "gatsby";
import { useAuth } from "@/context/AuthContext";

export default function VerifyPage() {
  const { verify } = useAuth();
  const [status, setStatus] = useState<"verifying" | "error">("verifying");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const code = params.get("code");

    if (!id || !code) {
      setStatus("error");
      return;
    }

    verify(id, code).then((ok) => {
      if (ok) {
        navigate("/dashboard");
      } else {
        setStatus("error");
        setTimeout(() => navigate("/login"), 3000);
      }
    });
  }, [verify]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center space-y-2">
        {status === "verifying" ? (
          <>
            <p className="text-foreground font-medium">Verifying...</p>
            <p className="text-sm text-muted-foreground">Please wait</p>
          </>
        ) : (
          <>
            <p className="text-destructive font-medium">Verification failed</p>
            <p className="text-sm text-muted-foreground">
              Redirecting to login...
            </p>
          </>
        )}
      </div>
    </div>
  );
}
