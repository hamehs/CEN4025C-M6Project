import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { SubtasksComponent } from '../subtasks/subtasks.component'; // Import SubtasksComponent

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, SubtasksComponent], // Add SubtasksComponent to imports
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(data => (this.tasks = data));
  }

  addTask(taskTitle: string): void {
    if (taskTitle.trim()) {
      const newTask: Partial<Task> = { title: taskTitle };
      this.taskService.createTask(newTask).subscribe(createdTask => {
        this.tasks.push(createdTask);
      });
    }
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
    });
  }

  trackById(index: number, task: Task): number {
    return task.id;
  }
}
