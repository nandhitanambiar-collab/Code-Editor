/* =========================================
   CREATE EDITORS
========================================= */

const htmlEditor = CodeMirror.fromTextArea(
    document.getElementById("htmlCode"),
    {
        mode: "xml",
        theme: "dracula",
        lineNumbers: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        lineWrapping: true,
        tabSize: 4
    }
);


const cssEditor = CodeMirror.fromTextArea(
    document.getElementById("cssCode"),
    {
        mode: "css",
        theme: "dracula",
        lineNumbers: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        lineWrapping: true,
        tabSize: 4
    }
);


const jsEditor = CodeMirror.fromTextArea(
    document.getElementById("jsCode"),
    {
        mode: "javascript",
        theme: "dracula",
        lineNumbers: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        lineWrapping: true,
        tabSize: 4
    }
);


/* =========================================
   ELEMENTS
========================================= */

const runBtn =
    document.getElementById("runBtn");

const saveBtn =
    document.getElementById("saveBtn");

const downloadBtn =
    document.getElementById("downloadBtn");

const themeBtn =
    document.getElementById("themeBtn");

const refreshBtn =
    document.getElementById("refreshBtn");

const clearConsole =
    document.getElementById("clearConsole");

const output =
    document.getElementById("output");

const statusMessage =
    document.getElementById("statusMessage");

const consoleOutput =
    document.getElementById("consoleOutput");


/* =========================================
   CURRENT EDITOR
========================================= */

let currentEditor = "html";


/* =========================================
   FILE EDITORS
========================================= */

const editors = {

    html: htmlEditor,

    css: cssEditor,

    js: jsEditor

};


/* =========================================
   FILE CONTAINERS
========================================= */

const containers = {

    html: document.getElementById("htmlEditor"),

    css: document.getElementById("cssEditor"),

    js: document.getElementById("jsEditor")

};


/* =========================================
   SWITCH FILE
========================================= */

function switchFile(file) {

    currentEditor = file;


    Object.keys(containers).forEach(function(key) {

        containers[key].classList.add("hidden");

    });


    containers[file].classList.remove("hidden");


    document.querySelectorAll(".file")
        .forEach(function(element) {

            element.classList.remove("active");

        });


    document.querySelector(
        `.file[data-file="${file}"]`
    ).classList.add("active");


    document.querySelectorAll(".tab")
        .forEach(function(element) {

            element.classList.remove("active");

        });


    document.querySelector(
        `.tab[data-tab="${file}"]`
    ).classList.add("active");


    editors[file].refresh();

}


/* =========================================
   FILE CLICK
========================================= */

document.querySelectorAll(".file")
    .forEach(function(file) {

        file.addEventListener(
            "click",
            function() {

                switchFile(
                    this.dataset.file
                );

            }
        );

    });


/* =========================================
   TAB CLICK
========================================= */

document.querySelectorAll(".tab")
    .forEach(function(tab) {

        tab.addEventListener(
            "click",
            function() {

                switchFile(
                    this.dataset.tab
                );

            }
        );

    });


/* =========================================
   CONSOLE LOG
========================================= */

function addConsoleMessage(
    message,
    type = "normal"
) {

    const line =
        document.createElement("div");


    line.className =
        "console-line";


    if (type === "error") {

        line.innerHTML =
            `<span class="error">✗</span> ${message}`;

    }

    else {

        line.innerHTML =
            `<span class="success">✓</span> ${message}`;

    }


    consoleOutput.appendChild(line);


    consoleOutput.scrollTop =
        consoleOutput.scrollHeight;

}


/* =========================================
   RUN CODE
========================================= */

function runCode() {

    const html =
        htmlEditor.getValue();

    const css =
        cssEditor.getValue();

    const javascript =
        jsEditor.getValue();


    consoleOutput.innerHTML = "";


    addConsoleMessage(
        "Running project..."
    );


    const code = `

<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<style>

${css}

</style>

</head>

<body>

${html}

<script>

const originalLog = console.log;

console.log = function(...args) {

    parent.postMessage({

        type: "console",

        message: args.join(" ")

    }, "*");

    originalLog.apply(console, args);

};


window.onerror = function(
    message,
    source,
    line,
    column,
    error
) {

    parent.postMessage({

        type: "error",

        message: message

    }, "*");

};


try {

${javascript}

}

catch(error) {

    parent.postMessage({

        type: "error",

        message: error.message

    }, "*");

}

<\/script>

</body>

</html>

`;


    output.srcdoc =
        code;


    saveCode();


    statusMessage.textContent =
        "Running project...";


    setTimeout(function() {

        addConsoleMessage(
            "Project executed successfully."
        );

        statusMessage.textContent =
            "Ready";

    }, 300);

}


/* =========================================
   RECEIVE CONSOLE MESSAGES
========================================= */

window.addEventListener(
    "message",
    function(event) {

        if (!event.data) {

            return;

        }


        if (
            event.data.type === "console"
        ) {

            addConsoleMessage(
                event.data.message
            );

        }


        if (
            event.data.type === "error"
        ) {

            addConsoleMessage(
                event.data.message,
                "error"
            );

        }

    }
);


