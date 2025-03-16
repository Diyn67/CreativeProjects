const outputElement = document.getElementById("terminal-output");
const inputElement = document.getElementById("terminal-input");

const fileSystem = {
    "home": ["artwork", "characters", "writing"],
    "artwork": ["image1.png", "image2.png"],
    "characters": ["char1.txt", "char2.txt"],
    "writing": ["story1.txt", "story2.txt"],
};

let currentDirectory = "home";

function handleCommand(event) {
    if (event.key === "Enter" || event.keyCode === 13) { // ✅ Supports all browsers
        event.preventDefault(); // Prevent accidental form submission

        const command = inputElement.value.trim();
        inputElement.value = ""; // Clear input after submission

        outputElement.innerHTML += `\n@user:~$ ${command}\n`; // Show command in terminal
        processCommand(command); // Execute command
        
        inputElement.focus(); // Keep focus on input field
        outputElement.scrollTop = outputElement.scrollHeight; // Auto-scroll
    }
}


function processCommand(command) {
    const args = command.split(" ");
    const cmd = args[0];

    switch (cmd) {
        case "ls":
            listFiles();
            break;
        case "cd":
            changeDirectory(args[1]);
            break;
        case "cat":
            readFile(args[1]);
            break;
        case "clear":
            outputElement.innerHTML = "";
            break;
        case "help":
            showHelp();
            break;
        case "whoami":
            outputElement.innerHTML += "user\n";
            break;
        case "arch":
            outputElement.innerHTML += "Arch Linux x86_64 - Custom Web Console\n";
            break;
        default:
            outputElement.innerHTML += `Command not found: ${cmd}. Try 'help'.\n`;
    }

    outputElement.scrollTop = outputElement.scrollHeight;
}

function listFiles() {
    outputElement.innerHTML += fileSystem[currentDirectory].join("\n") + "\n";
}

function changeDirectory(dir) {
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
    outputElement.innerHTML += `
Available commands:
- ls            List files in directory
- cd <dir>      Change directory
- cat <file>    Display file content
- whoami        Show current user
- arch          Display Arch Linux version
- clear         Clear the terminal
- help          Show this help menu\n`;
}


