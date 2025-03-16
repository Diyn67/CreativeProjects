document.getElementById("terminal-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        let command = event.target.value.toLowerCase();
        handleCommand(command);
        event.target.value = "";
    }
});

function handleCommand(command) {
    let output = document.getElementById("terminal-output");

    if (command === "help") {
        output.innerHTML += "\nAvailable commands:\n- open writing\n- open artwork\n- open characters\n- access vault\n";
    } else if (command.includes("open")) {
        let section = command.split(" ")[1];
        output.innerHTML += `\nOpening ${section}...`;
    } else if (command === "access vault") {
        let password = prompt("Enter vault password:");
        if (password === "ATHEOS2025") {
            output.innerHTML += "\nAccess Granted.";
        } else {
            output.innerHTML += "\nAccess Denied.";
        }
    } else {
        output.innerHTML += "\nCommand not found.";
    }
}
