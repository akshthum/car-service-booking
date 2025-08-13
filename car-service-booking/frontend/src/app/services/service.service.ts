import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service, ServiceRequest } from '../models/service.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = `${environment.apiUrl}/services`;

  constructor(private http: HttpClient) {}

  getServices(): Observable<{ services: Service[] }> {
    return this.http.get<{ services: Service[] }>(this.apiUrl);
  }

  getService(id: number): Observable<{ service: Service }> {
    return this.http.get<{ service: Service }>(`${this.apiUrl}/${id}`);
  }

  createService(service: ServiceRequest): Observable<{ message: string; service: Service }> {
    return this.http.post<{ message: string; service: Service }>(this.apiUrl, service);
  }

  updateService(id: number, service: ServiceRequest): Observable<{ message: string; service: Service }> {
    return this.http.put<{ message: string; service: Service }>(`${this.apiUrl}/${id}`, service);
  }

  deleteService(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}