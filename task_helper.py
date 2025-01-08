import sys
import tkinter as tk
from tkinter import ttk
from datetime import datetime

class TaskHelper:
    def __init__(self, root):
        self.root = root
        self.root.title("Task Helper")
        self.root.geometry("430x800")
        
        # Initialize data
        self.tasks = []
        self.chats = []
        self.current_user = "User"
        
        # Create main container
        self.main_container = ttk.Frame(root)
        self.main_container.pack(fill=tk.BOTH, expand=True)
        
        # Create top bar
        self.create_top_bar()
        
        # Create stacked frames for different pages
        self.pages = {}
        self.current_page = None
        
        # Create pages
        self.create_home_page()
        self.create_chat_page()
        self.create_tasks_page()
        self.create_post_page()
        self.create_profile_page()
        
        # Create navigation bar
        self.create_nav_bar()
        
        # Show home page initially
        self.show_page('home')
        
        # Load dummy data
        self.load_dummy_data()
        
        # Style configuration
        style = ttk.Style()
        style.configure('Nav.TButton', padding=10)
        style.configure('Task.TFrame', padding=10, relief='raised')

    def create_top_bar(self):
        top_bar = ttk.Frame(self.main_container)
        top_bar.pack(fill=tk.X, pady=5)
        
        home_btn = ttk.Button(top_bar, text="🏠", command=lambda: self.show_page('home'))
        title = ttk.Label(top_bar, text="Here4Help", font=('Arial', 16, 'bold'))
        profile_btn = ttk.Button(top_bar, text="👤", command=lambda: self.show_page('profile'))
        
        home_btn.pack(side=tk.LEFT, padx=5)
        title.pack(side=tk.LEFT, expand=True)
        profile_btn.pack(side=tk.RIGHT, padx=5)

    def create_nav_bar(self):
        nav_bar = ttk.Frame(self.main_container)
        nav_bar.pack(side=tk.BOTTOM, fill=tk.X)
        
        buttons = [
            ("🏆", 'home'),
            ("📋", 'tasks'),
            ("✏️", 'post'),
            ("💬", 'chat')
        ]
        
        for icon, page in buttons:
            btn = ttk.Button(nav_bar, text=icon, style='Nav.TButton',
                           command=lambda p=page: self.show_page(p))
            btn.pack(side=tk.LEFT, expand=True)

    def create_home_page(self):
        page = ttk.Frame(self.main_container)
        
        welcome = ttk.Label(page, text="Welcome to Here4Help! 👋", font=('Arial', 14, 'bold'))
        welcome.pack(pady=20)
        
        # Stats section
        stats_frame = ttk.Frame(page)
        stats_frame.pack(fill=tk.X, pady=10, padx=20)
        
        stats = [("Total Tasks", "0"), ("Open Tasks", "0"), ("Completed", "0")]
        for title, value in stats:
            stat = ttk.Frame(stats_frame)
            stat.pack(side=tk.LEFT, expand=True)
            ttk.Label(stat, text=title).pack()
            ttk.Label(stat, text=value).pack()
        
        # Action buttons
        ttk.Button(page, text="Browse Available Tasks",
                  command=lambda: self.show_page('tasks')).pack(pady=10, padx=20, fill=tk.X)
        ttk.Button(page, text="Post a New Task",
                  command=lambda: self.show_page('post')).pack(pady=10, padx=20, fill=tk.X)
        
        self.pages['home'] = page

    def create_chat_page(self):
        page = ttk.Frame(self.main_container)
        
        search = ttk.Entry(page)
        search.insert(0, "🔍 Search messages...")
        search.pack(fill=tk.X, padx=20, pady=10)
        
        self.chat_container = ttk.Frame(page)
        self.chat_container.pack(fill=tk.BOTH, expand=True, padx=20)
        
        self.pages['chat'] = page

    def create_tasks_page(self):
        page = ttk.Frame(self.main_container)
        
        search = ttk.Entry(page)
        search.insert(0, "🔍 Search tasks...")
        search.pack(fill=tk.X, padx=20, pady=10)
        
        self.tasks_container = ttk.Frame(page)
        self.tasks_container.pack(fill=tk.BOTH, expand=True, padx=20)
        
        self.pages['tasks'] = page

    def create_post_page(self):
        page = ttk.Frame(self.main_container)
        
        fields = [
            ("Title", ttk.Entry),
            ("Category", ttk.Combobox),
            ("Price", ttk.Entry),
            ("Location", ttk.Entry),
            ("Description", tk.Text)
        ]
        
        self.post_fields = {}
        for label, widget_class in fields:
            ttk.Label(page, text=label).pack(padx=20, pady=(10,0), anchor=tk.W)
            if widget_class == ttk.Combobox:
                widget = widget_class(page, values=["Finance", "Education", "Transport", "Shopping", "Food"])
            elif widget_class == tk.Text:
                widget = widget_class(page, height=4)
            else:
                widget = widget_class(page)
            widget.pack(padx=20, pady=(0,10), fill=tk.X)
            self.post_fields[label] = widget
        
        ttk.Button(page, text="POST 📝", command=self.post_task).pack(pady=20, padx=20, fill=tk.X)
        
        self.pages['post'] = page

    def create_profile_page(self):
        page = ttk.Frame(self.main_container)
        
        ttk.Label(page, text="👤", font=('Arial', 48)).pack(pady=20)
        ttk.Label(page, text=self.current_user, font=('Arial', 16, 'bold')).pack()
        
        wallet_frame = ttk.Frame(page)
        wallet_frame.pack(pady=20, fill=tk.X, padx=20)
        ttk.Label(wallet_frame, text="Wallet").pack()
        ttk.Label(wallet_frame, text="$6000", font=('Arial', 14, 'bold')).pack()
        
        self.pages['profile'] = page

    def show_page(self, page_name):
        if self.current_page:
            self.pages[self.current_page].pack_forget()
        self.pages[page_name].pack(fill=tk.BOTH, expand=True)
        self.current_page = page_name

    def load_dummy_data(self):
        dummy_tasks = [
            {
                "title": "Bank Account Setup",
                "category": "Finance",
                "price": 450,
                "location": "NCCU, Taipei",
                "description": "Need help opening a student bank account"
            },
            {
                "title": "Phone Contract Setup",
                "category": "Telecom",
                "price": 400,
                "location": "NYCU, Hsinchu",
                "description": "Need help setting up a phone contract"
            }
        ]
        
        for task in dummy_tasks:
            self.add_task_to_list(task)

    def add_task_to_list(self, task):
        task_frame = ttk.Frame(self.tasks_container, style='Task.TFrame')
        task_frame.pack(fill=tk.X, pady=5)
        
        ttk.Label(task_frame, text=f"{task['title']} - ${task['price']}",
                 font=('Arial', 12, 'bold')).pack(anchor=tk.W)
        ttk.Label(task_frame, text=task['description']).pack(anchor=tk.W)
        ttk.Label(task_frame, text=f"📍 {task['location']}").pack(anchor=tk.W)
        
        ttk.Button(task_frame, text="Contact Now",
                  command=lambda: self.start_chat(task)).pack(pady=5)
        
        self.tasks.append(task)

    def post_task(self):
        task = {
            "title": self.post_fields["Title"].get(),
            "category": self.post_fields["Category"].get(),
            "price": float(self.post_fields["Price"].get() or 0),
            "location": self.post_fields["Location"].get(),
            "description": self.post_fields["Description"].get("1.0", tk.END).strip()
        }
        
        self.add_task_to_list(task)
        self.show_page('tasks')
        
        # Clear fields
        for widget in self.post_fields.values():
            if isinstance(widget, (ttk.Entry, ttk.Combobox)):
                widget.delete(0, tk.END)
            elif isinstance(widget, tk.Text):
                widget.delete("1.0", tk.END)

    def start_chat(self, task):
        chat = {
            "sender": "System",
            "task_title": task["title"],
            "message": f"Chat started for task: {task['title']}",
            "timestamp": datetime.now().strftime("%H:%M")
        }
        
        chat_frame = ttk.Frame(self.chat_container)
        chat_frame.pack(fill=tk.X, pady=5)
        
        ttk.Label(chat_frame, text=chat["sender"], font=('Arial', 12, 'bold')).pack(anchor=tk.W)
        ttk.Label(chat_frame, text=chat["task_title"]).pack(anchor=tk.W)
        ttk.Label(chat_frame, text=chat["message"]).pack(anchor=tk.W)
        ttk.Label(chat_frame, text=chat["timestamp"]).pack(anchor=tk.E)
        
        self.chats.append(chat)
        self.show_page('chat')

if __name__ == '__main__':
    root = tk.Tk()
    app = TaskHelper(root)
    root.mainloop() 