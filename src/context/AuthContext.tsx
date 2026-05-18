import React, { createContext, useContext, useState, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  fetchMe,
  sendMagicLink,
  verifyMagicLink,
  logoutUser,
  type User,
} from "@/services/auth-api";

type AuthContextValue = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  checkSession: () => Promise<User | null>;
  login: (email: string) => Promise<void>;
  verify: (xid: string, code: string) => Promise<boolean>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const checkSession = useCallback(async () => {
    setIsLoading(true);
    try {
      const u = await fetchMe();
      setUser(u);
      return u;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string) => {
    await sendMagicLink(email);
  }, []);

  const verify = useCallback(
    async (xid: string, code: string) => {
      const ok = await verifyMagicLink(xid, code);
      if (ok) {
        await checkSession();
      }
      return ok;
    },
    [checkSession]
  );

  const logout = useCallback(async () => {
    await logoutUser();
    setUser(null);
    queryClient.clear();
  }, [queryClient]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        checkSession,
        login,
        verify,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
