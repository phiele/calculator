// define initial variables
let currentOperator = '';
let firstOperand = 0;
let secondOperand = 0;
let clearDisplay = false;

// define query selectors
let display = document.querySelector('.display');
let ac = document.querySelector('#ac');
let numbers = document.querySelectorAll('.number');
let operators = document.querySelectorAll('.operator');
let operatorBtn = document.querySelector('#operator');
let plusMinus = document.querySelector('#plus-minus');
let percent = document.querySelector('#percent');
let decimalBtn = document.querySelector('#decimal');

// event listiner for AC/C button
ac.addEventListener('click', () => {
    // reset everything
    display.value = 0;
    firstOperand = 0;
    secondOperand = 0;
    clearDisplay = false;
    ac.textContent = 'AC';
});

// add event listener for plusMinus button
plusMinus.addEventListener('click', () => {
    if (display.value[0] === '-') {
        display.value = display.value.substring(1);
    } else {
        display.value = '-' + display.value;
    }
});

// add event listener for plusMinus button
percent.addEventListener('click', () => {
    if (display.value === '0') {
        return;
    } else {
        num = Number(display.value) 
        num /= 100 
        display.value = num;
    }
});

// add event listener to all number buttons
// 1) replace 0 by 1st number 
// 2) append nth number to existing number
numbers.forEach(num => {
    num.addEventListener('click', (e) => {
        // console.log(e.target.textContent);
        // replace display by number if AC is active
        if (ac.textContent === 'AC') {
            display.value = e.target.textContent;
            ac.textContent = 'C';
        // replace display by number if clearDisplay is true
        } else if (display.value === 0 || clearDisplay === true) {
            clearDisplay = false;  // reset clearDisplay
            display.value = e.target.textContent;
        // append number to display if nothing is active
        } else {
            display.value += e.target.textContent;
        }
    });
});

// add event listener to decimal button
decimalBtn.addEventListener('click', () => {
    if (display.value.includes('.')) {
        // console.log(display.value);
        return;
    } else {
        display.value = display.value + '.';
        ac.textContent = 'C';  // switch to C if you start with a decimal right at the start
    }
}
);

// add event listener for operator button
operatorBtn.addEventListener('click', () => {
    if (currentOperator !== '') {
        evaluate();
    } else {
        return
    }
});

// add event listener to all operator buttons
operators.forEach((button) =>
  button.addEventListener('click', () => setOperation(button.textContent))
);

// create function that sets the operation
function setOperation(operator) {
    if (currentOperator !== '') {
        evaluate();
    }
    firstOperand = display.value; // set 1st operand before operator is set
    currentOperator = operator; // set operator
    // console.log(`${firstOperand}`)
    // console.log(`${currentOperator}`)
    clearDisplay = true; // clear display when next number will be typed
};

// create function to evaluate operations
function evaluate() {
    if (currentOperator === '' || clearDisplay === true) return
    // if (currentOperator === '÷' && currentOperationScreen.textContent === '0') {
    //   alert("You can't divide by 0!")
    //   return
    // }
    secondOperand = display.value;  // set 2nd operator
    display.value = operate(firstOperand, currentOperator, secondOperand);  // do calculation
    console.log(`${firstOperand} ${currentOperator} ${secondOperand} = ${display.value}`)
    currentOperator = '' // reset currentOperator in order to do next calculation
};

// create function for operations
function operate(firstOperand, operator, secondOperand) {
    firstOperand = Number(firstOperand);
	secondOperand = Number(secondOperand);
    if (operator === '+') return firstOperand + secondOperand;
    if (operator === '-') return subtraction();
    if (operator === '×') return firstOperand * secondOperand;
    if (operator === '÷') return firstOperand / secondOperand; 
};

// avoid imprecise calculations for substraction (https://javascript.info/number#imprecise-calculations)
function subtraction() {
    let subtraction = firstOperand - secondOperand;
    let subtractionString = subtraction.toString();
    if (subtractionString.includes('.') === true) {
        if (subtractionString.length > firstOperand.toString().length && subtractionString.length > secondOperand.toString().length) {
            // compare number of decimals of both operands
            let x = firstOperand.toString().split('.');
            let y = secondOperand.toString().split('.');
            let firstOperandDecLength = x[1].length;
            let secondOperandDecLength = y[1].length;
            if (firstOperandDecLength > secondOperandDecLength) {
                return subtraction.toFixed(firstOperandDecLength);
            } else {
                return subtraction.toFixed(secondOperandDecLength);
            }
        }
    } else {
        return subtraction;
    }
}