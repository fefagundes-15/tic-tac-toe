// Set DOM elements
const squares = document.querySelectorAll('.square');
const victory = document.querySelector(".victory");
const btnRestart = document.querySelector(".btnRestart");

// Set initial turn
let turn = "cross";

// Add event listeners
function rules(square) {
    // Mouse hover event
    square.addEventListener("mouseenter", () => {
        if (!square.classList.contains("cross") && !square.classList.contains("circle")) {
            if (turn === "cross" && !square.classList.contains("crossHover")) {
                square.classList.add("crossHover");
            } else if (turn === "circle" && !square.classList.contains("circleHover")) {
                square.classList.add("circleHover");
            }
        }
    });

    square.addEventListener("mouseleave", () => {
        square.classList.remove("crossHover");
        square.classList.remove("circleHover");
    });

    // Play
    square.addEventListener("click", () => {
        if (!square.classList.contains("cross") && !square.classList.contains("circle")) {
            if (turn === "cross") {
                square.classList.add("cross");
                turn = "circle"; // Change the turn
            } else if (turn === "circle") {
                square.classList.add("circle");
                turn = "cross"; // Change the turn
            }

            // Check if there's a winner
            checkWinner();
        }
    });
}

// Check if there's a winner
function checkWinner() {
    const winningCombinations = [
        [squares[0], squares[1], squares[2]],
        [squares[3], squares[4], squares[5]],
        [squares[6], squares[7], squares[8]],
        [squares[0], squares[3], squares[6]],
        [squares[1], squares[4], squares[7]],
        [squares[2], squares[5], squares[8]],
        [squares[0], squares[4], squares[8]],
        [squares[2], squares[4], squares[6]]
    ];

    for (let combination of winningCombinations) {
        if (combination.every(square => square.classList.contains("cross"))) {
            combination.forEach(square => square.style.backgroundColor = "#8BC34A"); // Add winner class
            victory.textContent = "Cross wins!";
            toggleVisibility();
            disableClicks();
            return "cross";
        }

        if (combination.every(square => square.classList.contains("circle"))) {
            combination.forEach(square => square.style.backgroundColor = "#8BC34A"); // Add winner class
            victory.textContent = "Circle wins!";
            toggleVisibility();
            disableClicks();
            return "circle";
        }
    }
    return null; // No winner yet
}

function toggleVisibility() {
    victory.classList.remove("hide");
    btnRestart.classList.remove("hide");
}

// Prevents new clicks
function disableClicks() {
    squares.forEach(square => {
        square.style.pointerEvents = 'none';
    });
}

// Apply the rules to squares
squares.forEach(square => rules(square));