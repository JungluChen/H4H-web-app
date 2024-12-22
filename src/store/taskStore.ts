import { create } from 'zustand';
import { dummyTasks, dummyChats } from '../data/dummyData';
import { Task } from '../types';

interface Chat {
  id: string;
  sender: string;
  taskTitle: string;
  message: string;
  timestamp: string;
  unreadCount: number;
}

interface TaskState {
  tasks: Task[];
  chats: Chat[];
  readMessages: string[];
  addTask: (task: Omit<Task, 'id'>) => void;
  addChat: (chat: Chat) => void;
  markChatAsRead: (chatId: string) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: dummyTasks,
  chats: dummyChats,
  readMessages: [],
  addTask: (newTask) => set((state) => ({
    tasks: [
      {
        ...newTask,
        id: String(state.tasks.length + 1),
        status: 'open'
      },
      ...state.tasks
    ]
  })),
  addChat: (newChat) => set((state) => {
    const existingChat = state.chats.find(chat => 
      chat.sender === newChat.sender && 
      chat.taskTitle === newChat.taskTitle
    );
    if (existingChat) {
      return state;
    }
    return {
      chats: [newChat, ...state.chats]
    };
  }),
  markChatAsRead: (chatId: string) => set((state) => ({
    readMessages: [...state.readMessages, chatId],
    chats: state.chats.map(chat => 
      chat.id === chatId 
        ? { ...chat, unreadCount: 0 }
        : chat
    )
  }))
})); 