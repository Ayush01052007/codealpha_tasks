
// Get display elements
const currentOperand = document.getElementById("currentOperand");
const previousOperand = document.getElementById("previousOperand");

// Get all calculator buttons
const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const actionButtons = document.querySelectorAll("[data-action]");

// Calculator variables
let currentValue = "0";
let previousValue = "";
let operator = null;
let shouldResetScreen = false;

// Update calculator display
function updateDisplay() {
    currentOperand.textContent = currentValue;

    if (operator !== null && previousValue !== "") {
        previousOperand.textContent = previousValue + " " + operator;
    } else {
        previousOperand.textContent = "";
    }
}

// Enter a number
function appendNumber(number) {
    if (currentValue === "Error") {
        currentValue = "0";
    }

    if (shouldResetScreen) {
        currentValue = number;
        shouldResetScreen = false;
    } else if (currentValue === "0") {
        currentValue = number;
    } else {
        if (currentValue.length >= 14) {
            return;
        }

        currentValue += number;
    }

    updateDisplay();
}

// Enter a decimal point
function addDecimal() {
    if (shouldResetScreen || currentValue === "Error") {
        currentValue = "0";
        shouldResetScreen = false;
    }

    if (!currentValue.includes(".")) {
        currentValue += ".";
    }

    updateDisplay();
}

// Select an operator
function chooseOperator(selectedOperator) {
    if (currentValue === "Error") {
        clearCalculator();
    }

    if (operator !== null && !shouldResetScreen) {
        calculateResult();
    }

    previousValue = currentValue;
    operator = selectedOperator;
    shouldResetScreen = true;

    updateDisplay();
}

// Perform calculation
function calculateResult() {
    if (operator === null || previousValue === "") {
        return;
    }

    const firstNumber = parseFloat(previousValue);
    const secondNumber = parseFloat(currentValue);

    let result;

    switch (operator) {
        case "+":
            result = firstNumber + secondNumber;
            break;

        case "-":
            result = firstNumber - secondNumber;
            break;

        case "×":
            result = firstNumber * secondNumber;
            break;

        case "÷":
            if (secondNumber === 0) {
                currentValue = "Error";
                previousValue = "";
                operator = null;
                shouldResetScreen = true;
                updateDisplay();
                return;
            }

            result = firstNumber / secondNumber;
            break;

        default:
            return;
    }

    if (!Number.isFinite(result)) {
        currentValue = "Error";
    } else {
        result = Number(result.toPrecision(12));
        currentValue = String(result);
    }

    previousValue = "";
    operator = null;
    shouldResetScreen = true;

    updateDisplay();
}

// Clear calculator
function clearCalculator() {
    currentValue = "0";
    previousValue = "";
    operator = null;
    shouldResetScreen = false;

    updateDisplay();
}

// Delete last digit
function deleteNumber() {
    if (currentValue === "Error" || shouldResetScreen) {
        currentValue = "0";
        shouldResetScreen = false;
    } else {
        currentValue = currentValue.slice(0, -1);

        if (currentValue === "" || currentValue === "-") {
            currentValue = "0";
        }
    }

    updateDisplay();
}

// Convert number into percentage
function calculatePercentage() {
    if (currentValue === "Error") {
        return;
    }

    currentValue = String(parseFloat(currentValue) / 100);
    updateDisplay();
}

// Change positive number to negative and vice versa
function changeSign() {
    if (currentValue === "Error" || currentValue === "0") {
        return;
    }

    currentValue = String(parseFloat(currentValue) * -1);
    updateDisplay();
}

// Number button events
numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        appendNumber(button.dataset.number);
    });
});

// Operator button events
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        chooseOperator(button.dataset.operator);
    });
});

// Action button events
actionButtons.forEach(button => {
    button.addEventListener("click", () => {
        const action = button.dataset.action;

        switch (action) {
            case "clear":
                clearCalculator();
                break;

            case "delete":
                deleteNumber();
                break;

            case "decimal":
                addDecimal();
                break;

            case "calculate":
                calculateResult();
                break;

            case "percent":
                calculatePercentage();
                break;

            case "sign":
                changeSign();
                break;
        }
    });
});

// Keyboard support
document.addEventListener("keydown", event => {
    if (event.key >= "0" && event.key <= "9") {
        appendNumber(event.key);
    }

    if (event.key === ".") {
        addDecimal();
    }

    if (event.key === "+") {
        chooseOperator("+");
    }

    if (event.key === "-") {
        chooseOperator("-");
    }

    if (event.key === "*") {
        chooseOperator("×");
    }

    if (event.key === "/") {
        event.preventDefault();
        chooseOperator("÷");
    }

    if (event.key === "Enter" || event.key === "=") {
        event.preventDefault();
        calculateResult();
    }

    if (event.key === "Backspace") {
        deleteNumber();
    }

    if (event.key === "Escape") {
        clearCalculator();
    }
});

// Display current year
document.getElementById("year").textContent =
    new Date().getFullYear();

// Initial display
updateDisplay();
