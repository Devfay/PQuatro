// Variables du jeu
const rows = 6;
const columns = 7;
let board = [];
let currentPlayer = 'player1'; // player1 = Rouge, player2 = Jaune
let gameOver = false;

// Récupérer l'élément du tableau de jeu
const gameBoard = document.getElementById('game-board');
const messageDisplay = document.getElementById('message');
const gameOverGif = document.getElementById('game-over-gif'); // Le gif de fin de jeu

// Initialiser le tableau de jeu
function initBoard() {
    board = [];
    for (let row = 0; row < rows; row++) {
        board[row] = [];
        for (let col = 0; col < columns; col++) {
            board[row][col] = null;
        }
    }
    renderBoard();
    messageDisplay.textContent = `C'est au tour de ${currentPlayer === 'player1' ? 'Rouge' : 'Jaune'}`;
    gameOverGif.style.display = 'none'; // Assurer que le gif est caché au début
}

// Afficher le tableau de jeu
function renderBoard() {
    gameBoard.innerHTML = '';
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if (board[row][col]) {
                cell.classList.add(board[row][col]);
            }
            cell.addEventListener('click', () => makeMove(col));
            gameBoard.appendChild(cell);
        }
    }
}

// Fonction pour effectuer un coup
function makeMove(col) {
    if (gameOver) return;

    // Trouver la première ligne vide dans cette colonne
    for (let row = rows - 1; row >= 0; row--) {
        if (!board[row][col]) {
            board[row][col] = currentPlayer;
            renderBoard();
            if (checkWin(row, col)) {
                messageDisplay.textContent = `${currentPlayer === 'player1' ? 'Rouge' : 'Jaune'} a gagné !`;
                gameOver = true;
                gameOverGif.style.display = 'block'; // Afficher le gif quand le jeu est terminé
                return;
            }
            currentPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
            messageDisplay.textContent = `C'est au tour de ${currentPlayer === 'player1' ? 'Rouge' : 'Jaune'}`;
            return;
        }
    }
}

// Vérification de la victoire
function checkWin(row, col) {
    return (
        checkDirection(row, col, 1, 0) || // Horizontal
        checkDirection(row, col, 0, 1) || // Vertical
        checkDirection(row, col, 1, 1) || // Diagonal /
        checkDirection(row, col, 1, -1)   // Diagonal \
    );
}

// Vérifier une direction donnée
function checkDirection(row, col, deltaRow, deltaCol) {
    let count = 1;

    // Vérification d'une direction (haut, bas, gauche, droite)
    for (let i = 1; i < 4; i++) {
        const r = row + deltaRow * i;
        const c = col + deltaCol * i;
        if (r >= 0 && r < rows && c >= 0 && c < columns && board[r][c] === currentPlayer) {
            count++;
        } else {
            break;
        }
    }

    // Vérification de l'autre direction (bas, haut, droite, gauche)
    for (let i = 1; i < 4; i++) {
        const r = row - deltaRow * i;
        const c = col - deltaCol * i;
        if (r >= 0 && r < rows && c >= 0 && c < columns && board[r][c] === currentPlayer) {
            count++;
        } else {
            break;
        }
    }

    return count >= 4;
}

// Réinitialiser le jeu
function resetGame() {
    gameOver = false;
    currentPlayer = 'player1';
    initBoard();
}

// Initialiser le jeu au chargement
initBoard();
