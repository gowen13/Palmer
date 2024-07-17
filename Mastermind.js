let reset = document.getElementById("reset");
reset.addEventListener('click', resetGame, false);
let secretCode = null;
let colors = ["red", "blue", "yellow", "green", "orange", "purple"];
let selects = document.getElementsByTagName("select");
//The background of each select tag should reflect the color option that the user chooses
for(let select of selects) {
    select.addEventListener('change', changeColor, false);
}
//change the background color of the select tag to match its value
function changeColor() {
    let color = this.value;
    this.style.setProperty("background-color", color);
    this.style.setProperty("color", "white");
    if(color === "yellow") {
        this.style.setProperty("color", "black");
    }
}
let submitButton = document.getElementById("submit");
//reset the game
resetGame();
function resetGame() {
    //pick a random code when resetting the game
    pickRandomCode();
    // You'll need to activate the submit button
    // You'll want to clear any rows from a previous game if they exist
    let rows = document.getElementsByClassName("mmRow");
    let length = rows.length;
    for (let i = 1; i < length; i++){
        rows[1].remove();
    }
}
//a function here that will pick a random 4-color code and
//store it as an array in the variable named secretCode.
function pickRandomCode() {
    //first make sure there is nothing in the secretCode array by making it an empty array
    secretCode = [];
    //push 4 random strings from the colors array into the secretCode array
    for(let i = 0; i < 4; i++) {
        secretCode.push(colors[Math.floor(6 * Math.random())]);
    }
}
//You'll need to create an event listener on the submit button for when
//the user makes a guess.
submitButton.addEventListener("click", madeGuess, false);

//Every time the user makes a guess, you need to append a new row in the board.
//I suggest that you make a row look something like this:
function madeGuess(event){
    let row = document.createElement("div");
    row.className = "mmRow";
    let userGuess = document.createElement("div");
    userGuess.className = "guess";
    //goes through selections and adds them to userGuess
    for (let select of selects){
        let valueSelect = document.createElement("div");
        valueSelect.className = select.value + " indicator";
        userGuess.appendChild(valueSelect);
    }
    let feedback = document.createElement("div");
    // creates feedback part and adds elements to it
    let countCorrect = 0;
    feedback.className = "feedback";
    for (let i = 0; i < secretCode.length; i++){
        let color = "white";
        if (selects[i].value == secretCode[i]){
            color = "black";
            countCorrect++;
        }
        let correctOrNo = document.createElement("div");
        correctOrNo.className = color + " indicator";
        feedback.appendChild(correctOrNo);
    }
    //brings everything together
    row.appendChild(userGuess);
    row.appendChild(feedback);
    document.getElementById("gameBoard").appendChild(row);


    // <div class="mmRow">
    //     <div class="guess">
    //         <div class="color indicator"></div>
    //         <div class="color indicator"></div>
    //         <div class="color indicator"></div>
    //         <div class="color indicator"></div>
    //     </div>
    //     <div class="feedback">
    //         <div class="color indicator"></div>
    //         <div class="color indicator"></div>
    //     </div>
    // </div>
}

/* The color class name would be the color that you want the indicator to be
such as "red", "blue", "black", "white", etc. The CSS is already set up
so that the indicator divs will look like circles*/