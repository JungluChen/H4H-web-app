from PyQt5.QtCore import Qt, QSize
from PyQt5.QtWidgets import (QApplication, QMainWindow, QWidget, QLabel, QPushButton, 
                            QFrame, QVBoxLayout, QStackedWidget, QScrollArea, QHBoxLayout,
                            QLineEdit, QTextEdit, QComboBox)
from PyQt5.QtGui import QScreen, QPalette, QColor, QFont, QFontDatabase, QFontMetrics, QIcon
from datetime import datetime

class BasePage(QWidget):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.initUI()
        
    def initUI(self):
        self.layout = QVBoxLayout(self)
        self.layout.setContentsMargins(0, 0, 0, 0)
        self.layout.setSpacing(0)
        
        self.scroll = QScrollArea()
        self.scroll.setWidgetResizable(True)
        self.scroll.setStyleSheet("""
            QScrollArea {
                border: none;
                background-color: transparent;
            }
        """)
        
        self.body = QWidget()
        self.body_layout = QVBoxLayout(self.body)
        self.body_layout.setContentsMargins(20, 20, 20, 20)
        self.scroll.setWidget(self.body)
        
        self.layout.addWidget(self.scroll)

class TaskBrowsingPage(BasePage):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.tasks = []
        self.setupContent()
        
    def setupContent(self):
        # Search bar
        search = QLineEdit()
        search.setPlaceholderText("🔍 Search tasks...")
        self.body_layout.addWidget(search)
        
        # Tasks container
        self.tasks_container = QWidget()
        self.tasks_layout = QVBoxLayout(self.tasks_container)
        self.body_layout.addWidget(self.tasks_container)
        
        # Add some dummy tasks
        self.load_dummy_tasks()
        
    def load_dummy_tasks(self):
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
            self.add_task(task)
            
    def add_task(self, task):
        task_widget = QWidget()
        task_widget.setStyleSheet("""
            QWidget {
                background-color: white;
                border: 2px solid rgb(16, 72, 98);
                border-radius: 20px;
                padding: 10px;
                margin: 5px;
            }
        """)
        
        layout = QVBoxLayout(task_widget)
        
        title = QLabel(f"{task['title']} - ${task['price']}")
        title.setStyleSheet("font-weight: bold; font-size: 16px;")
        
        desc = QLabel(task['description'])
        location = QLabel(f"📍 {task['location']}")
        
        contact_btn = QPushButton("Contact Now")
        contact_btn.setStyleSheet("""
            QPushButton {
                background-color: rgb(16, 72, 98);
                color: white;
                border-radius: 10px;
                padding: 5px;
            }
            QPushButton:hover {
                background-color: rgb(20, 90, 120);
            }
        """)
        
        layout.addWidget(title)
        layout.addWidget(desc)
        layout.addWidget(location)
        layout.addWidget(contact_btn)
        
        self.tasks_layout.addWidget(task_widget)
        self.tasks.append(task)

class ChatPage(BasePage):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.chats = []
        self.setupContent()
        
    def setupContent(self):
        search = QLineEdit()
        search.setPlaceholderText("🔍 Search messages...")
        self.body_layout.addWidget(search)
        
        self.chat_container = QWidget()
        self.chat_layout = QVBoxLayout(self.chat_container)
        self.body_layout.addWidget(self.chat_container)
        
    def add_chat(self, chat):
        chat_widget = QWidget()
        chat_widget.setStyleSheet("""
            QWidget {
                background-color: white;
                border: 2px solid rgb(16, 72, 98);
                border-radius: 20px;
                padding: 10px;
                margin: 5px;
            }
        """)
        
        layout = QVBoxLayout(chat_widget)
        
        sender = QLabel(chat["sender"])
        sender.setStyleSheet("font-weight: bold;")
        title = QLabel(chat["task_title"])
        message = QLabel(chat["message"])
        time = QLabel(chat["timestamp"])
        time.setAlignment(Qt.AlignRight)
        
        layout.addWidget(sender)
        layout.addWidget(title)
        layout.addWidget(message)
        layout.addWidget(time)
        
        self.chat_layout.addWidget(chat_widget)
        self.chats.append(chat)

class PostTaskPage(BasePage):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.setupContent()
        
    def setupContent(self):
        form_widget = QWidget()
        form_widget.setStyleSheet("""
            QWidget {
                background-color: white;
                border: 2px solid rgb(16, 72, 98);
                border-radius: 20px;
                padding: 20px;
            }
        """)
        
        layout = QVBoxLayout(form_widget)
        
        self.fields = {}
        
        # Add form fields
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
            self.fields[label] = widget
            if label == "Category":
                widget.addItems(["Finance", "Education", "Transport", "Shopping", "Food"])
        
        post_btn = QPushButton("POST 📝")
        post_btn.setStyleSheet("""
            QPushButton {
                background-color: rgb(16, 72, 98);
                color: white;
                border-radius: 10px;
                padding: 10px;
                font-size: 16px;
            }
            QPushButton:hover {
                background-color: rgb(20, 90, 120);
            }
        """)
        layout.addWidget(post_btn)
        
        self.body_layout.addWidget(form_widget)

