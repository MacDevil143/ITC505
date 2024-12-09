document.addEventListener("DOMContentLoaded", () => {
    const boardSize = 5;
    const gameBoard = document.getElementById("gameBoard");
    const moveCounter = document.getElementById("moveCounter");
    const timeCounter = document.getElementById("timeCounter");
    const restartButton = document.getElementById("restartButton");
    let cells = [];
    let moves = 0;
    let timer = null;
    let elapsedTime = 0;

    // Create the grid
    function createGrid() {
        gameBoard.innerHTML = "";
        cells = [];
        for (let i = 0; i < boardSize; i++) {
            cells[i] = [];
            for (let j = 0; j < boardSize; j++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.row = i;
                cell.dataset.col = j;
                gameBoard.appendChild(cell);
                cells[i][j] = cell;

                // Add click event
                cell.addEventListener("click", () => toggleCell(i, j));
            }
        }
    }

    // Toggle a cell and its neighbors
    function toggleCell(row, col) {
        toggle(row, col);
        toggle(row - 1, col); // Up
        toggle(row + 1, col); // Down
        toggle(row, col - 1); // Left
        toggle(row, col + 1); // Right

        moves++;
        moveCounter.textContent = moves;

        if (checkWin()) {
            clearInterval(timer);
            alert(`You win! Moves: ${moves}, Time: ${elapsedTime} seconds`);
        }
    }

    // Toggle a specific cell
    function toggle(row, col) {
        if (row >= 0 && row < boardSize && col >= 0 && col < boardSize) {
            cells[row][col].classList.toggle("is-off");
        }
    }

    // Check if all cells are "on"
    function checkWin() {
        return cells.flat().every(cell => !cell.classList.contains("is-off"));
    }

    // Generate a random, solvable board
    function randomizeBoard() {
        for (let i = 0; i < 10; i++) {
            const randomRow = Math.floor(Math.random() * boardSize);
            const randomCol = Math.floor(Math.random() * boardSize);
            toggleCell(randomRow, randomCol);
        }
        moves = 0;
        moveCounter.textContent = moves;
    }

    // Start the timer
    function startTimer() {
        clearInterval(timer);
        elapsedTime = 0;
        timeCounter.textContent = elapsedTime;
        timer = setInterval(() => {
            elapsedTime++;
            timeCounter.textContent = elapsedTime;
        }, 1000);
    }

    // Restart the game
    function restartGame() {
        createGrid();
        randomizeBoard();
        startTimer();
    }

    // Initialize the game
    restartButton.addEventListener("click", restartGame);
    restartGame();
});
