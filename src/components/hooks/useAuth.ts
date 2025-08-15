import { useAuthStore } from "@/store/authStore";

export const useAuth = () => {
  const { user, isLoading, signIn, signOut, register } = useAuthStore();

  return { user, signIn, register, signOut, isLoading };
};
