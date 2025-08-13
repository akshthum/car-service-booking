export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number;
  created_at: string;
  updated_at: string;
}

export interface ServiceRequest {
  name: string;
  description: string;
  price: number;
  duration: number;
}