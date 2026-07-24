import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit(): void {
    this.errorMessage = '';
    const ok = this.auth.login(this.username, this.password);
    if (!ok) {
      this.errorMessage = 'Please enter a username and password.';
      return;
    }
    this.router.navigate(['/tasks']);
  }
}
