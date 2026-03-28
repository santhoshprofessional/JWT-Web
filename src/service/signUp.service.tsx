import { endpoints } from "../endpoints";
import type SignUp from "../pages/SignUp";

export const signUpService = async (data: SignUp) => {
  const res = await fetch(endpoints.user, {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};
