import { SubtaskStatus } from './subtask-status';

export interface Subtask {
    id: number;
    title: string;
    status: SubtaskStatus; // Enum type for status
    taskId: number; // Reference to the parent Task
  }
  