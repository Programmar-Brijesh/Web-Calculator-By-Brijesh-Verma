let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

let string = "";
let arr = Array.from(buttons);
arr.forEach(button => {
    button.addEventListener('click', (e) => {
        handleInput(e.target.innerHTML);
    });
});

// Add event listener for keypress events
document.addEventListener('keydown', (e) => {
    handleKeyboardInput(e.key);
});

function handleInput(value) {
    if (value == '=') {
        if (string.trim() === "") {
            input.value = "0";
        } else {
            try {
                string = eval(string).toString();
                input.value = string;
            } catch {
                input.value = "Error";
                string = "";
            }
        }
    } else if (value == 'AC') {
        string = "";
        input.value = string;
    } else if (value == 'DEL' || value == 'Backspace') {
        string = string.slice(0, -1);
        input.value = string;
    } else if (value == '%') {
        if (string.trim() !== "") {
            try {
                string = (eval(string) / 100).toString();
                input.value = string;
            } catch {
                input.value = "Error";
                string = "";
            }
        }
    } else {
        let lastChar = string[string.length - 1];

        // Replace the last operator with the current operator
        if (['+', '-', '*', '/', '%'].includes(value) && ['+', '-', '*', '/', '%'].includes(lastChar)) {
            string = string.slice(0, -1) + value;
            input.value = string;
        } 
        // Prevent multiple leading zeros
        else if ((value === '0' || value === '00') && (string === "" || ['+', '-', '*', '/', '%'].includes(lastChar))) {
            if (!string.endsWith('0') && !string.endsWith('00')) {
                string += value;
                input.value = string;
            }
        } 
        // Ensure only one decimal point per number
        else if (value === '.' && (lastChar === '.' || string.split(/[\+\-\*\/\%]/).pop().includes('.'))) {
            // Ignore multiple decimal points in a single number
        } 
        // Ensure no unnecessary leading zeros
        else if (string.split(/[\+\-\*\/\%]/).pop().startsWith('0') && !string.split(/[\+\-\*\/\%]/).pop().includes('.')) {
            if (value !== '0' && value !== '00' && value !== '.') {
                string = string.slice(0, -1) + value;
                input.value = string;
            }
        } else {
            string += value;
            input.value = string;
        }
    }
}

function handleKeyboardInput(key) {
    const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '%', '=', 'Enter', 'Backspace', '.'];
    if (validKeys.includes(key)) {
        // Map Enter key to '='
        if (key === 'Enter') {
            handleInput('=');
        } else if (key === 'Backspace') {
            handleInput('DEL');
        } else {
            handleInput(key);
        }
    }
}

// Prevent any mouse action on the input box
input.addEventListener('mousedown', function(e) {
    e.preventDefault();
});
