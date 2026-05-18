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
    <div className="min-h-screen flex items-center justify-center bg-srv-dark px-4">
      <div className="text-center space-y-2">
        {status === "verifying" ? (
          <>
            <p className="text-white font-medium">Verifying...</p>
            <p className="text-sm text-srv-gray">Please wait</p>
          </>
        ) : (
          <>
            <p className="text-srv-pink font-medium">Verification failed</p>
            <p className="text-sm text-srv-gray">Redirecting to login...</p>
          </>
        )}
      </div>
    </div>
  );
}
