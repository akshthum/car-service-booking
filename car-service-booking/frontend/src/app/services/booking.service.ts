import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking, BookingRequest } from '../models/booking.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = `${environment.apiUrl}/bookings`;

  constructor(private http: HttpClient) {}

  getBookings(filters?: { status?: string; user_id?: number }): Observable<{ bookings: Booking[] }> {
    let params = new HttpParams();
    if (filters?.status) {
      params = params.set('status', filters.status);
    }
    if (filters?.user_id) {
      params = params.set('user_id', filters.user_id.toString());
    }
    
    return this.http.get<{ bookings: Booking[] }>(this.apiUrl, { params });
  }

  getUserBookings(): Observable<{ bookings: Booking[] }> {
    return this.http.get<{ bookings: Booking[] }>(`${this.apiUrl}/my-bookings`);
  }

  getBooking(id: number): Observable<{ booking: Booking }> {
    return this.http.get<{ booking: Booking }>(`${this.apiUrl}/${id}`);
  }

  createBooking(booking: BookingRequest): Observable<{ message: string; booking: Booking }> {
    return this.http.post<{ message: string; booking: Booking }>(this.apiUrl, booking);
  }

  updateBooking(id: number, booking: Partial<BookingRequest>): Observable<{ message: string; booking: Booking }> {
    return this.http.put<{ message: string; booking: Booking }>(`${this.apiUrl}/${id}`, booking);
  }

  deleteBooking(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}