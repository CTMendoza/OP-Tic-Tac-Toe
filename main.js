//create a GameBoard object with gameboard array.

const gameBoard = function () {
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

    // get current state of the board array
    const getBoard = () => board;

     // set marker on a chosen square by the player
     const setMarker = (index, mark) => {
        if (board[index] === "") {
            board[index] = mark;
            return true;
        }
        return false;
    }

    return {board, printBoard, resetBoard, setMarker, getBoard}
};

//create factory function that returns an object for the player and 
const createPlayer = function (name, sign, color ) {
    return { name, sign, color };
}

//create factory function to control flow of game
const gameFlow = function () {

    const board = gameBoard();

    //create two players and assign the marks they will be using
    const player1 = createPlayer('Player 1', "x", "#235789");
    const player2 = createPlayer('Player 2', "o", "#F1D302");
    
    //set current player
    let currentPlayer  = player1;
    
    //switches currentPlayer
    const switchPlayer = () => {
        if(currentPlayer === player1) {
            currentPlayer = player2
            message.textContent= "Player O's Turn"
        } else {
            currentPlayer = player1
            message.textContent="Player X's Turn"
        }
        return currentPlayer;
    }
    
   

    // check for winner after a move has been played
    function checkWinner () {
        
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];
        const b = board.getBoard();
        //iterates through winPatterns arrays elements and checks if the game board matches any of the winning patterns presented
        for (let pattern of winPatterns) {
                const [x,y,z] = pattern;
                if(b[x] && b[x] === b[y] && b[x] === b[z]) {
                return currentPlayer;
            }   
        }
        return null;
    }

    // check if board is full
        const boardFull = () => {
            return board.getBoard().every(square => square !== "");
        }
    
    // plays a round of tic-tac-toe
    const playRound = function (index) {
        if(board.setMarker(index,currentPlayer.sign)) {
            board.printBoard();
            tiles[index].textContent = `${currentPlayer.sign}`;
            tiles[index].style.color = currentPlayer.color;
            const winner = checkWinner();

            if (!message) {
                message = document.createElement('h2');
                body.insertBefore(message, boardElement);
            }

            if(winner) {
               message.textContent = `${currentPlayer.name} is the winner!`;
               message.style.color = currentPlayer.color;
                disable();
                return
            }
            if (boardFull()) {
                message.textContent = "It's a tie!";
                console.log("It's a tie!");
                return;
            }
             switchPlayer();
        }
        else {
            if (!message) {
                message = document.createElement('h2');
                body.insertBefore(message, boardElement);  
            }
            message.textContent = "Invalid move! Try again.";
            console.log("Invalid move! Try again.");
        }
    }
    // resets game by emptying board and changing currentPlayer back to player1
    const resetGame = () => {
        board.resetBoard();
        board.printBoard();
        currentPlayer = player1;
        message.textContent = `Game has been reset! Player X go!`;
        message.style.color = 'white';
        console.log("Game has been reset!");
    };

    return {playRound, resetGame, switchPlayer, currentPlayer};
}

const game = gameFlow();

let message = null;
const boardElement = document.querySelector('.board');
const body = document.querySelector('body');
const resetBttn = document.querySelector('.reset');

const tiles = Array.from(document.getElementsByClassName('tile'));

tiles.forEach((tile, index) => {
    tile.addEventListener('click', () => {
        game.playRound(index);
    })
})

// clears the board on the webpage
function clearBoard () {
    tiles.forEach(tile => {
        tile.textContent = ''; 
    });
}

// when a player wins, disable the ability to add new markers to remaining empty tiles
function disable () {
    tiles.forEach(tile => {
        if(tile.textContent === '') {
            tile.style.pointerEvents = 'none';
        }
    })
}

resetBttn.addEventListener('click', () => {
    game.resetGame();
    clearBoard();
})

  