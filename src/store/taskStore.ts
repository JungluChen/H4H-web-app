import { create } from 'zustand';
import { dummyTasks } from '../data/dummyData';
import { Task, Chat } from '../types';

interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  reward: number;
  icon: string;
}

interface Profile {
  name: string;
  wallet: number;
  achievements: Achievement[];
  taskHistory: Task[];
  rating: number;
}

interface TaskState {
  tasks: Task[];
  chats: Chat[];
  readMessages: string[];
  profile: Profile;
  chatMessages: Record<string, Chat[]>;
  addTask: (task: Omit<Task, 'id'>) => void;
  addChat: (chat: Chat) => { chats: Chat[], createdChat: Chat };
  markChatAsRead: (chatId: string) => void;
  addMessage: (chatId: string, message: Chat) => void;
  updateChat: (chatId: string, lastMessage: string, sender: string, timestamp?: string) => void;
  getChatMessages: (chatId: string) => Chat[];
}

// Add dummy profile data
const dummyProfile: Profile = {
  name: "John Doe",
  wallet: 6000,
  achievements: [
    {
      id: "1",
      title: "First Task Complete",
      description: "Completed your first task",
      progress: 100,
      reward: 50,
      icon: "🎯"
    },
    {
      id: "2",
      title: "Super Helper",
      description: "Helped 10 people",
      progress: 80,
      reward: 100,
      icon: "⭐"
    },
    {
      id: "3",
      title: "Quick Responder",
      description: "Responded to 5 tasks within an hour",
      progress: 60,
      reward: 75,
      icon: "⚡"
    }
  ],
  taskHistory: dummyTasks.slice(0, 3),
  rating: 4.8
};

// Add formatTime helper function
const formatTime = (date: Date) => {
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

// Helper function to convert timestamp to Date object
const parseTimestamp = (timestamp: string) => {
  const [monthDay, time] = timestamp.split(', ');
  const [month, day] = monthDay.split(' ');
  const currentYear = new Date().getFullYear();
  return new Date(`${month} ${day}, ${currentYear} ${time}`);
};

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: dummyTasks,
  chats: [],
  readMessages: [],
  profile: dummyProfile,
  chatMessages: {},

  addTask: (newTask) => set((state: TaskState) => ({
    tasks: [
      {
        ...newTask,
        id: String(state.tasks.length + 1),
        status: 'open'
      },
      ...state.tasks
    ]
  })),

  addChat: (newChat: Chat) => {
    let createdChat: Chat = newChat;
    
    set((state: TaskState) => {
      const existingChat = state.chats.find(chat => 
        chat.sender === newChat.sender && 
        chat.taskTitle === newChat.taskTitle
      );
      
      if (existingChat) {
        createdChat = existingChat;
        // Always ensure the chat messages array exists
        if (!state.chatMessages[existingChat.id]) {
          return {
            ...state,
            chatMessages: {
              ...state.chatMessages,
              [existingChat.id]: []
            }
          };
        }
        return state;
      }
      
      return {
        ...state,
        chats: [newChat, ...state.chats],
        chatMessages: {
          ...state.chatMessages,
          [newChat.id]: []
        }
      };
    });

    return { chats: get().chats, createdChat };
  },

  addMessage: (chatId: string, message: Chat) => set((state: TaskState) => {
    // Get existing messages or initialize empty array
    const existingMessages = state.chatMessages[chatId] || [];
    const updatedMessages = [...existingMessages, message];

    // Update both messages and chat preview
    const newState = {
      ...state,
      chatMessages: {
        ...state.chatMessages,
        [chatId]: updatedMessages
      },
      chats: state.chats.map(chat => 
        chat.id === chatId 
          ? { 
              ...chat, 
              message: message.message,
              timestamp: message.timestamp
            }
          : chat
      ).sort((a, b) => {
        const timeA = parseTimestamp(a.timestamp).getTime();
        const timeB = parseTimestamp(b.timestamp).getTime();
        return timeB - timeA;
      })
    };

    return newState;
  }),

  updateChat: (chatId: string, lastMessage: string, sender: string, timestamp?: string) => set((state: TaskState) => {
    const currentTime = timestamp || formatTime(new Date());
    const updatedChats = state.chats.map(chat => 
      chat.id === chatId 
        ? { 
            ...chat, 
            message: lastMessage,
            timestamp: currentTime
          }
        : chat
    ).sort((a, b) => {
      const timeA = parseTimestamp(a.timestamp).getTime();
      const timeB = parseTimestamp(b.timestamp).getTime();
      return timeB - timeA;
    });

    return {
      ...state,
      chats: updatedChats,
      chatMessages: state.chatMessages
    };
  }),

  markChatAsRead: (chatId: string) => set((state: TaskState) => ({
    readMessages: [...state.readMessages, chatId],
    chats: state.chats.map(chat => 
      chat.id === chatId 
        ? { ...chat, unreadCount: 0 }
        : chat
    )
  })),

  getChatMessages: (chatId: string) => {
    const state = get();
    return state.chatMessages[chatId] || [];
  },
})); 