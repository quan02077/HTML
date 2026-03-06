const counterLabel = document.getElementById("counter-label");
const decreaseBtn = document.getElementById("decrease");
const resetBtn = document.getElementById("reset");
const increaseBtn = document.getElementById("increase");

let counter = 0;
decreaseBtn.onclick = function(){
    counter--;
    counterLabel.textContent = counter;
}
resetBtn.onclick = function(){
    counter = 0;
    counterLabel.textContent = counter;
}
increaseBtn.onclick = function(){
    counter++;
    counterLabel.textContent = counter;
}