import sys
from PyQt5.QtCore import Qt
from PyQt5.QtWidgets import (
    QApplication, QMainWindow, QWidget, QFrame, QVBoxLayout, QHBoxLayout, QLabel
)
from PyQt5.QtGui import QPalette, QColor

def createRoundedBox(
    row1_texts=None, row2_texts=None, row3_texts=None
):
    """
    Creates a QFrame with a round border, 3 rows, and a divider after row 1.
    The layout is divided into columns with specified width ratios:
    - Row 1: (2 : 5 : 2)
    - Row 2: (3.5 : 3.5 : 1) approximated as (35 : 35 : 10)
    - Row 3: (1 : 1)

    This version aligns text vertically center and left.
    """
    if row1_texts is None:
        row1_texts = ["R1C1", "R1C2", "R1C3"]
    if row2_texts is None:
        row2_texts = ["R2C1", "R2C2", "R2C3"]
    if row3_texts is None:
        row3_texts = ["R3C1", "R3C2"]

    # Main QFrame (rounded border)
    round_frame = QFrame()
    round_frame.setObjectName("roundFrame")
    round_frame.setStyleSheet(
        """
        QFrame#roundFrame {
            background-color: rgb(242, 242, 242);
            border: 3px solid rgb(16, 72, 98);
            border-radius: 20px;
        }
        """
    )

    main_vlayout = QVBoxLayout(round_frame)
    main_vlayout.setContentsMargins(10, 10, 10, 10)
    main_vlayout.setSpacing(10)

    # =============== ROW 1 ===============
    row1 = QFrame()
    row1_layout = QHBoxLayout(row1)
    row1_layout.setSpacing(5)

    # --- Column 1 ---
    col1_row1 = QFrame()
    col1_layout = QVBoxLayout(col1_row1)
    col1_layout.setContentsMargins(0, 0, 0, 0)
    lbl1 = QLabel(row1_texts[0])
    lbl1.setAlignment(Qt.AlignVCenter | Qt.AlignLeft)
    col1_layout.addWidget(lbl1)
    row1_layout.addWidget(col1_row1, stretch=2)

    # --- Column 2 ---
    col2_row1 = QFrame()
    col2_layout = QVBoxLayout(col2_row1)
    col2_layout.setContentsMargins(0, 0, 0, 0)
    lbl2 = QLabel(row1_texts[1])
    lbl2.setAlignment(Qt.AlignVCenter | Qt.AlignLeft)
    col2_layout.addWidget(lbl2)
    row1_layout.addWidget(col2_row1, stretch=5)

    # --- Column 3 ---
    col3_row1 = QFrame()
    col3_layout = QVBoxLayout(col3_row1)
    col3_layout.setContentsMargins(0, 0, 0, 0)
    lbl3 = QLabel(row1_texts[2])
    lbl3.setAlignment(Qt.AlignVCenter | Qt.AlignLeft)
    col3_layout.addWidget(lbl3)
    row1_layout.addWidget(col3_row1, stretch=2)

    main_vlayout.addWidget(row1)

    # --- Divider ---
    divider = QFrame()
    divider.setFrameShape(QFrame.HLine)
    divider.setStyleSheet(
        """
        QFrame {
            background-color: rgb(16, 72, 98);
            max-height: 3px;
        }
        """
    )
    main_vlayout.addWidget(divider)

    # =============== ROW 2 ===============
    row2 = QFrame()
    row2_layout = QHBoxLayout(row2)
    row2_layout.setSpacing(5)

    col1_row2 = QFrame()
    col1_layout2 = QVBoxLayout(col1_row2)
    lbl4 = QLabel(row2_texts[0])
    lbl4.setAlignment(Qt.AlignVCenter | Qt.AlignLeft)
    col1_layout2.addWidget(lbl4)
    row2_layout.addWidget(col1_row2, stretch=35)

    col2_row2 = QFrame()
    col2_layout2 = QVBoxLayout(col2_row2)
    lbl5 = QLabel(row2_texts[1])
    lbl5.setAlignment(Qt.AlignVCenter | Qt.AlignLeft)
    col2_layout2.addWidget(lbl5)
    row2_layout.addWidget(col2_row2, stretch=35)

    col3_row2 = QFrame()
    col3_layout2 = QVBoxLayout(col3_row2)
    lbl6 = QLabel(row2_texts[2])
    lbl6.setAlignment(Qt.AlignVCenter | Qt.AlignLeft)
    col3_layout2.addWidget(lbl6)
    row2_layout.addWidget(col3_row2, stretch=10)

    main_vlayout.addWidget(row2)

    # =============== ROW 3 ===============
    row3 = QFrame()
    row3_layout = QHBoxLayout(row3)
    row3_layout.setSpacing(5)

    col1_row3 = QFrame()
    col1_layout3 = QVBoxLayout(col1_row3)
    lbl7 = QLabel(row3_texts[0])
    lbl7.setAlignment(Qt.AlignVCenter | Qt.AlignLeft)
    col1_layout3.addWidget(lbl7)
    row3_layout.addWidget(col1_row3, stretch=1)

    col2_row3 = QFrame()
    col2_layout3 = QVBoxLayout(col2_row3)
    lbl8 = QLabel(row3_texts[1])
    lbl8.setAlignment(Qt.AlignVCenter | Qt.AlignLeft)
    col2_layout3.addWidget(lbl8)
    row3_layout.addWidget(col2_row3, stretch=1)

    main_vlayout.addWidget(row3)

    return round_frame
# ------------------------------------------------------

class MyMainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Rounded Box Function Example")
        self.setGeometry(300, 100, 600, 800)

        # Central widget
        self.central_widget = QWidget()
        self.setCentralWidget(self.central_widget)

        # Main layout for the central widget
        main_layout = QVBoxLayout(self.central_widget)
        main_layout.setContentsMargins(30, 30, 30, 30)
        main_layout.setSpacing(15)

        # Example usage:
        # 1) We can call createRoundedBox with custom texts
        box1 = createRoundedBox(
            row1_texts=["Row1-Col1", "Row1-Col2", "Row1-Col3"],
            row2_texts=["Row2-Col1", "Row2-Col2", "Row2-Col3"],
            row3_texts=["Row3-Col1", "Row3-Col2"],
        )
        main_layout.addWidget(box1)

        # 2) Another example with different texts
        box2 = createRoundedBox(
            row1_texts=["Apple", "Orange", "Banana"],
            row2_texts=["Hello", "World", "!!!"],
            row3_texts=["Left", "Right"],
        )
        main_layout.addWidget(box2)

        # Add more boxes as needed...

        self.show()

def main():
    app = QApplication(sys.argv)
    window = MyMainWindow()
    window.show()
    sys.exit(app.exec_())

if __name__ == "__main__":
    main()
