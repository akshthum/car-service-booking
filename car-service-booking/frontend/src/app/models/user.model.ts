export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  created_at: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}