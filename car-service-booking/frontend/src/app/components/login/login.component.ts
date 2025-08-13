import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  template: `
    <div style="max-width: 400px; margin: 50px auto; padding: 20px; border: 1px solid #ddd;">
      <h2>Car Service Login</h2>
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <div style="margin-bottom: 15px;">
          <label>Email:</label>
          <input type="email" formControlName="email" style="width: 100%; padding: 8px;" placeholder="admin@test.com">
        </div>
        <div style="margin-bottom: 15px;">
          <label>Password:</label>
          <input type="password" formControlName="password" style="width: 100%; padding: 8px;" placeholder="password">
        </div>
        <button type="submit" [disabled]="loading" style="width: 100%; padding: 10px; background: #007bff; color: white; border: none;">
          {{loading ? 'Logging in...' : 'Login'}}
        </button>
      </form>
      <div *ngIf="message" [style.color]="success ? 'green' : 'red'" style="margin-top: 15px;">
        {{message}}
      </div>
      <p style="margin-top: 20px; text-align: center;">
        Test credentials:<br>
        Email: admin&#64;test.com<br>
        Password: password
      </p>
    </div>
  `
})
export class LoginComponent {
  loginForm: FormGroup;
  message = '';
  loading = false;
  success = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.loginForm = this.fb.group({
      email: ['admin@test.com', [Validators.required, Validators.email]],
      password: ['password', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.message = '';
      
      this.http.post('http://localhost:5000/api/auth/login', this.loginForm.value)
        .subscribe({
          next: (response: any) => {
            this.success = true;
            this.message = 'Login successful! Redirecting...';
            localStorage.setItem('token', response.token);
            this.loading = false;
            setTimeout(() => {
              window.location.href = '/dashboard';
            }, 1000);
          },
          error: (error) => {
            this.success = false;
            this.message = error.error?.error || 'Login failed. Check backend server.';
            this.loading = false;
          }
        });
    } else {
      this.message = 'Please fill all fields correctly';
    }
  }
}