import { Injectable } from '@angular/core';

/**
 * Mock auth service for Module 4.
 * Stores a fake token in localStorage to simulate an authenticated session.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'tm_auth_token';
  private readonly USERNAME_KEY = 'tm_auth_username';

  login(username: string, password: string): boolean {
    // Mock authentication: accept any non-empty username/password
    if (!username?.trim() || !password?.trim()) {
      return false;
    }

    // Store a mock token so the interceptor can attach it
    localStorage.setItem(this.TOKEN_KEY, 'mock-token');
    localStorage.setItem(this.USERNAME_KEY, username.trim());
    return true;
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USERNAME_KEY);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUsername(): string | null {
    return localStorage.getItem(this.USERNAME_KEY);
  }
}
