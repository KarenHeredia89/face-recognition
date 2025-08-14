import { useState } from "react";
import type { User } from "@/types/types";

export const useUser = (loadUser: (user: User) => void) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateUser = async (
    id: number,
    name: string,
    age: number
  ): Promise<User | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/profile/${id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ formInput: { name, age } }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user profile");
      }

      const updatedUser: User = await response.json();
      loadUser(updatedUser);

      return updatedUser;
    } catch (err) {
      setError("Error updating user profile. Please try again.");
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { updateUser, loading, error };
};
