from PyQt5.QtCore import Qt, QSize
from PyQt5.QtWidgets import QApplication, QMainWindow, QWidget, QLabel, QPushButton, QFrame
from PyQt5.QtGui import QScreen, QPalette, QColor, QFont, QFontDatabase, QFontMetrics, QIcon

app = QApplication([])
#%% window
# Load custom font
font_id = QFontDatabase.addApplicationFont(r"C:\Users\justi\OneDrive\Desktop\APPP\Yuanti-SC-Regular.ttf")
if font_id < 0:
    print("Error loading font")
else:
    font_family = QFontDatabase.applicationFontFamilies(font_id)[0]

# Create main window
window = QMainWindow()

# Create central widget (this will be our base layer)
central_widget = QWidget()
window.setCentralWidget(central_widget)

#%% window-------------------------------- 
# Set grey background using RGB for central widget
palette = QPalette()
palette.setColor(QPalette.Window, QColor(20, 220, 220))
central_widget.setPalette(palette)
central_widget.setAutoFillBackground(True)

# Default smartphone aspect ratio (9:18)
default_ratio = (9/18)

# Get primary screen
screen = QApplication.primaryScreen()
screen_geometry = screen.geometry()

# Get actual screen dimensions
screen_width = screen_geometry.width()
screen_height = screen_geometry.height()
actual_ratio = screen_width / screen_height

# Calculate window dimensions to match smartphone ratio
# while fitting within screen bounds
if actual_ratio > default_ratio:
    # Screen is wider than target ratio
    window_height = int(screen_height * 0.8)
    window_width = int(window_height * default_ratio)
else:
    # Screen is taller than target ratio
    window_width = int(screen_width * 0.3)
    window_height = int(window_width / default_ratio)

# Center window on screen
x = (screen_width - window_width) // 2
y = (screen_height - window_height) // 2

# Set window geometry
window.setGeometry(x, y, window_width, window_height)
#%% Top bar
#Top bar size#######################################
# Create top bar with fixed proportion of window height
TOP_BAR_RATIO = 1/9
top_bar_height = int(window_height * TOP_BAR_RATIO)
top_bar_width = window_width

# Create top bar as QFrame
top_bar = QFrame(central_widget)
top_bar.setGeometry(0, 0, top_bar_width, top_bar_height)
# Ensure the top bar appears above other widgets in the central widget
top_bar.raise_()

# Set white background and black bottom border for top bar
top_bar.setStyleSheet("""
    QFrame {
        background-color: white;
        border-bottom: 3px solid black;
    }
""")

# Modify the resize event (remove border update)
def resizeEvent(event):
    # Update top bar size when window is resized
    new_width = central_widget.width()
    new_height = int(central_widget.height() * TOP_BAR_RATIO)
    top_bar.setGeometry(0, 0, new_width, new_height)

central_widget.resizeEvent = resizeEvent

#Top bar box#######################################
# Create three sections in the top bar with specified ratios

total_ratio = 1.8 + 5.3 + 1.8  # Sum of ratios
left_ratio = 1.8 / total_ratio
center_ratio = 5.3 / total_ratio
right_ratio = 1.8 / total_ratio

# Style for boxes with bottom border
BOX_STYLE = """
    QWidget {
        background-color: white;
        border-bottom: 3px solid black;
    }
"""

# Create left box
left_box = QWidget(top_bar)
left_width = int(top_bar_width * left_ratio)
left_box.setGeometry(0, 0, left_width, top_bar_height)
left_box.setAutoFillBackground(True)
left_box.setStyleSheet(BOX_STYLE)

# Add home button to left box (moved from right box)
home_button = QPushButton(left_box)  # Changed parent to left_box
home_button.setIcon(QIcon(r"C:\Users\justi\OneDrive\Desktop\APPP\icons\home.png"))
home_button.setToolTip("Home page")

# Size the button to fit in left box
button_size = int(min(left_width, top_bar_height) )  # Changed to use left_width
home_button.setFixedSize(button_size, button_size)

# Center the button in left box
button_x = int((left_width - button_size) / 2)  # Changed to use left_width
button_y = int((top_bar_height - button_size) / 2)
home_button.move(button_x, button_y)

# Set icon color to black
icon_size = int(button_size * 0.7)
home_button.setIconSize(QSize(icon_size, icon_size))
home_button.setStyleSheet("""
    QPushButton {
        border: none;
        background-color: transparent;
    }
    QPushButton:hover {
        background-color: #f0f0f0;
    }
    QPushButton:pressed {
        background-color: #e0e0e0;
    }
    QPushButton {
        qproperty-iconColor: black;
    }
""")

