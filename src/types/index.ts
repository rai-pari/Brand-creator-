export type Platform = 'facebook' | 'instagram' | 'linkedin' | 'web';
export type TaskType = 'research' | 'branding' | 'cold-emails';

export interface User {
  email: string;
  name: string;
}

export interface Task {
  id: string;
  platform: Platform;
  type: TaskType;
  description: string;
  status: 'pending' | 'processing' | 'completed';
  createdAt: Date;
}