import sys
from PyQt5.QtWidgets import (QApplication, QMainWindow, QWidget, QVBoxLayout, 
                            QHBoxLayout, QLabel, QPushButton, QStackedWidget,
                            QLineEdit, QTextEdit, QScrollArea, QComboBox)
from PyQt5.QtCore import Qt
from datetime import datetime

class TaskHelperApp(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Task Helper")
        self.setMinimumSize(430, 800)
        
        # Initialize data
        self.tasks = []
        self.chats = []
        self.current_user = "User"
        
        # Create main widget and layout
        self.central_widget = QWidget()
        self.setCentralWidget(self.central_widget)
        self.main_layout = QVBoxLayout(self.central_widget)
        
        # Create stacked widget for different pages
        self.stacked_widget = QStackedWidget()
        
        # Create pages
        self.home_page = self.create_home_page()
        self.chat_page = self.create_chat_page()
        self.tasks_page = self.create_tasks_page()
        self.post_page = self.create_post_page()
        self.profile_page = self.create_profile_page()
        
        # Add pages to stacked widget
        self.stacked_widget.addWidget(self.home_page)
        self.stacked_widget.addWidget(self.chat_page)
        self.stacked_widget.addWidget(self.tasks_page)
        self.stacked_widget.addWidget(self.post_page)
        self.stacked_widget.addWidget(self.profile_page)
        
        # Create navigation bar
        self.nav_bar = self.create_nav_bar()
        
        # Add widgets to main layout
        self.main_layout.addWidget(self.create_top_bar())
        self.main_layout.addWidget(self.stacked_widget)
        self.main_layout.addWidget(self.nav_bar)
        
        # Load dummy data
        self.load_dummy_data()

    def create_top_bar(self):
        top_bar = QWidget()
        layout = QHBoxLayout(top_bar)
        
        home_btn = QPushButton("🏠")
        title = QLabel("Here4Help")
        profile_btn = QPushButton("👤")
        
        layout.addWidget(home_btn)
        layout.addWidget(title, alignment=Qt.AlignCenter)
        layout.addWidget(profile_btn)
        
        home_btn.clicked.connect(lambda: self.stacked_widget.setCurrentIndex(0))
        profile_btn.clicked.connect(lambda: self.stacked_widget.setCurrentIndex(4))
        
        return top_bar

    def create_nav_bar(self):
        nav_bar = QWidget()
        layout = QHBoxLayout(nav_bar)
        
        buttons = [
            ("🏆", 0),  # Home
            ("📋", 2),  # Tasks
            ("✏️", 3),  # Post
            ("💬", 1),  # Chat
        ]
        
        for icon, index in buttons:
            btn = QPushButton(icon)
            btn.clicked.connect(lambda checked, idx=index: self.stacked_widget.setCurrentIndex(idx))
            layout.addWidget(btn)
        
        return nav_bar

    def create_home_page(self):
        page = QWidget()
        layout = QVBoxLayout(page)
        
        welcome = QLabel("Welcome to Here4Help! 👋")
        welcome.setAlignment(Qt.AlignCenter)
        layout.addWidget(welcome)
        
        stats = QWidget()
        stats_layout = QHBoxLayout(stats)
        
        for title, value in [("Total Tasks", "0"), ("Open Tasks", "0"), ("Completed", "0")]:
            stat = QWidget()
            stat_layout = QVBoxLayout(stat)
            stat_layout.addWidget(QLabel(title))
            stat_layout.addWidget(QLabel(value))
            stats_layout.addWidget(stat)
        
        layout.addWidget(stats)
        
        browse_btn = QPushButton("Browse Available Tasks")
        post_btn = QPushButton("Post a New Task")
        
        browse_btn.clicked.connect(lambda: self.stacked_widget.setCurrentIndex(2))
        post_btn.clicked.connect(lambda: self.stacked_widget.setCurrentIndex(3))
        
        layout.addWidget(browse_btn)
        layout.addWidget(post_btn)
        layout.addStretch()
        
        return page

    def create_chat_page(self):
        page = QWidget()
        layout = QVBoxLayout(page)
        
        search = QLineEdit()
        search.setPlaceholderText("🔍 Search messages...")
        layout.addWidget(search)
        
        chat_list = QScrollArea()
        chat_widget = QWidget()
        chat_layout = QVBoxLayout(chat_widget)
        
        self.chat_layout = chat_layout
        chat_list.setWidget(chat_widget)
        chat_list.setWidgetResizable(True)
        
        layout.addWidget(chat_list)
        
        return page

    def create_tasks_page(self):
        page = QWidget()
        layout = QVBoxLayout(page)
        
        search = QLineEdit()
        search.setPlaceholderText("🔍 Search tasks...")
        layout.addWidget(search)
        
        tasks_list = QScrollArea()
        tasks_widget = QWidget()
        tasks_layout = QVBoxLayout(tasks_widget)
        
        self.tasks_layout = tasks_layout
        tasks_list.setWidget(tasks_widget)
        tasks_list.setWidgetResizable(True)
        
        layout.addWidget(tasks_list)
        
        return page

    def create_post_page(self):
        page = QWidget()
        layout = QVBoxLayout(page)
        
        fields = [
            ("Title", QLineEdit()),
            ("Category", QComboBox()),
            ("Price", QLineEdit()),
            ("Location", QLineEdit()),
            ("Description", QTextEdit())
        ]
        
        for label, widget in fields:
            layout.addWidget(QLabel(label))
            layout.addWidget(widget)
            if label == "Category":
                widget.addItems(["Finance", "Education", "Transport", "Shopping", "Food"])
        
        post_btn = QPushButton("POST 📝")
        post_btn.clicked.connect(self.post_task)
        layout.addWidget(post_btn)
        
        self.post_fields = dict(fields)
        
        return page

    def create_profile_page(self):
        page = QWidget()
        layout = QVBoxLayout(page)
        
        profile_pic = QLabel("👤")
        profile_pic.setAlignment(Qt.AlignCenter)
        layout.addWidget(profile_pic)
        
        name = QLabel(self.current_user)
        name.setAlignment(Qt.AlignCenter)
        layout.addWidget(name)
        
        wallet = QWidget()
        wallet_layout = QVBoxLayout(wallet)
        wallet_layout.addWidget(QLabel("Wallet"))
        wallet_layout.addWidget(QLabel("$6000"))
        layout.addWidget(wallet)
        
        layout.addStretch()
        
        return page

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
        task_widget = QWidget()
        layout = QVBoxLayout(task_widget)
        
        title = QLabel(f"{task['title']} - ${task['price']}")
        desc = QLabel(task['description'])
        location = QLabel(f"📍 {task['location']}")
        
        layout.addWidget(title)
        layout.addWidget(desc)
        layout.addWidget(location)
        
        contact_btn = QPushButton("Contact Now")
        contact_btn.clicked.connect(lambda: self.start_chat(task))
        layout.addWidget(contact_btn)
        
        self.tasks_layout.addWidget(task_widget)
        self.tasks.append(task)

    def post_task(self):
        task = {
            "title": self.post_fields["Title"].text(),
            "category": self.post_fields["Category"].currentText(),
            "price": float(self.post_fields["Price"].text() or 0),
            "location": self.post_fields["Location"].text(),
            "description": self.post_fields["Description"].toPlainText()
        }
        
        self.add_task_to_list(task)
        self.stacked_widget.setCurrentIndex(2)  # Go to tasks page
        
        # Clear fields
        for widget in self.post_fields.values():
            if isinstance(widget, QLineEdit):
                widget.clear()
            elif isinstance(widget, QTextEdit):
                widget.clear()
            elif isinstance(widget, QComboBox):
                widget.setCurrentIndex(0)

    def start_chat(self, task):
        chat = {
            "sender": "System",
            "task_title": task["title"],
            "message": f"Chat started for task: {task['title']}",
            "timestamp": datetime.now().strftime("%H:%M")
        }
        
        chat_widget = QWidget()
        layout = QVBoxLayout(chat_widget)
        
        sender = QLabel(chat["sender"])
        title = QLabel(chat["task_title"])
        message = QLabel(chat["message"])
        time = QLabel(chat["timestamp"])
        
        layout.addWidget(sender)
        layout.addWidget(title)
        layout.addWidget(message)
        layout.addWidget(time)
        
        self.chat_layout.addWidget(chat_widget)
        self.chats.append(chat)
        
        self.stacked_widget.setCurrentIndex(1)  # Go to chat page

if __name__ == '__main__':
    app = QApplication(sys.argv)
    window = TaskHelperApp()
    window.show()
    sys.exit(app.exec_()) 