# Create center box
center_box = QWidget(top_bar)
center_width = int(top_bar_width * center_ratio)
center_box.setGeometry(left_width, 0, center_width, top_bar_height)
center_box.setAutoFillBackground(True)
center_box.setStyleSheet(BOX_STYLE)

# Create right box
right_box = QWidget(top_bar)
right_width = top_bar_width - left_width - center_width
right_box.setGeometry(left_width + center_width, 0, right_width, top_bar_height)
right_box.setAutoFillBackground(True)
right_box.setStyleSheet(BOX_STYLE)

# Add person button to right box
person_button = QPushButton(right_box)
person_button.setIcon(QIcon(r"C:\Users\justi\OneDrive\Desktop\APPP\icons\person.png"))
person_button.setToolTip("Personal profile")

# Size the button to fit in right box
person_button_size = int(min(right_width, top_bar_height))
person_button.setFixedSize(person_button_size, person_button_size)

# Center the button in right box
person_button_x = int((right_width - person_button_size) / 2)
person_button_y = int((top_bar_height - person_button_size) / 2)
person_button.move(person_button_x, person_button_y)

# Set icon color to black and style
person_icon_size = int(person_button_size * 0.7)
person_button.setIconSize(QSize(person_icon_size, person_icon_size))
person_button.setStyleSheet("""
    QPushButton {
        border: none;
        background-color: transparent;
    }
    QPushButton:hover {
        background-color: #f0f0f0;
    }
    QPushButton:pressed {
        background-color: #e0e0e0;
    }
    QPushButton {
        qproperty-iconColor: black;
    }
""")

# Move updateHomeButton function before updateBoxGeometry
def updateHomeButton():
    new_button_size = int(min(left_box.width(), left_box.height()) * 0.8)  # Changed to use left_box
    home_button.setFixedSize(new_button_size, new_button_size)
    new_x = int((left_box.width() - new_button_size) / 2)  # Changed to use left_box
    new_y = int((left_box.height() - new_button_size) / 2)
    home_button.move(new_x, new_y)
    
    # Update icon size
    icon_size = int(new_button_size * 0.7)
    home_button.setIconSize(QSize(icon_size, icon_size))

# Add updatePersonButton function before updateBoxGeometry
def updatePersonButton():
    new_button_size = int(min(right_box.width(), right_box.height()) * 0.8)
    person_button.setFixedSize(new_button_size, new_button_size)
    new_x = int((right_box.width() - new_button_size) / 2)
    new_y = int((right_box.height() - new_button_size) / 2)
    person_button.move(new_x, new_y)
    
    # Update icon size
    icon_size = int(new_button_size * 0.7)
    person_button.setIconSize(QSize(icon_size, icon_size))

# Then define updateBoxGeometry
def updateBoxGeometry(event):
    new_width = top_bar.width()
    new_height = top_bar.height()
    
    new_left_width = int(new_width * left_ratio)
    new_center_width = int(new_width * center_ratio)
    new_right_width = new_width - new_left_width - new_center_width
    
    left_box.setGeometry(0, 0, new_left_width, new_height)
    center_box.setGeometry(new_left_width, 0, new_center_width, new_height)
    right_box.setGeometry(new_left_width + new_center_width, 0, new_right_width, new_height)
    
    # Update both buttons
    updateHomeButton()
    updatePersonButton()
    
    # Update title after boxes are resized
    updateTitleGeometry()

# Update title position and font size on resize
def updateTitleGeometry():
    # Update geometry
    title_label.setGeometry(0, 0, center_box.width(), center_box.height())
    
    # Start with a small font size and increase until text touches edges
    font = title_label.font()
    font_size = 1
    font.setPointSize(font_size)
    font.setBold(True)
    font.setItalic(True)
    font.setWeight(QFont.ExtraBold)
    
    # Get metrics to check text width and height
    metrics = QFontMetrics(font)
    text_width = metrics.horizontalAdvance(title_label.text())
    text_height = metrics.height()
    
    # Increase font size until text touches box edges
    while (text_width < center_box.width() * 0.95 and  # Leave 5% margin
           text_height < center_box.height() * 0.95):
        font_size += 1
        font.setPointSize(font_size)
        metrics = QFontMetrics(font)
        text_width = metrics.horizontalAdvance(title_label.text())
        text_height = metrics.height()
    
    # Set final font size (one size smaller to ensure it fits)
    font.setPointSize(max(1, font_size - 1))
    title_label.setFont(font)

