let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];
let start = false;
let level = 0;
let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (!start) {
        console.log("game started");
        start = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    // Add a new random color to the game sequence
    let ranidx = Math.floor(Math.random() * 4);
    let randcolor = btns[ranidx];
    gameSeq.push(randcolor);
    console.log("Game Sequence:", gameSeq);

    // Flash the sequence for the user to see
    flashSequence(0);
}

function flashSequence(index) {
    if (index < gameSeq.length) {
        let color = gameSeq[index];
        let btn = document.querySelector(`.${color}`);
        gameFlash(btn);

        // Flash the next button in the sequence after a delay
        setTimeout(function () {
            flashSequence(index + 1);
        }, 1000);  // Delay between flashes
    } else {
        // Allow the user to start clicking after the sequence is flashed
        enableUserInput();
    }
}

function enableUserInput() {
    // Enable user to click buttons
    let allbtns = document.querySelectorAll(".btn");
    for (let btn of allbtns) {
        btn.addEventListener("click", btnpress);
    }
}

function disableUserInput() {
    // Disable further clicks to prevent mistakes while checking
    let allbtns = document.querySelectorAll(".btn");
    for (let btn of allbtns) {
        btn.removeEventListener("click", btnpress);
    }
}

function btnpress() {
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        // If the user sequence matches the game sequence, check if it's complete
        if (userSeq.length === gameSeq.length) {
            disableUserInput();
            setTimeout(levelUp, 1000);  // Wait before moving to the next level
        }
    } else {
        // If the user makes a mistake
        h2.innerHTML = `Game Over! Your score is <b>${level}</b> <br>Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function reset() {
    start = false;
    userSeq = [];
    gameSeq = [];
    level = 0;
}
