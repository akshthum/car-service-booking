import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  serviceName = '';
  servicePrice = 0;
  services: any[] = [
    { name: 'Oil Change', price: 49.99 },
    { name: 'Brake Check', price: 79.99 }
  ];

  addService() {
    if (this.serviceName && this.servicePrice > 0) {
      this.services.push({
        name: this.serviceName,
        price: this.servicePrice
      });
      this.serviceName = '';
      this.servicePrice = 0;
    }
  }

  deleteService(service: any) {
    const index = this.services.indexOf(service);
    if (index > -1) {
      this.services.splice(index, 1);
    }
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
}