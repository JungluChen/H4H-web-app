import { Task, ChatMessage, Achievement, TopList, UserProfile } from '../types';

export const dummyTasks: Task[] = [
  {
    id: '1',
    title: 'Opening Bank Account',
    category: 'Finance',
    price: 50,
    time: 'Mon, Wed 14:00-16:00',
    location: 'Tokyo, Japan',
    description: 'Need help opening a bank account at MUFG Bank. Must be fluent in Japanese.',
    postedBy: 'John Smith',
    language: 'Japanese',
    flag: 'jp',
    status: 'open'
  },
  {
    id: '2',
    title: 'Phone Contract Translation',
    category: 'Telecom',
    price: 40,
    time: 'Tue, Thu 10:00-12:00',
    location: 'Osaka, Japan',
    description: 'Need assistance with translating and setting up a phone contract at Softbank.',
    postedBy: 'Emma Wilson',
    language: 'Japanese',
    flag: 'jp',
    status: 'open'
  },
  {
    id: '3',
    title: 'Apartment Viewing Support',
    category: 'Housing',
    price: 60,
    time: 'Weekends 13:00-17:00',
    location: 'Yokohama, Japan',
    description: 'Looking for someone to help with apartment viewing and translation.',
    postedBy: 'Michael Brown',
    language: 'Japanese',
    flag: 'jp',
    status: 'open'
  },
  {
    id: '4',
    title: 'City Office Documentation',
    category: 'Government',
    price: 45,
    time: 'Mon-Fri 9:00-11:00',
    location: 'Kyoto, Japan',
    description: 'Need help with residence registration at city office.',
    postedBy: 'Sarah Davis',
    language: 'Japanese',
    flag: 'jp',
    status: 'open'
  },
  {
    id: '5',
    title: 'School Enrollment Assistance',
    category: 'Education',
    price: 55,
    time: 'Wed, Fri 15:00-17:00',
    location: 'Sapporo, Japan',
    description: 'Need help enrolling child in local elementary school.',
    postedBy: 'David Lee',
    language: 'Japanese',
    flag: 'jp',
    status: 'open'
  },
  // Add more tasks as needed
];

export const dummyChats: ChatMessage[] = [
  {
    id: '1',
    sender: 'John Doe',
    taskTitle: 'Help with Moving',
    message: 'Hey, I can help you next Monday',
    timestamp: '10:30 AM',
    unreadCount: 2
  },
  {
    id: '2',
    sender: 'Jane Smith',
    taskTitle: 'Math Tutoring',
    message: 'What time works for you?',
    timestamp: '9:45 AM',
    unreadCount: 1
  }
];

export const dummyTopLists: TopList[] = [
  {
    title: "Taiwan's Top 10 Snacks",
    date: '2024/09/03',
    items: ['Braised Pork Rice', 'Beef Noodles', 'Salty Crispy Chicken']
  },
  {
    title: "Taiwan's Top 10 Tourist Attractions",
    date: '2024/06/29',
    items: ['[Keelung] Wangyou Valley', '[Nantou] Sun Moon Lake', '[Hualien] Qingshui Cliffs']
  }
];

export const dummyAchievements: Achievement[] = [
  {
    title: 'Promotion Master',
    description: 'Successfully inviting friends to register on the platform',
    progress: 100,
    reward: 50,
    icon: '🏆'
  },
  {
    title: 'Curious Explorer',
    description: 'Visiting ten new restaurants',
    progress: 50,
    reward: 20,
    icon: '🔍'
  }
];

export const dummyProfile: UserProfile = {
  name: 'User',
  wallet: 6000,
  achievements: dummyAchievements,
  taskHistory: dummyTasks,
  rating: 4.5
}; 