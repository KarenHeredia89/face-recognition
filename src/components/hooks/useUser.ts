import { useState } from "react";
import type { User } from "@/types/types";
import { useAuthStore } from "@/store/authStore";

export const useUser = () => {
  const { updateUser } = useAuthStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateUserProfile = async (
    id: number,
    name: string,
    age: number
  ): Promise<User | null> => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/profile/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ formInput: { name, age } }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user profile");
      }

      const updatedUser: User = await response.json();
      updateUser(updatedUser);

      return updatedUser;
    } catch (err) {
      setError("Error updating user profile. Please try again.");
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { updateUserProfile, loading, error };
};
