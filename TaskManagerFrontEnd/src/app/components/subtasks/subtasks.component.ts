import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subtask } from '../../models/subtask';
import { SubtaskService } from '../../services/subtask.service';
import { SubtaskStatus } from '../../models/subtask-status'; // Import the Enum

@Component({
  selector: 'app-subtasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subtasks.component.html',
  styleUrls: ['./subtasks.component.css']
})
export class SubtasksComponent implements OnInit {
  @Input() taskId!: number;
  subtasks: Subtask[] = [];
  public SubtaskStatus = SubtaskStatus; // Expose Enum to Template

  constructor(private subtaskService: SubtaskService) {}

  ngOnInit(): void {
    if (this.taskId) {
      this.loadSubtasks();
    }
  }

  loadSubtasks(): void {
    this.subtaskService.getSubtasksByTaskId(this.taskId).subscribe(data => {
      this.subtasks = data;
    });
  }

  addSubtask(title: string): void {
    if (title.trim()) {
      const newSubtask: Partial<Subtask> = {
        title,
        status: SubtaskStatus.PENDING, // ✅ FIXED: Use PENDING instead of TODO
        taskId: this.taskId
      };

      this.subtaskService.createSubtask(newSubtask).subscribe(createdSubtask => {
        this.subtasks.push(createdSubtask);
      });
    }
  }

  toggleSubtaskStatus(subtask: Subtask): void {
    const updatedStatus =
      subtask.status === SubtaskStatus.PENDING ? SubtaskStatus.COMPLETED : SubtaskStatus.PENDING;

    this.subtaskService.updateSubtask(subtask.id, { status: updatedStatus }).subscribe(() => {
      subtask.status = updatedStatus;
    });
  }

  deleteSubtask(id: number): void {
    this.subtaskService.deleteSubtask(id).subscribe(() => {
      this.subtasks = this.subtasks.filter(subtask => subtask.id !== id);
    });
  }
}
