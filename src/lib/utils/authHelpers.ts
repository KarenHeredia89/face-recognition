import { ZodError, z } from "zod";

type FormErrors = Record<string, string>;

/**
 * Validates data and processes API response errors.
 * @param schema The Zod schema for validation.
 * @param data The data to be validated.
 * @param apiCall The async function that makes the API call.
 */

export async function processAuth<T>(
  schema: z.ZodSchema<T>,
  data: T,
  apiCall: (data: T) => Promise<Response>
): Promise<{ success: boolean; errors?: FormErrors }> {
  const validation = schema.safeParse(data);

  if (!validation.success) {
    const newErrors: FormErrors = {};
    (validation.error as ZodError).issues.forEach((err) => {
      const field = err.path[0] as string;
      newErrors[field] = err.message;
    });
    return { success: false, errors: newErrors };
  }

  try {
    const response = await apiCall(data);
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { message: "An unknown error occurred. Please try again." };
      }

      const newErrors: FormErrors = {};
      if (errorData.errors) {
        errorData.errors.forEach((err: any) => {
          const field = err.path[0];
          newErrors[field] = err.message;
        });
      } else if (errorData.message) {
        newErrors.general = errorData.message;
      } else {
        newErrors.general = "An unknown error occurred. Please try again.";
      }
      return { success: false, errors: newErrors };
    }

    return { success: true, errors: undefined };
  } catch (e) {
    console.error("API call failed:", e);
    return {
      success: false,
      errors: { general: "Network error. Please try again." },
    };
  }
}
