// Auth API types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token?: string; // JWT Token
  user?: {
    id: number;
    username: string;
  };
}

export interface SessionUser {
  e_id: number;
  f_name: string;
  l_name: string;
  e_role: string;
  e_username: string;
  e_email: string;
  e_phone: string;
  e_photo: string;
  e_active: boolean;
  e_address: string;
  e_city: string;
  e_country: string;
  e_zipcode: string;
  e_gender: string;
  birth_date: string;
  salary: number;
}

export interface SessionResponse {
  success: boolean;
  message?: string;
  user?: SessionUser;
}

export interface ChangePasswordRequest {
  username: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
  E_ID?: number;
  F_NAME?: string;
  L_NAME?: string;
  E_ROLE?: string;
}

export interface RegisterRequest {
  f_name: string;
  l_name: string;
  e_email?: string;
  e_phone?: string;
  e_username: string;
  e_password: string;
  e_role?: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  newEmployee?: {
    e_id: number;
    f_name: string;
    l_name: string;
  };
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

import { API_BASE_URL } from "@src/config/api";

const AUTH_URL = `${API_BASE_URL}/auth`;
const EMPLOYEES_URL = `${API_BASE_URL}/employees`;

// Auth API functions
export const authApi = {
  // Login user
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await fetch(`${AUTH_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // credentials: "include", // Removed for JWT
      body: JSON.stringify(data),
    });
    const result = await response.json();

    // Store token if login successful
    if (result.success && result.token) {
      localStorage.setItem("authToken", result.token);
    }

    return result;
  },

  // Logout user
  logout: async (): Promise<LogoutResponse> => {
    localStorage.removeItem("authToken"); // Clear token locally
    const response = await fetch(`${AUTH_URL}/logout`, {
      method: "GET",
    });
    return response.json();
  },

  // Get current session
  getSession: async (): Promise<SessionResponse> => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      return { success: false, message: "No token found" };
    }

    const response = await fetch(`${AUTH_URL}/session`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },

  // Change/reset password
  changePassword: async (
    data: ChangePasswordRequest,
  ): Promise<ChangePasswordResponse> => {
    const token = localStorage.getItem("authToken");
    const response = await fetch(`${AUTH_URL}/changepassword`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // Register new employee
  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const token = localStorage.getItem("authToken");
    const response = await fetch(`${EMPLOYEES_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...data,
        username: data.e_username, // Backend expects 'username' for duplicate check
      }),
    });
    return response.json();
  },
};