# Combine resize events
def topBarResizeEvent(event):
    updateBoxGeometry(event)
    resizeEvent(event)  # Call the original resize event

# Connect the combined resize event
top_bar.resizeEvent = topBarResizeEvent

# Add title label to center box
title_label = QLabel("Here4Help", center_box)
title_label.setAlignment(Qt.AlignCenter)

# Set font for title with dynamic size based on top bar height
if font_id >= 0:
    title_font = QFont(font_family)  # Use loaded custom font
else:
    title_font = QFont("Verdana")  # Fallback font
title_font.setBold(True)
title_font.setItalic(True)  # Add italic style
title_font.setWeight(QFont.ExtraBold)  # Make the bold even stronger
title_label.setFont(title_font)
# Position label in center box
title_label.setGeometry(0, 0, center_width, top_bar_height)
#%%bottom bar
#bottom bar size#######################################
# Create bottom bar with fixed proportion of window height
BOTTOM_BAR_RATIO = 2/18
bottom_bar_height = int(window_height * BOTTOM_BAR_RATIO)
bottom_bar_width = window_width

# Create bottom bar as QFrame
bottom_bar = QFrame(central_widget)
bottom_bar.setGeometry(0, window_height - bottom_bar_height, bottom_bar_width, bottom_bar_height)
bottom_bar.raise_()

# Set white background and black top border for bottom bar
bottom_bar.setStyleSheet("""
    QFrame {
        background-color: white;
        border-top: 3px solid black;
    }
""")

# Calculate box dimensions first
box_width = bottom_bar_width // 8
box_height = bottom_bar_height

# Style for boxes with top border
BOX_STYLE = """
    QWidget {
        background-color: white;
        border-top: 3px solid black;
    }
"""

# Create four boxes (single row)
bottom_boxes = []
for col in range(4):  # Just 4 columns, no rows
    box = QWidget(bottom_bar)
    # Calculate position
    x = col * box_width * 2
    y = 0  # All boxes start at top
    width = box_width * 2
    
    box.setGeometry(x, y, width, box_height)
    box.setAutoFillBackground(True)
    box.setStyleSheet(BOX_STYLE)
    bottom_boxes.append(box)

# Add achievement button to first box (upper left)
achievement_button = QPushButton(bottom_boxes[0])
achievement_button.setIcon(QIcon(r"C:\Users\justi\OneDrive\Desktop\APPP\icons\achievement.png"))
achievement_button.setToolTip("Achievements")

# Initial button setup
def updateAchievementButton():
    # Calculate button size (90% of the smaller box dimension instead of 80%)
    box = bottom_boxes[0]
    new_button_size = int(min(box.width(), box.height()) * 0.9)  # Increased from 0.8 to 0.9
    achievement_button.setFixedSize(new_button_size, new_button_size)
    
    # Center the button in the box
    new_x = int((box.width() - new_button_size) / 2)
    new_y = int((box.height() - new_button_size) / 2)
    achievement_button.move(new_x, new_y)
    
    # Update icon size (85% of button size instead of 70%)
    icon_size = int(new_button_size * 0.85)  
    achievement_button.setIconSize(QSize(icon_size, icon_size))

# Set button style
achievement_button.setStyleSheet("""
    QPushButton {
        border: none;
        background-color: transparent;
    }
    QPushButton:hover {
        background-color: #f0f0f0;
    }
    QPushButton:pressed {
        background-color: #e0e0e0;
    }
""")

# Add task browsing button to second box (upper right of achievement)
task_button = QPushButton(bottom_boxes[1])
task_button.setIcon(QIcon(r"C:\Users\justi\OneDrive\Desktop\APPP\icons\Task browsing.png"))
task_button.setToolTip("Task Browsing")

# Initial task button setup
def updateTaskButton():
    # Calculate button size (95% of the smaller box dimension)
    box = bottom_boxes[1]
    new_button_size = int(min(box.width(), box.height()) * 0.9)  # Increased from 0.9 to 0.95
    task_button.setFixedSize(new_button_size, new_button_size)
    
    # Center the button in the box
    new_x = int((box.width() - new_button_size) / 2)
    new_y = int((box.height() - new_button_size) / 2)
    task_button.move(new_x, new_y)
    
    # Update icon size (95% of button size)
    icon_size = int(new_button_size *1.2)  # Increased from 0.85 to 0.95
    task_button.setIconSize(QSize(icon_size, icon_size))

