export const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8], [0,3,6],
    [1,4,7],[2,5,8], [0,4,8],[2,4,6]
];

export function checkWin(board, player) {
    return winPatterns.some(pattern => 
        pattern.every(index => board[index] === player)
    );
}

export function isDraw(board) {
    return board.every(cell => cell !== "");
}

// THE MINIMAX ALGORITHM
export function minimax(board, depth, isMaximizing) {
    if (checkWin(board, "O")) return 10 - depth;
    if (checkWin(board, "X")) return depth - 10;
    if (isDraw(board)) return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === "") {
                board[i] = "O";
                let score = minimax(board, depth + 1, false);
                board[i] = "";
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === "") {
                board[i] = "X";
                let score = minimax(board, depth + 1, true);
                board[i] = "";
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

export function getWinningLine(board) {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return pattern; // Returns the [0, 1, 2] etc.
        }
    }
    return null;
}

export function getRandomMove(board) {
    const available = board.map((v, i) => v === "" ? i : null).filter(v => v !== null);
    return available[Math.floor(Math.random() * available.length)];
}