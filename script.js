// Selectors
const previousOperandTextElement = document.querySelector('.previous-operand')
const currentOperandTextElement = document.querySelector('.current-operand')

const equals = document.querySelector('.equals')

const decimal = document.querySelector('.decimal')

const clear = document.querySelector('.clear')

const numberBtn = document.querySelectorAll('.number')
const operatorBtn = document.querySelectorAll('.operator')

// setting default value to display and operator
let currentNum = ''
let previousNumber = ''
let operator = ''

// adding event listener to number buttons
numberBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        handleNumber(e.target.textContent)
    })
})


function handleNumber(number) {
    if (currentNum.length < 11) {
        currentNum += number;
        currentOperandTextElement.textContent = currentNum;
    }
}