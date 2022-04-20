// create operators
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = (operator, a, b) => operator(a, b);

const calculator = document.querySelector('.calculator');
const display = document.querySelector('.display');
const buttons = document.querySelector('.buttons');
const res = document.querySelector('.bottom');
const op = document.querySelector('.top');
const clear = document.querySelector('.clear');
const del = document.querySelector('.delete');

//create buttons
for (let i = 0; i < 16; i++) {
  const btn = document.createElement('button');
  btn.classList.add('btn');
  buttons.appendChild(btn)
}

// add label to the buttons
const addLabel = (elem, label, id, cls) => {
  elem.textContent = label;
  elem.setAttribute('id', id);

  if (cls) {
    elem.classList.add(cls);
  }
}

addLabel(buttons.childNodes[0], '7', 'seven', 0);
addLabel(buttons.childNodes[1], '8', 'eight', 0);
addLabel(buttons.childNodes[2], '9', 'nine', 0);
addLabel(buttons.childNodes[3], '\u00f7', 'divide', 'operator');
addLabel(buttons.childNodes[4], '4', 'four', 0);
addLabel(buttons.childNodes[5], '5', 'five', 0);
addLabel(buttons.childNodes[6], '6', 'six', 0);
addLabel(buttons.childNodes[7], '\u00D7', 'multiply', 'operator');
addLabel(buttons.childNodes[8], '1', 'one', 0);
addLabel(buttons.childNodes[9], '2', 'two', 0);
addLabel(buttons.childNodes[10], '3', 'three', 0);
addLabel(buttons.childNodes[11], '-', 'subtract', 'operator');
addLabel(buttons.childNodes[12], '0', 'zero', 0);
addLabel(buttons.childNodes[13], '.', 'decimal', 'operator');
addLabel(buttons.childNodes[14], '+', 'add', 'operator');
addLabel(buttons.childNodes[15], '=', 'equals', 'eq');

// reset calculator to its original size
resetDisplay = (size = 0) => {
  calculator.style = `height: ${37 + size}rem`;
  display.style = `height: ${7.4 + size}rem`;
}

// clear content of display
const clearDisplay = (elem) => {
  elem.addEventListener('click', () => {
    displayValue = '';
    res.textContent = '0';
    op.textContent = '';
    prevValue = curValue = 0;
    resetDisplay();
  });
}

// delete last digit on the display
const deleteDisplay = (elem) => {
  elem.addEventListener('click', () => {
    displayValue = displayValue.slice(0, displayValue.length - 1);
    curValue = parseInt(displayValue);
    res.textContent = displayValue;
    if (displayValue === '') {
      res.textContent = '0';
    }
  });
}

// convert floating number to limited decimals
const isFloat = (number) => {
  if (Math.abs(number % 1) !== 0) {
    return parseFloat(number.toFixed(3));
  }
  else return number;
}

const adjustDisplay = (size) => {
  if (size > 15) {
    let computedSize = parseInt(size / 16) * 2.7;
    display.style = `height: ${7.4 + computedSize}rem;`;
    calculator.style = `height: ${37 + computedSize}rem;`;
  }
}

res.textContent = '0';
let displayValue = '';
let command = '';
let commands = [];

let curValue = 0;
let prevValue = 0;
let valArr = [];
let equals = [false, false];

// concatenate user input
const concatInput = (elem) => {
  elem.addEventListener('click', e => {

    adjustDisplay(displayValue.length);
    // if the starting button is a decimal point, the display text is 0.5 instead of .5
    if (e.target.id === 'decimal' && displayValue === '') displayValue = '0';

    // if the button is a number
    if (e.target.id !== 'add' && e.target.id !== 'subtract' && e.target.id !== 'multiply' && e.target.id !== 'divide' && e.target.id !== 'equals' && e.target.id !== 'decimal') {
      res.textContent = displayValue += elem.textContent;
      curValue = parseFloat(displayValue);
    }

    // if the button is a decimal point, let it used only once
    else if (e.target.id === 'decimal' && displayValue.split('.').length - 1 < 1) {
      res.textContent = displayValue += elem.textContent;
      curValue = parseFloat(displayValue);
    }

    // if the button is an operation mark, but not the equals sign or decimal point
    else if (e.target.id !== 'equals' && e.target.id !== 'decimal') {
      command = elem.id;
      commands.push(command);
      equals.push(false);

      if (displayValue !== '' && prevValue !== 0 && equals[equals.length - 2] !== true) {
        displayValue = curValue = isFloat(operations(commands[commands.length - 2], prevValue, curValue));
        res.textContent = displayValue;
      }

      prevValue = curValue;
      curValue = 0;
      displayValue = '';
      op.textContent = prevValue + ' ' + e.target.textContent;
    }

    // if the button is the equals sign
    else if (e.target.id === 'equals') {
      resetDisplay();

      equals.push(true);
      //  if the equals sign was pressed the first time, without any number input
      if (displayValue === '') {
        displayValue += '';
      }

      // if the equals sign was pressed after some number was taken
      else if (valArr[valArr.length - 1] !== prevValue) {
        valArr.push(prevValue);
        op.textContent += ' ' + curValue + ' ' + elem.textContent;
        res.textContent = curValue = isFloat(operations(command, prevValue, curValue));
        displayValue = res.textContent;
      }
    }
  });
}

// do the specific operation
const operations = (id, a, b) => {
  switch (id) {
    case 'add':
      return operate(add, a, b);
    case 'subtract':
      return operate(subtract, a, b);
    case 'multiply':
      return operate(multiply, a, b);
    case 'divide':
      return operate(divide, a, b);
    default:
  }
}

// driver function
const main = () => {

  buttons.childNodes.forEach(btn => {
    concatInput(btn);
  });

  clearDisplay(clear);
  deleteDisplay(del);
}

window.onload = () => {
  main();
}