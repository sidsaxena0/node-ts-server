export interface Task {
  ID: number;
  title: string;
  description: string;
  createdAt: Date;
  dueDate: Date;
  assignedTo: string;
  category: string;
  status: string;
}

export enum TaskStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}
