const cells = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('resetBtn');
const playerXWinsEl = document.getElementById('playerXWins');
const playerOWinsEl = document.getElementById('playerOWins');
const drawsEl = document.getElementById('draws');

let currentPlayer = 'X';
let gameState = Array(9).fill('');
let gameActive = true;
let playerXWins = 0;
let playerOWins = 0;
let draws = 0;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', handleResetGame);

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute('data-index');

    if (gameState[cellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
        endGame(false);
    } else if (gameState.every(cell => cell !== '')) {
        endGame(true);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWin() {
    return winningConditions.some(condition => {
        if (condition.every(index => gameState[index] === currentPlayer)) {
            highlightCells(condition);
            return true;
        }
        return false;
    });
}

function highlightCells(condition) {
    condition.forEach(index => {
        cells[index].classList.add('win');
    });
}

function endGame(draw) {
    if (draw) {
        draws++;
        drawsEl.textContent = draws;
    } else {
        if (currentPlayer === 'X') {
            playerXWins++;
            playerXWinsEl.textContent = playerXWins;
        } else {
            playerOWins++;
            playerOWinsEl.textContent = playerOWins;
        }
    }
    gameActive = false;
}

function handleResetGame() {
    gameState = Array(9).fill('');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('win');
    });
    currentPlayer = 'X';
    gameActive = true;
}
