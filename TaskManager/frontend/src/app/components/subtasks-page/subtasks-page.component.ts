import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subtask } from '../../models/subtask';
import { SubtaskStatus } from '../../models/subtask-status';
import { SubtaskService } from '../../services/subtask.service';

@Component({
  selector: 'app-subtasks-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subtasks-page.component.html',
  styleUrls: ['./subtasks-page.component.css']
})
export class SubtasksPageComponent implements OnInit {
  subtasks: Subtask[] = [];
  public SubtaskStatus = SubtaskStatus;

  constructor(private subtaskService: SubtaskService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.subtaskService.getSubtasks().subscribe(data => (this.subtasks = data));
  }

  toggle(subtask: Subtask): void {
    const updatedStatus =
      subtask.status === SubtaskStatus.PENDING ? SubtaskStatus.COMPLETED : SubtaskStatus.PENDING;

    this.subtaskService.updateSubtask(subtask.id, { status: updatedStatus }).subscribe(() => {
      subtask.status = updatedStatus;
    });
  }

  delete(id: number): void {
    this.subtaskService.deleteSubtask(id).subscribe(() => {
      this.subtasks = this.subtasks.filter(s => s.id !== id);
    });
  }

  trackById(index: number, s: Subtask): number {
    return s.id;
  }
}
