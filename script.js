const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = (operator, a, b) => operator(a, b);

const calculator = document.querySelector('.calculator');
const buttons = document.querySelector('.buttons');
// const btn = document.querySelector('.btn');

for (let i = 0; i < 25; i++) {
  const btn = document.createElement('div');
  btn.classList.add('btn');
  buttons.appendChild(btn)
}