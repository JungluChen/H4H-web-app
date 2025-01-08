export interface Task {
  id: string;
  title: string;
  category: string;
  price: number;
  time: string;
  location: string;
  description: string;
  postedBy: string;
  language: string;
  flag: string;
  coordinates: { lat: number; lng: number };
  status: string;
}

export interface Chat {
  id: string;
  message: string;
  sender: string;
  timestamp: string;
  taskTitle: string;
  language: string;
  unreadCount: number;
}

export interface TopList {
  title: string;
  date: string;
  items: string[];
  thumbnail: string;
  category?: string;
  locations?: { name: string; coordinates: { lat: number; lng: number } }[];
}

export interface Achievement {
  title: string;
  description: string;
  progress: number;
  reward: number;
  icon: string;
  id: string;
}

export interface UserProfile {
  name: string;
  wallet: number;
  achievements: Achievement[];
  taskHistory: Task[];
  rating: number;
} 