// create operators
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = (operator, a, b) => operator(a, b);

const calculator = document.querySelector('.calculator');
const buttons = document.querySelector('.buttons');
const span = document.querySelector('span');
const clear = document.querySelector('.clear');
const del = document.querySelector('.delete');

//create buttons
for (let i = 0; i < 16; i++) {
  const btn = document.createElement('div');
  btn.classList.add('btn');
  buttons.appendChild(btn)
}

// add label to the buttons
const addLabel = (elem, label, id) => {
  elem.textContent = label;
  elem.setAttribute('id', id);
}

addLabel(buttons.childNodes[0], '7', 'seven');
addLabel(buttons.childNodes[1], '8', 'eight');
addLabel(buttons.childNodes[2], '9', 'nine');
addLabel(buttons.childNodes[3], '\u00f7', 'divide');
addLabel(buttons.childNodes[4], '4', 'four');
addLabel(buttons.childNodes[5], '5', 'five');
addLabel(buttons.childNodes[6], '6', 'six');
addLabel(buttons.childNodes[7], '\u00D7', 'multiply');
addLabel(buttons.childNodes[8], '1', 'one');
addLabel(buttons.childNodes[9], '2', 'two');
addLabel(buttons.childNodes[10], '3', 'three');
addLabel(buttons.childNodes[11], '-', 'subtract');
addLabel(buttons.childNodes[12], '0', 'zero');
addLabel(buttons.childNodes[13], '.', 'decimal');
addLabel(buttons.childNodes[14], '+', 'add');
addLabel(buttons.childNodes[15], '=', 'equals');

// clear content of display
const clearDisplay = (elem) => {
  elem.addEventListener('click', () => {
    displayValue = '';
    span.textContent = '0';
  });
}

// delete last digit on the display
const deleteDisplay = (elem) => {
  elem.addEventListener('click', () => {
    displayValue = displayValue.slice(0, displayValue.length - 1);
    span.textContent = displayValue;
    if (displayValue === '') {
      span.textContent = '0';
    }
  });
}


span.textContent = '0';
let displayValue = '';
let command = '';

let curValue = 0;
let prevValue = 0;
value = 0;

// concatenate user input
const concatInput = (elem) => {
  elem.addEventListener('click', e => {
    let check = false;

    if (e.target.id !== 'add' && e.target.id !== 'subtract' && e.target.id !== 'multiply' && e.target.id !== 'divide' && e.target.id !== 'equals') {
      displayValue += elem.textContent;
      prevValue = parseInt(displayValue);
      span.textContent = displayValue;
      check = true;
    }

    else if (e.target.id !== 'equals') {
      value = prevValue;
      prevValue = curValue;
      curValue = value;
      command = elem.id;

      prevValue = 0;
      displayValue = '';
      check = true;
    }

    else {
      if (check == true) {
        displayValue += '';
        console.table(0, { curValue }, { prevValue })
        console.log({ displayValue });
        command = elem.id;
      }

      else {
        span.textContent = operations(command, prevValue, curValue);
      }
    }

  });
}

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
