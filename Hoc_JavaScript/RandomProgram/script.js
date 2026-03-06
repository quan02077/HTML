const randomBtn = document.getElementById('randomBtn');
const result = document.getElementById('result');

const min = 1;
const max = 6;

let roll;

randomBtn.onclick = function(){
    roll = Math.random() * max + min;
    roll = Math.floor(roll);
    result.textContent = `You rolled a ${roll}!`;
}

alert('Welcome to the Random Number Generator! Click the button to roll a number between 1 and 6.');