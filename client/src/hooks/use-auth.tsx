import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "@shared/models/auth";
import { onAuthStateChanged, signOut } from "firebase/auth";
// @ts-ignore
import { auth } from "../firebase";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  isLoggingOut: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email || "",
          firstName: firebaseUser.displayName?.split(" ")[0] || firebaseUser.email?.split("@")[0] || "User",
          lastName: firebaseUser.displayName?.split(" ").slice(1).join(" ") || "",
          profileImageUrl: firebaseUser.photoURL || null,
          createdAt: new Date(firebaseUser.metadata.creationTime || Date.now()),
          updatedAt: new Date(),
        } as User);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, logout, isLoggingOut: false }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