# Set task button style
task_button.setStyleSheet("""
    QPushButton {
        border: none;
        background-color: transparent;
    }
    QPushButton:hover {
        background-color: #f0f0f0;
    }
    QPushButton:pressed {
        background-color: #e0e0e0;
    }
""")

# Add task posting button to third box (next to task browsing)
posting_button = QPushButton(bottom_boxes[2])
posting_button.setIcon(QIcon(r"C:\Users\justi\OneDrive\Desktop\APPP\icons\Task posting.png"))
posting_button.setToolTip("Task Posting")

# Initial posting button setup
def updatePostingButton():
    # Calculate button size (90% of the smaller box dimension)
    box = bottom_boxes[2]
    new_button_size = int(min(box.width(), box.height()) * 0.9)
    posting_button.setFixedSize(new_button_size, new_button_size)
    
    # Center the button in the box
    new_x = int((box.width() - new_button_size) / 2)
    new_y = int((box.height() - new_button_size) / 2)
    posting_button.move(new_x, new_y)
    
    # Update icon size (120% of button size to match task browsing)
    icon_size = int(new_button_size * 0.7)
    posting_button.setIconSize(QSize(icon_size, icon_size))

# Set posting button style
posting_button.setStyleSheet("""
    QPushButton {
        border: none;
        background-color: transparent;
    }
    QPushButton:hover {
        background-color: #f0f0f0;
    }
    QPushButton:pressed {
        background-color: #e0e0e0;
    }
""")

# Add chatroom button to fourth box (next to task posting)
chatroom_button = QPushButton(bottom_boxes[3])
chatroom_button.setIcon(QIcon(r"C:\Users\justi\OneDrive\Desktop\APPP\icons\chatroom.png"))
chatroom_button.setToolTip("Chatroom")

# Initial chatroom button setup
def updateChatroomButton():
    # Calculate button size (90% of the smaller box dimension)
    box = bottom_boxes[3]
    new_button_size = int(min(box.width(), box.height()) * 0.9)
    chatroom_button.setFixedSize(new_button_size, new_button_size)
    
    # Center the button in the box
    new_x = int((box.width() - new_button_size) / 2)
    new_y = int((box.height() - new_button_size) / 2)
    chatroom_button.move(new_x, new_y)
    
    # Update icon size (70% of button size to match other buttons)
    icon_size = int(new_button_size * 0.85)
    chatroom_button.setIconSize(QSize(icon_size, icon_size))

# Set chatroom button style
chatroom_button.setStyleSheet("""
    QPushButton {
        border: none;
        background-color: transparent;
    }
    QPushButton:hover {
        background-color: #f0f0f0;
    }
    QPushButton:pressed {
        background-color: #e0e0e0;
    }
""")

# Modify bottomBarResizeEvent
def bottomBarResizeEvent(event):
    new_width = central_widget.width()
    new_height = int(central_widget.height() * BOTTOM_BAR_RATIO)
    bottom_bar.setGeometry(0, central_widget.height() - new_height, new_width, new_height)
    
    # Update box sizes
    box_width = new_width // 8
    box_height = new_height  # Single row height
    
    # Update geometry for all boxes
    for i, box in enumerate(bottom_boxes):
        x = i * box_width * 2
        box.setGeometry(x, 0, box_width * 2, box_height)
    
    # Update all buttons
    updateAchievementButton()
    updateTaskButton()
    updatePostingButton()
    updateChatroomButton()

# Add bottom bar resize handling to central widget resize event
old_resize_event = central_widget.resizeEvent
def combinedResizeEvent(event):
    old_resize_event(event)
    bottomBarResizeEvent(event)

central_widget.resizeEvent = combinedResizeEvent

# Initial setup
updateBoxGeometry(None)

# Update home button style (remove iconColor)
home_button.setStyleSheet("""
    QPushButton {
        border: none;
        background-color: transparent;
    }
    QPushButton:hover {
        background-color: #f0f0f0;
    }
    QPushButton:pressed {
        background-color: #e0e0e0;
    }
""")

# Update person button style (remove iconColor)
person_button.setStyleSheet("""
    QPushButton {
        border: none;
        background-color: transparent;
    }
    QPushButton:hover {
        background-color: #f0f0f0;
    }
    QPushButton:pressed {
        background-color: #e0e0e0;
    }
""")

window.show()
app.exec_()
