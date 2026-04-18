import { checkWin, isDraw, minimax, getWinningLine, getRandomMove } from './gameLogic.js';

// --- 1. ENHANCED STATE ---
let board = Array(9).fill("");
let history = [Array(9).fill("")]; // Snapshots for "Time Travel"
let currentStep = 0;
let turn = "X";
let mode = "PVP";
let gameOver = false;
let scores = { X: 0, O: 0, Draw: 0 };

// --- 2. DOM ELEMENTS ---
const cells = document.querySelectorAll(".cell");
const modeScreen = document.querySelector("#modeScreen");
const gameUI = document.querySelector("#gameUI");
const historyList = document.querySelector("#historyList");
const difficultySelect = document.querySelector("#difficultyLevel");
const difficultySettings = document.querySelector("#difficultySettings");

const pvpBtn = document.querySelector("#pvp");
const aiBtn = document.querySelector("#ai");
const mainMenuBtn = document.querySelector("#mainMenu");
const resetBtn = document.querySelector("#reset");

// --- 3. CORE GAME ACTIONS ---

function makeMove(index, player) {
    if (board[index] !== "" || gameOver) return;

    // Update the logical board
    board[index] = player;

    // Manage History: Remove "future" moves if we jumped back and made a new move
    history = history.slice(0, currentStep + 1);
    history.push([...board]);
    currentStep++;

    updateBoardUI();
    renderHistory();

    // Check for Win
    const winLine = getWinningLine(board);
    if (winLine) {
        gameOver = true;
        scores[player]++;
        // Trigger CSS Animation
        winLine.forEach(idx => cells[idx].classList.add("winner"));
        updateUI(`${player} Wins!`);
    } else if (isDraw(board)) {
        gameOver = true;
        scores.Draw++;
        updateUI("It's a Draw!");
    } else {
        // Toggle Turn
        turn = (player === "X") ? "O" : "X";
        if (mode === "AI" && turn === "O") {
            setTimeout(() => handleAiLogic(), 500);
        }
    }
}

function handleAiLogic() {
    if (gameOver) return;
    const level = difficultySelect.value;
    let move;

    if (level === "easy") {
        move = getRandomMove(board);
    } else if (level === "medium") {
        // 50% chance to play perfectly
        move = Math.random() > 0.5 ? getBestMove() : getRandomMove(board);
    } else {
        move = getBestMove(); // Hard/Unbeatable
    }

    if (move !== undefined) makeMove(move, "O");
}

function getBestMove() {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < 9; i++) {
        if (board[i] === "") {
            board[i] = "O";
            let score = minimax(board, 0, false);
            board[i] = "";
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    return move;
}

// --- 4. UI AND HISTORY UPDATES ---

function updateBoardUI() {
    cells.forEach((cell, i) => {
        cell.innerText = board[i];
        cell.classList.toggle("taken", board[i] !== "");
        cell.classList.remove("winner"); // Reset animations on redraw
    });
}

function renderHistory() {
    historyList.innerHTML = "";
    history.forEach((_, index) => {
        const btn = document.createElement("button");
        btn.className = "history-btn";
        btn.innerText = index === 0 ? "Start" : `Move #${index}`;
        btn.onclick = () => jumpTo(index);
        historyList.appendChild(btn);
    });
}

function jumpTo(step) {
    currentStep = step;
    board = [...history[step]];
    gameOver = false; // Allow play to resume from this point
    turn = (step % 2 === 0) ? "X" : "O";
    updateBoardUI();
}

function updateUI(msg) {
    if (msg) setTimeout(() => alert(msg), 200); 
    document.querySelector("#xScore").innerText = scores.X;
    document.querySelector("#oScore").innerText = scores.O;
    document.querySelector("#drawScore").innerText = scores.Draw;
}

function resetBoard() {
    board = Array(9).fill("");
    history = [Array(9).fill("")];
    currentStep = 0;
    gameOver = false;
    turn = "X";
    updateBoardUI();
    renderHistory();
}

// --- 5. EVENT LISTENERS ---

cells.forEach(cell => {
    cell.addEventListener("click", (e) => {
        const idx = e.target.dataset.index;
        if (board[idx] !== "" || gameOver || (mode === "AI" && turn === "O")) return;
        makeMove(idx, turn); 
    });
});

pvpBtn.addEventListener("click", () => {
    mode = "PVP";
    difficultySettings.classList.add("hidden"); // Hide difficulty for PVP
    showGame();
});

aiBtn.addEventListener("click", () => {
    mode = "AI";
    difficultySettings.classList.remove("hidden"); // Show difficulty for AI
    showGame();
});

mainMenuBtn.addEventListener("click", () => {
    gameUI.classList.add("hidden");
    modeScreen.classList.remove("hidden");
    resetBoard();
});

resetBtn.addEventListener("click", resetBoard);

function showGame() {
    modeScreen.classList.add("hidden");
    gameUI.classList.remove("hidden");
    resetBoard();
}