const { toComputedKey } = require("@babel/types")

// setting default value to display and operator
let currentNum = ''
let previousNum = ''
let operator = ''

// Selectors
const previousOperandTextElement = document.querySelector('.previous-operand')
const currentOperandTextElement = document.querySelector('.current-operand')

window.addEventListener('keydown', handleKeyPress)

const equals = document.querySelector('.equals')
// adding an event listener to equals with conditional statement and function call
equals.addEventListener('click', () => {
    if (currentNum != '' && previousNum != '') {
        calculate()
    }
})

const decimal = document.querySelector('.decimal')
// added event listener and function call to decimal
decimal.addEventListener('click', () => {
    addDecimal();
})

const clear = document.querySelector('.clear')
// adding event listener to clear and a function call
clear.addEventListener('click', clearCalculator)

const numberBtn = document.querySelectorAll('.number')
const operatorBtn = document.querySelectorAll('.operator')

// adding event listener to number buttons
numberBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        handleNumber(e.target.textContent)
    })
})


// function to calculate which number button was pressed
function handleNumber(number) {
    if (previousNum != '' && currentNum != '' && operator === '') {
        previousNum = ''
        currentOperandTextElement.textContent = currentNum
    }
    if (currentNum.length < 11) {
        currentNum += number;
        currentOperandTextElement.textContent = currentNum;
    }
}

// adding event listener to operator buttons
operatorBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        handleOperator(e.target.textContent)
    })
})

// function to calculate which operator button was pressed
function handleOperator(op) {
    if (previousNum === '') {
        previousNum = currentNum;
        operatorCheck(op)
    } else if (currentNum === '') {
        operatorCheck(op)
    } else {
        calculate()
        operator = op
        currentOperandTextElement.textContent = '0';
        previousOperandTextElement.textContent = previousNum + ' ' + operator;

    }
}

// checks to see if operator already exist to continue a longer expression
function operatorCheck(textContent) {
    operator = text;
    previousOperandTextElement.textContent = previousNum + ' ' + operator;
    currentOperandTextElement.textContent = '0';
    currentNum = ''
}

// function to calculate input
function calculate() {
    previousNum = Number(previousNum)
    currentNum = Number(currentNum)

    if (operator === '+') {
        previousNum += currentNum;
    } else if (operator === '-') {
        previousNum -= currentNum;
    } else if (operator === 'x') {
        previousNum *= currentNum;
    } else if (operator === '/') {
        if (currentNum <= 0) {
            previousNum = 'Dividing by zero, really?'
            previousOperandTextElement.textContent = ''
            currentOperandTextElement.textContent = previousNum
            operator = ''
            return;
        }
        previousNum /= currentNum;
    }
    previousNum = roundNumber(previousNum)
    previousNum = previousNum.toString()
    displayResults();
}

// rounds number to the 10th decimal
function roundNumber(num) {
    return Math.round(num * 100000) / 100000;
}

// display results to screen
function displayResults() {
    if (previousNum.length <= 11) {
        currentOperandTextElement.textContent = previousNum;
    } else {
        currentOperandTextElement.textContent = previousNum.slice(0, 11) + '...';
    }
    previousOperandTextElement.textContent = ''
    operator = '';
    currentNum = ''
}

function clearCalculator() {
    previousNum = ''
    previousOperandTextElement.textContent = ''
    currentNum = ''
    currentOperandTextElement.textContent = '0'
}

// function to add decimal 
function addDecimal() {
    if (!currentNum.includes('.')) {
        currentNum += '.'
        currentOperandTextElement.textContent = currentNum
    }
}

// function to handle key press to work with calculator buttons
function handleKeyPress(e) {
    e.preventDefault();
    if (e.key >= 0 && e.key <= 9) {
        handleNumber(e.key)
    }

    if (e.key === 'Enter' || e.key === '=' && currentNum != '' && previousNum != '') {
        compute())
    }

    if (e.key === '+' || e.key === '-' || e.key === '/') {
        handleOperator(e.key)
    }

    if (e.key === '*') {
        handleOperator('x')
    }

    if (e.key === '.') {
        addDecimal();
    }

    if (e.key === 'Backspace') {
        handleDelete();
    }
}

// functon to give ability to delete when backspace key is pressed
function handleDelete() {
    if (currentNum != '') {
        currentNum = currentNum.slice(0, -1)
        currentOperandTextElement.textContent = currentNum
        if (currentNum === '') {
            currentOperandTextElement.textContent = '0'
        }
    }
    if (currentNum === '' && previousNum != '' && operator === '') {
        previousNum = previousNum.slice(0, -1)
        currentOperandTextElement.textContent = previousNum
    }
}