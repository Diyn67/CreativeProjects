document.addEventListener("DOMContentLoaded", function () {
    console.log(" DOM fully loaded. Attaching event listeners...");

    const inputElement = document.getElementById("terminal-input");
    const outputElement = document.getElementById("terminal-output");

    inputElement.addEventListener("keydown", handleCommand);
    inputElement.focus();

    document.getElementById("terminal").addEventListener("click", function () {
        console.log(" Terminal clicked. Refocusing input.");
        inputElement.focus();
    });
});

const fileSystem = {
    "home": ["artwork", "characters", "writing"],
    "artwork": ["image1.png", "image2.png"],
    "characters": ["char1.txt", "char2.txt"],
    "writing": ["story1.txt", "story2.txt"],
};

let currentDirectory = "home";

function handleCommand(event) {
    console.log(` Key Pressed: ${event.key}`); // Debugging

    if (event.key === "Enter" || event.keyCode === 13) { // ✅ Fix Enter key issue
        event.preventDefault(); // Prevent accidental form submission

        const inputElement = document.getElementById("terminal-input");
        const outputElement = document.getElementById("terminal-output");

        const command = inputElement.value.trim();
        console.log(` Command Entered: ${command}`); // Debugging

        inputElement.value = ""; // Clear input after submission

        outputElement.innerHTML += `\n@user:~$ ${command}\n`; // Show command in terminal
        processCommand(command);

        inputElement.focus(); // Keep focus on input field
        outputElement.scrollTop = outputElement.scrollHeight; // Auto-scroll
    }
}

function processCommand(command) {
    console.log(` Processing Command: ${command}`); // Debugging

    const outputElement = document.getElementById("terminal-output");
    const args = command.split(" ");
    const cmd = args[0];

    switch (cmd) {
        case "ls":
            console.log(" Executing 'ls' command...");
            listFiles();
            break;
        case "cd":
            console.log(" Executing 'cd' command...");
            changeDirectory(args[1]);
            break;
        case "cat":
            console.log(" Executing 'cat' command...");
            readFile(args[1]);
            break;
        case "clear":
            console.log(" Clearing terminal...");
            outputElement.innerHTML = "";
            break;
        case "help":
            console.log(" Showing help menu...");
            showHelp();
            break;
        case "whoami":
            outputElement.innerHTML += "user\n";
            break;
        case "arch":
            outputElement.innerHTML += "Arch Linux x86_64 - Custom Web Console\n";
            break;
        default:
            console.log(` Command not found: '${cmd}'`);
            outputElement.innerHTML += `Command not found: ${cmd}. Try 'help'.\n`;
    }

    outputElement.scrollTop = outputElement.scrollHeight;
}

function listFiles() {
    console.log(`📂 Listing files in: ${currentDirectory}`);
    const outputElement = document.getElementById("terminal-output");

    if (fileSystem[currentDirectory]) {
        outputElement.innerHTML += fileSystem[currentDirectory].join("\n") + "\n";
    } else {
        outputElement.innerHTML += "No files found.\n";
    }
}

function changeDirectory(dir) {
    const outputElement = document.getElementById("terminal-output");

    if (!dir) {
        outputElement.innerHTML += "Usage: cd <directory>\n";
        return;
    }

    if (dir === "..") {
        currentDirectory = "home";
        outputElement.innerHTML += "Moved to home directory\n";
    } else if (fileSystem[dir]) {
        currentDirectory = dir;
        outputElement.innerHTML += `Moved to ${dir}\n`;
    } else {
        outputElement.innerHTML += `Directory not found: ${dir}\n`;
    }
}

function readFile(file) {
    const outputElement = document.getElementById("terminal-output");

    if (!file) {
        outputElement.innerHTML += "Usage: cat <filename>\n";
        return;
    }

    if (fileSystem[currentDirectory] && fileSystem[currentDirectory].includes(file)) {
        outputElement.innerHTML += `\n[Displaying contents of ${file}]\nLorem ipsum dolor sit amet...\n`;
    } else {
        outputElement.innerHTML += `File not found: ${file}\n`;
    }
}

function showHelp() {
    const outputElement = document.getElementById("terminal-output");

    outputElement.innerHTML += `
<pre>
Available commands:
- ls       List files in directory
- cd       Change directory
- cat      Display file content
- whoami   Show current user
- arch     Display Arch Linux version
- clear    Clear the terminal
- help     Show this help menu
</pre>\n`;

    // Scrolls terminal output to bottom automatically
    outputElement.scrollTop = outputElement.scrollHeight;
}
