export interface Booking {
  id: number;
  user_id: number;
  service_id: number;
  booking_date: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
  user_name?: string;
  email?: string;
  service_name?: string;
  price?: number;
}

export interface BookingRequest {
  service_id: number;
  booking_date: string;
  status?: string;
}