const BOARD_SIZE = 15;
const board = [];
let currentPlayer = "●";
let winner = null;

// Initialize board
const boardElement = document.getElementById("board");
for (let i = 0; i < BOARD_SIZE; i++) {
  const row = [];
  const tr = document.createElement("tr");
  for (let j = 0; j < BOARD_SIZE; j++) {
    const td = document.createElement("td");
    td.addEventListener("click", () => makeMove(i, j, td));
    tr.appendChild(td);
    row.push(null);
  }
  board.push(row);
  boardElement.appendChild(tr);
}

// Handle player move
function makeMove(row, col, cell) {
  if (board[row][col] || winner) return;

  board[row][col] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add("taken");

  if (checkWinner(row, col)) {
    document.getElementById("winner").textContent = `${currentPlayer} 승리!`;
    winner = currentPlayer;
    return;
  }

  currentPlayer = currentPlayer === "●" ? "○" : "●";
}

// Check for winner
function checkWinner(row, col) {
  const directions = [
    { dr: 0, dc: 1 }, // → 
    { dr: 1, dc: 0 }, // ↓
    { dr: 1, dc: 1 }, // ↘
    { dr: 1, dc: -1 }, // ↙
  ];

  for (const { dr, dc } of directions) {
    let count = 1;
    count += countStones(row, col, dr, dc);
    count += countStones(row, col, -dr, -dc);
    if (count >= 5) return true;
  }
  return false;
}

// Count stones in one direction
function countStones(row, col, dr, dc) {
  let count = 0;
  let r = row + dr;
  let c = col + dc;

  while (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && board[r][c] === currentPlayer) {
    count++;
    r += dr;
    c += dc;
  }
  return count;
}

// Reset game function
function resetGame() {
  // Reset board
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      board[i][j] = null;
      const cell = boardElement.rows[i].cells[j];
      cell.textContent = '';
      cell.classList.remove("taken");
    }
  }
  // Reset winner text
  document.getElementById("winner").textContent = '';
  // Reset player
  currentPlayer = "●";
  winner = null;
}

// Attach reset function to button
document.getElementById("resetButton").addEventListener("click", resetGame);
