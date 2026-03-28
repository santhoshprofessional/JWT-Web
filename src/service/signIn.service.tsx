import { endpoints } from "../endpoints";
import type { SignIn } from "../types/signIn.types";

export const signInService = async (data: SignIn) => {
  const response = await fetch(endpoints.auth, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};
