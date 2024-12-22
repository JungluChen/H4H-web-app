export interface Task {
  id: string;
  title: string;
  category: string;
  price: number;
  time: string;
  location: string;
  description: string;
  postedBy: string;
  status: 'open' | 'in-progress' | 'completed';
  language: string;
  flag: string;
}

export interface ChatMessage {
  id: string;
  sender: string;
  taskTitle: string;
  message: string;
  timestamp: string;
  unreadCount: number;
}

export interface Achievement {
  title: string;
  description: string;
  progress: number;
  reward: number;
  icon: string;
}

export interface TopList {
  title: string;
  date: string;
  items: string[];
}

export interface UserProfile {
  name: string;
  wallet: number;
  achievements: Achievement[];
  taskHistory: Task[];
  rating: number;
} 