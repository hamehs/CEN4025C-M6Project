import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { UsersComponent } from './components/users/users.component';
import { SubtasksPageComponent } from './components/subtasks-page/subtasks-page.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  // Protected routes
  { path: 'tasks', component: TasksComponent, canActivate: [authGuard] },
  { path: 'users', component: UsersComponent, canActivate: [authGuard] },
  { path: 'subtasks', component: SubtasksPageComponent, canActivate: [authGuard] },

  // Default + fallback
  { path: '', pathMatch: 'full', redirectTo: 'tasks' },
  { path: '**', redirectTo: 'tasks' }
];
