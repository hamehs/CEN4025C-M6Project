export interface User {
    id: number;
    username: string;
    email: string;
    password: string; 
    taskIds: number[];  // number[] matches Java's Set<Integer>
  }