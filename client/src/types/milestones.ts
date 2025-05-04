export interface Milestone {
  id: number;
  title: string;
  description?: string;
  dateReached?: string;
  targetDate?: string;
  iconName?: string;
  order: number;
  completed: boolean;
  progress: number;
  color: string;
  updatedAt: string;
}