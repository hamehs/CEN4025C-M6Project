import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Subtask } from '../models/subtask';

@Injectable({
  providedIn: 'root'
})
export class SubtaskService {
  private apiUrl = 'http://localhost:8080/subtasks';

  constructor(private http: HttpClient) {}

  getSubtasks(): Observable<Subtask[]> {
    return this.http.get<Subtask[]>(this.apiUrl);
  }

  getSubtasksByTaskId(taskId: number): Observable<Subtask[]> {
    // The backend no longer provides GET /subtasks/task/{taskId}.
    // Pull all subtasks and filter client-side.
    return this.getSubtasks().pipe(
      map(subtasks => subtasks.filter(s => s.taskId === taskId))
    );
  }

  getSubtaskById(id: number): Observable<Subtask> {
    return this.http.get<Subtask>(`${this.apiUrl}/${id}`);
  }

  createSubtask(subtask: Partial<Subtask>): Observable<Subtask> {
    return this.http.post<Subtask>(this.apiUrl, subtask);
  }

  updateSubtask(id: number, subtask: Partial<Subtask>): Observable<Subtask> {
    return this.http.put<Subtask>(`${this.apiUrl}/${id}`, subtask);
  }

  deleteSubtask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