/* =========================================
   RUN BUTTON
========================================= */

runBtn.addEventListener(
    "click",
    runCode
);


/* =========================================
   REFRESH
========================================= */

refreshBtn.addEventListener(
    "click",
    runCode
);


/* =========================================
   SAVE
========================================= */

function saveCode() {

    localStorage.setItem(
        "editorHTML",
        htmlEditor.getValue()
    );


    localStorage.setItem(
        "editorCSS",
        cssEditor.getValue()
    );


    localStorage.setItem(
        "editorJS",
        jsEditor.getValue()
    );


    statusMessage.textContent =
        "Saved ✓";

}


saveBtn.addEventListener(
    "click",
    saveCode
);


/* =========================================
   LOAD CODE
========================================= */

function loadCode() {

    const html =
        localStorage.getItem(
            "editorHTML"
        );


    const css =
        localStorage.getItem(
            "editorCSS"
        );


    const js =
        localStorage.getItem(
            "editorJS"
        );


    if (html !== null) {

        htmlEditor.setValue(html);

    }


    if (css !== null) {

        cssEditor.setValue(css);

    }


    if (js !== null) {

        jsEditor.setValue(js);

    }

}


/* =========================================
   SAMPLE CODE
========================================= */

function loadSampleCode() {

    if (
        localStorage.getItem(
            "editorHTML"
        ) !== null
    ) {

        return;

    }


    htmlEditor.setValue(

`<div class="container">

    <h1>Hello, World! 👋</h1>

    <p>
        Welcome to my Code Editor.
    </p>

    <button onclick="changeText()">
        Click Me
    </button>

</div>`

    );


    cssEditor.setValue(

`body {

    font-family: Arial, sans-serif;

    text-align: center;

    padding-top: 70px;

}

.container {

    max-width: 600px;

    margin: auto;

}

h1 {

    color: #2563eb;

}

p {

    font-size: 18px;

}

button {

    padding: 12px 20px;

    border: none;

    border-radius: 6px;

    background: #2563eb;

    color: white;

    cursor: pointer;

}

button:hover {

    background: #1d4ed8;

}`

    );


    jsEditor.setValue(

`function changeText() {

    document.querySelector("h1").textContent =
        "You clicked the button! 🎉";

    console.log("Button was clicked!");

}`

    );

}


/* =========================================
   DOWNLOAD
========================================= */

downloadBtn.addEventListener(
    "click",
    function() {

        const html =
            htmlEditor.getValue();

        const css =
            cssEditor.getValue();

        const js =
            jsEditor.getValue();


        const project = `

<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<meta name="viewport"
content="width=device-width, initial-scale=1.0">

<title>My Project</title>

<style>

${css}

</style>

</head>

<body>

${html}

<script>

${js}

<\/script>

</body>

</html>

`;


        const blob =
            new Blob(
                [project],
                {
                    type:
                        "text/html"
                }
            );


        const url =
            URL.createObjectURL(blob);


        const link =
            document.createElement("a");


        link.href = url;

        link.download =
            "my-project.html";


        link.click();


        URL.revokeObjectURL(url);


        statusMessage.textContent =
            "Downloaded ✓";

    }
);


/* =========================================
   THEME SWITCH
========================================= */

themeBtn.addEventListener(
    "click",
    function() {

        document.body.classList.toggle(
            "light"
        );


        if (
            document.body.classList.contains(
                "light"
            )
        ) {

            htmlEditor.setOption(
                "theme",
                "default"
            );

            cssEditor.setOption(
                "theme",
                "default"
            );

            jsEditor.setOption(
                "theme",
                "default"
            );


            themeBtn.textContent =
                "🌙 Theme";

        }

        else {

            htmlEditor.setOption(
                "theme",
                "dracula"
            );

            cssEditor.setOption(
                "theme",
                "dracula"
            );

            jsEditor.setOption(
                "theme",
                "dracula"
            );


            themeBtn.textContent =
                "☀️ Theme";

        }

    }
);


/* =========================================
   CLEAR CONSOLE
========================================= */

clearConsole.addEventListener(
    "click",
    function() {

        consoleOutput.innerHTML = "";

        addConsoleMessage(
            "Console cleared."
        );

    }
);


/* =========================================
   CTRL + ENTER
========================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.ctrlKey &&
            event.key === "Enter"
        ) {

            event.preventDefault();

            runCode();

        }

    }
);


/* =========================================
   AUTO SAVE
========================================= */

function enableAutoSave(editor) {

    editor.on(
        "change",
        function() {

            localStorage.setItem(
                "editorHTML",
                htmlEditor.getValue()
            );

            localStorage.setItem(
                "editorCSS",
                cssEditor.getValue()
            );

            localStorage.setItem(
                "editorJS",
                jsEditor.getValue()
            );

        }
    );

}


enableAutoSave(htmlEditor);

enableAutoSave(cssEditor);

enableAutoSave(jsEditor);


/* =========================================
   START
========================================= */

loadCode();

loadSampleCode();

runCode();

switchFile("html");