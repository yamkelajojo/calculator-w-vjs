let firstOperand = ''
let secondOperand = ''
let currentOperation = null
let shouldResetScreen = false

const bottomdisplay = document.querySelector(".displaybottom");
const topdisplay = document.querySelector(".displaytop");
const acbutton = document.getElementById("AC");
const numberButtons = document.querySelectorAll('.numberbutton');
const operatorButtons = document.querySelectorAll('.operator');
const backspaceButton = document.getElementById('C');
const equalsButton = document.getElementById("equals");

window.addEventListener('keydown', handleKeyboardInput)
acbutton.addEventListener('click', clear);
equalsButton.addEventListener("click", evaluate);
backspaceButton.addEventListener("click", backspace);

numberButtons.forEach((button) =>
button.addEventListener('click', () => appendNumber(button.textContent))
)

operatorButtons.forEach((button) =>
button.addEventListener('click', () => setOperation(button.textContent))
)

function resetScreen() {
    topdisplay.textContent = ''
    shouldResetScreen = false;
}

function clear(){
    console.log("Dzodzo");
    topdisplay.textContent = '0'
    bottomdisplay.textContent = ''
    firstOperand = ''
    secondOperand = ''
    currentOperation = null
};

function backspace() {
    topdisplay.textContent = topdisplay.textContent
    .toString()
    .slice(0, -1)
}

function setOperation(operator) {
  if (currentOperation !== null) evaluate()
  firstOperand =topdisplay.textContent
  currentOperation = operator
  bottomdisplay.textContent = `${firstOperand} ${currentOperation}`
  shouldResetScreen = true
}

function evaluate() {
  if (currentOperation === null || shouldResetScreen) return
  if (currentOperation === '÷' && topdisplay.textContent === '0') {
    alert("You can't divide by 0!")
    return
  }
  secondOperand = topdisplay.textContent
  topdisplay.textContent = roundResult(
    operate(currentOperation, firstOperand, secondOperand)
  )
  bottomdisplay.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`
  currentOperation = null
}


function appendNumber(number){
    if (topdisplay.textContent === '0' || shouldResetScreen) 
        resetScreen()//since kukhona uZero, asuke.
    topdisplay.textContent += number
}


function roundResult(number) {
    return Math.round(number * 1000) / 1000
}

function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key)
  if (e.key === '.') appendPoint()
  if (e.key === '=' || e.key === 'Enter') evaluate()
  if (e.key === 'Backspace') deleteNumber()
  if (e.key === 'Escape') clear()
  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
    setOperation(convertOperator(e.key))
}

function convertOperator(keyboardOperator) {
  if (keyboardOperator === '/') return '÷'
  if (keyboardOperator === '*') return '×'
  if (keyboardOperator === '-') return '−'
  if (keyboardOperator === '+') return '+'
}


function add(num1, num2){
   return num1 + num2 ;
};

function subtract(num1, num2){
    return num1 - num2;
};

function multiply(num1, num2){
    return num1 * num2;
};

function divide(num1, num2){
    return num1/num2;
};


function operate(operator, a, b) {
  a = Number(a)
  b = Number(b)
  switch (operator) {
    case '+':
      return add(a, b)
    case '−':
      return subtract(a, b)
    case '×':
      return multiply(a, b)
    case '÷':
      if (b === 0) return null
      else return divide(a, b)
    default:
      return null
  }
}

//that x and - aint working cause of confusion.
