import { useState, useEffect } from "react";
import type { User } from "@/types/types";

interface AuthProps {
  user: User | null;
  loadUser: (user: User) => void;
  signIn: (email: string, password: string) => Promise<User | null>;
  signOut: () => void;
  isLoading: boolean;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<User | null>;
}

export const useAuth = (): AuthProps => {
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const loadUser = (loadedUser: User) => {
    setUser(loadedUser);
    localStorage.setItem("user", JSON.stringify(loadedUser));
  };

  const signIn = async (
    email: string,
    password: string
  ): Promise<User | null> => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const userData: User = await response.json();

      if (userData.id) {
        loadUser(userData);
        return userData;
      }
      return null;
    } catch (error) {
      console.error("Error during sign in:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<User | null> => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const userData: User = await response.json();

      if (userData.id) {
        loadUser(userData);
        return userData;
      }
      return null;
    } catch (error) {
      console.error("Error during registration:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return { user, loadUser, signIn, register, signOut, isLoading: loading };
};