class TopBar(QFrame):
    def __init__(self, parent):
        super().__init__(parent)
        self.parent = parent
        self.initUI()
        
    def initUI(self):
        layout = QHBoxLayout(self)
        layout.setContentsMargins(10, 10, 10, 10)
        
        # Home button
        self.home_button = QPushButton("🏠")
        self.home_button.setFixedSize(40, 40)
        
        # Title
        self.title = QLabel("Here4Help")
        self.title.setAlignment(Qt.AlignCenter)
        self.title.setStyleSheet("font-size: 20px; font-weight: bold;")
        
        # Profile button
        self.profile_button = QPushButton("👤")
        self.profile_button.setFixedSize(40, 40)
        
        layout.addWidget(self.home_button)
        layout.addWidget(self.title)
        layout.addWidget(self.profile_button)
        
        self.setStyleSheet("""
            QFrame {
                background-color: white;
                border-bottom: 2px solid rgb(16, 72, 98);
            }
            QPushButton {
                border: none;
                border-radius: 20px;
            }
            QPushButton:hover {
                background-color: #f0f0f0;
            }
        """)

class BottomBar(QFrame):
    def __init__(self, parent):
        super().__init__(parent)
        self.parent = parent
        self.initUI()
        
    def initUI(self):
        layout = QHBoxLayout(self)
        layout.setContentsMargins(10, 10, 10, 10)
        
        # Create navigation buttons
        self.task_button = QPushButton("📋")
        self.chat_button = QPushButton("💬")
        self.post_button = QPushButton("✏️")
        
        for button in [self.task_button, self.chat_button, self.post_button]:
            button.setFixedSize(40, 40)
            layout.addWidget(button)
        
        self.setStyleSheet("""
            QFrame {
                background-color: white;
                border-top: 2px solid rgb(16, 72, 98);
            }
            QPushButton {
                border: none;
                border-radius: 20px;
            }
            QPushButton:hover {
                background-color: #f0f0f0;
            }
        """)

class MainApp(QMainWindow):
    def __init__(self):
        super().__init__()
        self.initUI()
        
    def initUI(self):
        self.setupWindow()
        self.setupCentralWidget()
        self.setupTopBar()
        self.setupBottomBar()
        self.setupNavigationConnections()
        self.show()
        
    def setupWindow(self):
        self.loadCustomFont()
        self.setupWindowGeometry()
        
    def loadCustomFont(self):
        font_id = QFontDatabase.addApplicationFont("Yuanti-SC-Regular.ttf")
        if font_id < 0:
            print("Error loading font")
            self.font_family = "Verdana"
        else:
            self.font_family = QFontDatabase.applicationFontFamilies(font_id)[0]
            
    def setupWindowGeometry(self):
        default_ratio = (9/18)
        screen = QApplication.primaryScreen()
        screen_geometry = screen.geometry()
        screen_width = screen_geometry.width()
        screen_height = screen_geometry.height()
        
        window_width = int(screen_width * 0.3)
        window_height = int(window_width / default_ratio)
        
        x = (screen_width - window_width) // 2
        y = (screen_height - window_height) // 2
        
        self.setGeometry(x, y, window_width, window_height)
        
    def setupCentralWidget(self):
        self.central_widget = QWidget()
        self.setCentralWidget(self.central_widget)
        
        central_layout = QVBoxLayout(self.central_widget)
        central_layout.setContentsMargins(0, 0, 0, 0)
        central_layout.setSpacing(0)
        
        self.stack = QStackedWidget()
        central_layout.addWidget(self.stack)
        
        # Create pages
        self.task_page = TaskBrowsingPage()
        self.chat_page = ChatPage()
        self.post_page = PostTaskPage()
        
        # Add pages to stack
        self.stack.addWidget(self.task_page)
        self.stack.addWidget(self.chat_page)
        self.stack.addWidget(self.post_page)

    def setupTopBar(self):
        self.top_bar = TopBar(self.central_widget)
        self.top_bar.setFixedHeight(60)
        self.central_widget.layout().insertWidget(0, self.top_bar)
        
    def setupBottomBar(self):
        self.bottom_bar = BottomBar(self.central_widget)
        self.bottom_bar.setFixedHeight(60)
        self.central_widget.layout().addWidget(self.bottom_bar)
        
    def setupNavigationConnections(self):
        # Connect top bar buttons
        self.top_bar.home_button.clicked.connect(lambda: self.stack.setCurrentWidget(self.task_page))
        self.top_bar.profile_button.clicked.connect(lambda: self.stack.setCurrentWidget(self.task_page))
        
        # Connect bottom bar buttons
        self.bottom_bar.task_button.clicked.connect(lambda: self.stack.setCurrentWidget(self.task_page))
        self.bottom_bar.chat_button.clicked.connect(lambda: self.stack.setCurrentWidget(self.chat_page))
        self.bottom_bar.post_button.clicked.connect(lambda: self.stack.setCurrentWidget(self.post_page))

def main():
    app = QApplication([])
    main_window = MainApp()
    return app.exec_()

if __name__ == '__main__':
    main()
