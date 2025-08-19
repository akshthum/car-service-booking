import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  services: any[] = [
    { id: 1, name: 'Oil Change', description: 'Complete oil and filter replacement', price: 49.99, duration: 30 },
    { id: 2, name: 'Brake Inspection', description: 'Comprehensive brake system check', price: 79.99, duration: 45 },
    { id: 3, name: 'Tire Rotation', description: 'Rotate and balance all four tires', price: 39.99, duration: 20 }
  ];

  bookings: any[] = [
    { id: 1, serviceName: 'Oil Change', datetime: '2024-01-15 10:00 AM', status: 'pending', notes: 'Regular maintenance' },
    { id: 2, serviceName: 'Brake Inspection', datetime: '2024-01-16 2:00 PM', status: 'confirmed', notes: 'Urgent check needed' }
  ];

  newService = { name: '', description: '', price: 0, duration: 0 };
  newBooking = { serviceId: '', datetime: '', notes: '' };
  searchTerm = '';
  message = '';
  success = false;

  constructor(private http: HttpClient) {}

  addService() {
    if (this.newService.name && this.newService.price > 0) {
      const service = {
        id: this.services.length + 1,
        ...this.newService
      };
      this.services.push(service);
      this.newService = { name: '', description: '', price: 0, duration: 0 };
      this.showMessage('Service added successfully!', true);
    }
  }

  bookService() {
    if (this.newBooking.serviceId && this.newBooking.datetime) {
      const service = this.services.find(s => s.id == this.newBooking.serviceId);
      const booking = {
        id: this.bookings.length + 1,
        serviceName: service?.name || 'Unknown Service',
        datetime: new Date(this.newBooking.datetime).toLocaleString(),
        status: 'pending',
        notes: this.newBooking.notes
      };
      this.bookings.push(booking);
      this.newBooking = { serviceId: '', datetime: '', notes: '' };
      this.showMessage('Service booked successfully!', true);
    }
  }

  deleteService(service: any) {
    if (confirm('Are you sure you want to delete this service?')) {
      const index = this.services.indexOf(service);
      if (index > -1) {
        this.services.splice(index, 1);
        this.showMessage('Service deleted successfully!', true);
      }
    }
  }

  cancelBooking(booking: any) {
    if (confirm('Are you sure you want to cancel this booking?')) {
      booking.status = 'cancelled';
      this.showMessage('Booking cancelled successfully!', true);
    }
  }

  getFilteredServices() {
    if (!this.searchTerm) return this.services;
    return this.services.filter(service => 
      service.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'pending': return '#ffc107';
      case 'confirmed': return '#28a745';
      case 'completed': return '#17a2b8';
      case 'cancelled': return '#dc3545';
      default: return '#6c757d';
    }
  }

  showMessage(msg: string, isSuccess: boolean) {
    this.message = msg;
    this.success = isSuccess;
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
}