#  Browser Code Editor

A modern browser-based code editor built with HTML, CSS, and JavaScript. It allows users to write HTML, CSS, and JavaScript code, execute it instantly, and view the result in a live preview.

##  Features

-  HTML, CSS, and JavaScript editor
-  File explorer interface
-  Multiple file tabs
-  Syntax highlighting using CodeMirror
-  Line numbers
-  Run code instantly
-  Live preview
-  JavaScript console
-  Save code using browser localStorage
-  Download projects as HTML files
-  Dark and light themes
-  Ctrl + Enter keyboard shortcut
-  Responsive design
-  Auto-save while editing

##  Technologies Used

- HTML5
- CSS3
- JavaScript
- CodeMirror
- DOM Manipulation
- LocalStorage
- iframe
- Responsive Web Design

##  Project Structure

CodeEditor/
│
├── index.html
├── style.css
├── script.js
├── README.md
└── .gitignore

##  How to Run

1. Download or clone this repository.
2. Open the project folder in VS Code.
3. Open index.html.
4. Use Live Server or open the HTML file directly in your browser.
5. Start writing HTML, CSS, and JavaScript.
6. Click Run or press Ctrl + Enter.

##  How It Works

The editor uses CodeMirror to provide a coding-style editing experience.

The HTML, CSS, and JavaScript written by the user are combined and inserted into an iframe using srcdoc.

The browser then renders the code inside the live preview.

User code is also stored in the browser's localStorage, allowing the editor to restore the code when the application is reopened.

##  Future Improvements

- ZIP project download
- More programming languages
- Code formatting
- Resizable panels
- Multiple project management
- Better error reporting
- Custom themes
- Cloud storage
- User authentication

##  Author

Nandhita Nambiar

Built as a web development project to practice HTML, CSS, and JavaScript.

---

 If you find this project useful, consider giving it a star!



