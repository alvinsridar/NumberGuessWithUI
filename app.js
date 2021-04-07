const keypadNums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let maxLimit;
let minLimit;
let maxLimit0;
let minLimit0;
let guess;
let sequence = 0;
let monitorText = [];

//seq = -1, reserved to prevent user input
//seq = 0, game instructions
//seq = 1, enter max
//seq = 2, enter min
//seq = 3, game loop
//seq = 4, game over

function newGuess() {
    guess = Math.floor(Math.random() * (maxLimit - minLimit + 1)) + minLimit;
    console.log(minLimit, guess, maxLimit);
    document.getElementById("monitor").innerHTML = `Guess is ${guess}</br>Range is ${minLimit0} to ${maxLimit0}</br>Press Stop if it is correct</br>Press Up if it is higher</br>Press Down if it is lower</br>Press Start to reset`;
};

function resetGame() {
    console.log("reset");
    sequence = 1;
    document.getElementById("monitor").innerHTML = "Enter max: ";
};

function undoInput() {
    if (monitorText.length > 11) {
        monitorText.pop();
        document.getElementById("monitor").innerHTML = monitorText.join("");
    } else {
        document.getElementById("monitor").innerHTML = monitorText.join("");
    };
};

document.addEventListener("click", e => {
    const keyValue = e.target.innerHTML;
    monitorText = document.getElementById("monitor").innerHTML.split("");

    switch (sequence) {
        case 0:
            if (keyValue == "Start") {
                document.getElementById("monitor").innerHTML = "Enter max: ";
                sequence = 1;
            };
            break;

        case 1:
            if (keypadNums.includes(Number(keyValue))) {
                monitorText.push(keyValue);
                document.getElementById("monitor").innerHTML = monitorText.join("");
                console.log(monitorText);
            };

            if (keyValue == "Enter") {
                //get maxLimit from monitorText array if Enter is clicked
                maxLimit = parseInt(monitorText.slice(11,).join(""));
                maxLimit0 = maxLimit;
                console.log("maxLimit", maxLimit);

                //check if maxLimit is an integer
                if (isNaN(maxLimit)) {
                    console.log("invalid maxLimit");
                    maxLimit = undefined;
                } else {
                    //update sequence and monitorText
                    sequence = 2;
                    document.getElementById("monitor").innerHTML = "Enter min: ";
                };
            };

            if (keyValue == "Delete") {
                undoInput();
            };
            break;

        case 2:
            if (keypadNums.includes(Number(keyValue))) {
                monitorText.push(keyValue);
                document.getElementById("monitor").innerHTML = monitorText.join("");
                console.log(monitorText);
            };

            if (keyValue == "Enter") {
                //get minLimit from monitorText array if Enter is clicked
                minLimit = parseInt(monitorText.slice(11,).join(""));
                minLimit0 = minLimit;
                console.log("minLimit", minLimit);

                //check if minLimit is an integer
                if (isNaN(minLimit)) {
                    console.log("invalid minLimit");
                    minLimit = undefined;
                } else if (minLimit >= maxLimit) {
                    document.getElementById("monitor").innerHTML = "Error: min must be less than max. Game will reset in 3 seconds.";
                    sequence = -1;
                    setTimeout(resetGame, 3000);
                } else {
                    //update sequence and monitorText
                    sequence = 3;
                    newGuess();
                };
            };

            if (keyValue == "Delete") {
                undoInput();
            };
            break;

        case 3:
            if (keyValue == "Up" && guess != maxLimit) {
                //increase minLimit
                minLimit = guess + 1;
                newGuess();
            };

            if (keyValue == "Down" && guess != minLimit) {
                //decrease maxLimit
                maxLimit = guess - 1;
                newGuess();
            };

            if (keyValue == "Stop" || maxLimit == minLimit) {
                //no further guesses or correct guess, end game
                sequence = 4;
                document.getElementById("monitor").innerHTML = `Your number is ${guess}.<br>Press Start to reset.`;
            };

            if (keyValue == "Start") {
                //reset game
                resetGame();
            };
            break;

        case 4:
            if (keyValue == "Start") {
                //reset game after correct guess
                resetGame();
            };
            break;

        default:
            break;
    };
});