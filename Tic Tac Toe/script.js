const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");
const resultMessageEl = document.getElementById("resultMessage");
const resetBtn = document.getElementById("resetBtn");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

// Initialize the board
function initializeBoard() {
  boardEl.innerHTML = "";
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusEl.textContent = `Player ${currentPlayer}'s turn`;
  resultMessageEl.textContent = "";
  resultMessageEl.style.display = "none";

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleCellClick);
    boardEl.appendChild(cell);
  }
}

// Handle each cell click
function handleCellClick(event) {
  const index = event.target.dataset.index;

  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  event.target.textContent = currentPlayer;

  if (checkWin()) {
    statusEl.textContent = `Player ${currentPlayer} wins!`;
    resultMessageEl.textContent = `${currentPlayer} Wins!`;
    resultMessageEl.style.display = "flex";
    gameActive = false;
    return;
  }

  if (!board.includes("")) {
    statusEl.textContent = "It's a draw!";
    resultMessageEl.textContent = "Draw!";
    resultMessageEl.style.display = "flex";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusEl.textContent = `Player ${currentPlayer}'s turn`;
}

// Check winning conditions
function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

// Reset game
if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    initializeBoard();
  });
}

// Start game
if (boardEl) {
  initializeBoard();
}

// Profile icon dropdown logic for index.html
document.addEventListener('DOMContentLoaded', () => {
  const profileIcon = document.getElementById('profileIcon');
  const dropdown = document.getElementById('profileDropdown');

  if (profileIcon && dropdown) {
    profileIcon.addEventListener('click', () => {
      dropdown.classList.toggle('show');
    });

    window.addEventListener('click', function (e) {
      if (!profileIcon.contains(e.target)) {
        dropdown.classList.remove('show');
      }
    });
  }
});

document.getElementById('themeToggle').addEventListener('change', function () {
  if (this.checked) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
  }
});

const themeToggle = document.getElementById('themeToggle');

// Set initial toggle based on saved preference
if (localStorage.getItem('theme') === 'dark') {
  themeToggle.checked = true;
}

// Toggle dark mode and save preference
themeToggle.addEventListener('change', function () {
  if (this.checked) {
    document.documentElement.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
  }
});
