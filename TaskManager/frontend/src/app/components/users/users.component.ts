import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngFor and *ngIf
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule], // Include CommonModule in the imports array
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = []; // Array to store the list of users

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers(); // Fetch users when the component initializes
  }

  // Fetch all users
  loadUsers(): void {
    this.userService.getUsers().subscribe(data => {
      console.log("loading users");
      this.users = data;
    });
  }

  // Add a new user
  addUser(): void {
    const newUser: Partial<User> = {
      username: 'newuser', // Replace with user input
      email: 'newuser@example.com', // Replace with user input
      password: 'password123', // Replace with user input
      taskIds: [] // Default empty list
    };

    this.userService.createUser(newUser).subscribe(user => {
      this.users.push(user); // Add the new user to the list
    });
  }

  // Delete a user
  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(user => user.id !== id); // Update the list locally
    });
  }

  // Update an existing user
  updateUser(id: number): void {
    const updatedUser: Partial<User> = {
      username: 'updateduser', // Replace with updated user input
      email: 'updateduser@example.com', // Replace with updated user input
      password: 'newpassword123', // Replace with updated user input
      taskIds: [1, 2, 3] // Example task IDs
    };

    this.userService.updateUser(id, updatedUser).subscribe(user => {
      const index = this.users.findIndex(u => u.id === user.id);
      if (index > -1) {
        this.users[index] = user; // Update the user in the list
      }
    });
  }
}
