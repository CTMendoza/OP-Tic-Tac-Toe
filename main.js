//create a GameBoard object with gameboard array.
const gameBoard = (function () {
    let board  = ["","","","","","","","","",];

    const printBoard = () => {
        console.log(`
          ${board[0]} | ${board[1]} | ${board[2]}
          ---------
          ${board[3]} | ${board[4]} | ${board[5]}
          ---------
          ${board[6]} | ${board[7]} | ${board[8]}
        `);
    };

    // resets board to being empty
    let resetBoard = () => {
         return board = ["","","","","","","","","",];
    };

    return {board, printBoard, resetBoard}
})();

//create factory function that returns an object for the player and 
const createPlayer = function (name, sign ) {
    return { name, sign };
}

//create factory function to control flow of game
const gameFlow = function () {
    const board = gameBoard.board;
    //create two players and assign the marks they will be using
    const player1 = createPlayer('Player 1', "x");
    const player2 = createPlayer('Player 2', "o");
    //set current player
    let currentPlayer  = player1;
    //switches currentPlayer
    const switchPlayer = () => {
        currentPlayer === player1 ? currentPlayer = player2 : currentPlayer = player1;
        return currentPlayer;
    }
    // set marker on a chosen square by the player
    const setMarker = function (index, mark) {
        if (board[index] === "") {
            board[index] = mark;
        }
    }

    

    // check for winner after a move has been played
    function checkWinner () {
        
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];
        
        //iterates through winPatterns arrays elements and checks if the game board matches any of the winning patterns presented
        for (let pattern of winPatterns) {
            const [a,b,c] = pattern;
            if(board[a] === board[b] && board[a] === board[c] && board[b] === board[c]) {
            console.log(`${currentPlayer} wins!`)
        }
    }

    }
}

