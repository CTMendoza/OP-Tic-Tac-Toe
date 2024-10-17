//create a GameBoard object with gameboard array.
const gameBoard = (function () {
    const board  = ["","","","","","","","","",];

    const printBoard = () => {
        console.log(`
          ${board[0]} | ${board[1]} | ${board[2]}
          ---------
          ${board[3]} | ${board[4]} | ${board[5]}
          ---------
          ${board[6]} | ${board[7]} | ${board[8]}
        `);
    };

    return {board, printBoard}
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
}