import { apiRequest } from "./client";

export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string | null;
  tokenType: string;
  userId: number;
  role: string;
}
export interface SignupRequest {
  fullName: string;
  phone: string;
  email: string | null;
  password: string;
}

export const logoutUser = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userId");
  localStorage.removeItem("role");
  localStorage.removeItem("identifier");
};
export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await fetch("http://localhost:8080/api/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || "Login failed");
  }

  return response.json();
};
export const signupUser = (payload: SignupRequest) => {
  return apiRequest("/customers/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
