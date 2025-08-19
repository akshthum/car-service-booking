import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  template: `
    <div style="min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; padding: 20px;">
      <div style="background: white; padding: 40px; border-radius: 10px; box-shadow: 0 15px 35px rgba(0,0,0,0.1); width: 100%; max-width: 400px;">
        
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #333; margin: 0; font-size: 28px; font-weight: 300;">Car Service</h1>
          <p style="color: #666; margin: 10px 0 0 0; font-size: 16px;">Sign in to your account</p>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div style="margin-bottom: 20px;">
            <label style="display: block; margin-bottom: 8px; color: #555; font-weight: 500;">Email Address</label>
            <input 
              type="email" 
              formControlName="email" 
              placeholder="Enter your email"
              style="width: 100%; padding: 12px 16px; border: 2px solid #e1e5e9; border-radius: 8px; font-size: 14px; transition: border-color 0.3s; outline: none;"
              [style.border-color]="loginForm.get('email')?.invalid && loginForm.get('email')?.touched ? '#e74c3c' : '#e1e5e9'">
            <div *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched" 
                 style="color: #e74c3c; font-size: 12px; margin-top: 5px;">
              Please enter a valid email address
            </div>
          </div>

          <div style="margin-bottom: 25px;">
            <label style="display: block; margin-bottom: 8px; color: #555; font-weight: 500;">Password</label>
            <input 
              type="password" 
              formControlName="password" 
              placeholder="Enter your password"
              style="width: 100%; padding: 12px 16px; border: 2px solid #e1e5e9; border-radius: 8px; font-size: 14px; transition: border-color 0.3s; outline: none;"
              [style.border-color]="loginForm.get('password')?.invalid && loginForm.get('password')?.touched ? '#e74c3c' : '#e1e5e9'">
            <div *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched" 
                 style="color: #e74c3c; font-size: 12px; margin-top: 5px;">
              Password is required
            </div>
          </div>

          <button 
            type="submit" 
            [disabled]="loading || loginForm.invalid"
            style="width: 100%; padding: 14px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: 500; cursor: pointer; transition: transform 0.2s; outline: none;"
            [style.opacity]="loading || loginForm.invalid ? '0.6' : '1'"
            [style.cursor]="loading || loginForm.invalid ? 'not-allowed' : 'pointer'">
            <span *ngIf="!loading">Sign In</span>
            <span *ngIf="loading" style="display: flex; align-items: center; justify-content: center;">
              <span style="width: 16px; height: 16px; border: 2px solid #ffffff; border-top: 2px solid transparent; border-radius: 50%; animation: spin 1s linear infinite; margin-right: 8px;"></span>
              Signing in...
            </span>
          </button>
        </form>

        <div *ngIf="message" 
             [style.background]="success ? '#d4edda' : '#f8d7da'"
             [style.color]="success ? '#155724' : '#721c24'"
             [style.border]="success ? '1px solid #c3e6cb' : '1px solid #f5c6cb'"
             style="margin-top: 20px; padding: 12px 16px; border-radius: 6px; font-size: 14px; text-align: center;">
          {{message}}
        </div>

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e1e5e9;">
          <p style="color: #666; font-size: 14px; margin: 0;">
            Don't have an account? 
            <a href="#" style="color: #667eea; text-decoration: none; font-weight: 500;">Sign up</a>
          </p>
        </div>

      </div>
    </div>

    <style>
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      button:hover:not(:disabled) {
        transform: translateY(-2px);
      }
      
      input:focus {
        border-color: #667eea !important;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      }
    </style>
  `
})
export class LoginComponent {
  loginForm: FormGroup;
  message = '';
  loading = false;
  success = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
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
            this.message = 'Login successful! Redirecting to dashboard...';
            localStorage.setItem('token', response.token);
            this.loading = false;
            
            setTimeout(() => {
              window.location.href = '/dashboard';
            }, 1500);
          },
          error: (error) => {
            this.success = false;
            this.message = error.error?.error || 'Login failed. Please check your credentials and try again.';
            this.loading = false;
          }
        });
    } else {
      this.success = false;
      this.message = 'Please fill all fields correctly';
    }
  }
}