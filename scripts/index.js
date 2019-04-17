$(document).ready(() => {
  // JQ Selectors
  const $document = $(document);
  const $body = $(document.body);
  const $gameArea = $('.game-area');
  const $messageBox = $('.message-box');
  const $playerXScoreEl = $('#player-x-score');
  const $playerOScoreEl = $('#player-o-score');
  let $gameBoard;
  let $playAgain;
  let $tile;

  // JS Var Decs
  let boardArr;
  let curPlayer = 'x';
  let isGameOver = false;
  let turnCounter = 0;
  let playerXScore = 0;
  let playerOScore = 0;

  /**
   * @function createBoard
   * @description Creates the Tic Tac Toe Board
   */
  const createBoard = () => {
    boardArr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    $gameArea.append(`<div class="game-board" />`);
    $gameBoard = $('.game-board');
    for (let i = 0; i < 9; i += 1) {
      $tile = `<div class="tile" id="tile-${i}" data-id="${i}" />`;
      $($gameBoard).append($tile);      
    }
  };

  /**
   * @function checkWin
   * @description Checks if the current move wins the game for the current player
   * @param {string} player 
   */
  const checkWin = (player) => {
    if (
      // Horizontal line wins
      (boardArr[0] === boardArr[1] && boardArr[1] === boardArr[2]) ||
      (boardArr[3] === boardArr[4] && boardArr[4] === boardArr[5]) ||
      (boardArr[6] === boardArr[7] && boardArr[7] === boardArr[8]) ||
      // Vertical line wins
      (boardArr[0] === boardArr[3] && boardArr[3] === boardArr[6]) ||
      (boardArr[1] === boardArr[4] && boardArr[4] === boardArr[7]) ||
      (boardArr[2] === boardArr[5] && boardArr[5] === boardArr[8]) ||
      // Diagonal line wins
      (boardArr[0] === boardArr[4] && boardArr[4] === boardArr[8]) ||
      (boardArr[2] === boardArr[4] && boardArr[4] === boardArr[6])
      ) {
      // Notify the winners
      updateMsg(`Player ${player.toUpperCase()} Wins!`);
      
      // Update the state of the game
      isGameOver = true;
      
      // Update player scores
      if (player === 'x') {
        playerXScore += 1;
        $($playerXScoreEl).text(playerXScore.toString());
      } else {
        playerOScore += 1;
        $($playerOScoreEl).text(playerOScore.toString());
      }

      // Play again option
      $body.append(`<div class="play-again noselect">Play Again?</div>`);
      $playAgain = $('.play-again');
      $($playAgain).on('click', () => initBoard());
    } else if (turnCounter === 8) {
      updateMsg(`It's a draw!`);

      // Play again option
      $body.append(`<div class="play-again noselect">Play Again?</div>`);
      $playAgain = $('.play-again');
      $($playAgain).on('click', () => initBoard());

    } else {
      player === 'x' ? curPlayer = 'o' : curPlayer = 'x';
      turnCounter += 1;
      updateMsg(`Player ${curPlayer.toUpperCase()}'s move`);
    }
  };

  /**
   * @function handleTileClick
   * @description Event Handler for tile clicks
   * @param {object} e 
   */
  const handleTileClick = (e) => {
    if (!isGameOver) {
      let tileNum = e.target.dataset.id;
      // Conditional check for whether a tile has been played already
      if (typeof boardArr[tileNum] === 'number' ) {
        $(`#tile-${tileNum}`).append(`<div class="player-mark noselect">${curPlayer}</div>`);
        // Updates tile and calls checkWin() based on current player
        if (curPlayer === 'x') {
          boardArr[tileNum] = 'x';
          checkWin(curPlayer);
        } else {
          boardArr[tileNum] = 'o';
          checkWin(curPlayer);
        }
      } else {
        updateMsg('That tile\`s occupied, bub', true);
      }
    }
  };

  /**
   * @function updateMsg
   * @description Updates the message box temproarily or semi-permanently given an input message
   * @param {string} msg 
   * @param {Boolean} isTemporary 
   */
  const updateMsg = (msg, isTemporary = false) => {
    if (!isTemporary) {
      // Semi-permanent message update
      $($messageBox).text(msg);
    } else {
      // Temporary message update
      let prevText = $($messageBox).text();

      $($messageBox).text(msg);
      // Restore message text to previous message after 1.5 sec
      setTimeout(() => $($messageBox).text(prevText), 1500);
    }
  }

  /**
   * @function initBoard
   * @description Initializes the Tic Tac Toe board
   */
  const initBoard = () => { 
    if ($gameArea.children().length > 0) {
      $gameBoard.remove();
      $playAgain.remove();
    }
    // Init the boardArr, create the board, init the player at turn, init isGameOver var, adds event handler to tiles
    boardArr = [];
    createBoard();
    curPlayer = 'x';
    updateMsg('Player X\'s move');
    isGameOver = false;
    turnCounter = 0;
    $tile = $('.tile');
    $($tile).on('click', (e) => handleTileClick(e));
  }

  initBoard();
});

