const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = (operator, a, b) => operator(a, b);

const calculator = document.querySelector('.calculator');
const buttons = document.querySelector('.buttons');
const span = document.querySelector('span');

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
addLabel(buttons.childNodes[11], '-', 'minus');
addLabel(buttons.childNodes[12], '0', 'zero');
addLabel(buttons.childNodes[13], '\u30FB', 'decimal');
addLabel(buttons.childNodes[14], '+', 'plus');
addLabel(buttons.childNodes[15], '=', 'equals');

span.textContent = '0';

let populateDisplay = () => {
  buttons.childNodes.forEach(elem => {
    let displayValue = 0;
    elem.addEventListener('click', e => {
      displayValue = elem.textContent;
      span.textContent = displayValue;
    })
  });
}


window.onload = () => {
  populateDisplay();
}