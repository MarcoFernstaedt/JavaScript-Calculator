// Selectors
const previousOperandTextElement = document.querySelector('.previous-operand')
const currentOperandTextElement = document.querySelector('.current-operand')

const equals = document.querySelector('.equals')
equals.addEventListener('click', calculate)

const decimal = document.querySelector('.decimal')

const clear = document.querySelector('.clear')

const numberBtn = document.querySelectorAll('.number')
const operatorBtn = document.querySelectorAll('.operator')

// setting default value to display and operator
let currentNum = ''
let previousNum = ''
let operator = ''

// adding event listener to number buttons
numberBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        handleNumber(e.target.textContent)
    })
})


// function to calculate which number button was pressed
function handleNumber(number) {
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
    operator = op;
    previousNum = currentNum;
    previousOperandTextElement.textContent = previousNum + ' ' + operator;
    currentNum = ''
    currentOperandTextElement.textContent = '';
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
    previousNum = previousNum.toString()
    displayResults();
}

function displayResults() {
    previousOperandTextElement.textContent = ''
    operator = '';

    if (previousNum.length <= 11) {
        currentOperandTextElement.textContent = previousNum;
    } else {
        currentOperandTextElement.textContent = previousNum.slice(0, 11) + '...';
    }
}
