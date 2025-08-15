import { create } from "zustand";
import type { User } from "@/types/types";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  imageURL: string;
  input: string;
  boxes: any[];
  signIn: (email: string, password: string) => Promise<User | null>;
  signOut: () => void;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<User | null>;
  updateUser: (user: User) => void;
  setImageURL: (url: string) => void;
  setInput: (value: string) => void;
  setBoxes: (boxes: any[]) => void;
  clearImageState: () => void;
}

const savedUser = localStorage.getItem("user");
const initialState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  isLoading: false,
};

export const useAuthStore = create<AuthState>((set) => ({
  ...initialState,
  imageURL: "",
  input: "",
  boxes: [],

  updateUser: (updatedUser: User) => {
    set({ user: updatedUser });
    localStorage.setItem("user", JSON.stringify(updatedUser));
  },

  setImageURL: (url: string) => set({ imageURL: url }),
  setInput: (value: string) => set({ input: value }),
  setBoxes: (boxes: any[]) => set({ boxes }),
  clearImageState: () => set({ imageURL: "", input: "", boxes: [] }),

  signIn: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const authData = await response.json();

      if (authData.user && authData.user.id) {
        set({ user: authData.user });
        localStorage.setItem("user", JSON.stringify(authData.user));
        localStorage.setItem("token", authData.token);
        return authData.user;
      }
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (name, email, password) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const authData = await response.json();

      if (authData.user && authData.user.id) {
        set({ user: authData.user });
        localStorage.setItem("user", JSON.stringify(authData.user));
        localStorage.setItem("token", authData.token);
        return authData.user;
      }
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: () => {
    set({ user: null });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },
}));
