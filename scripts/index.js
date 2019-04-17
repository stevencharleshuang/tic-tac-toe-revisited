$(document).ready(() => {
  // JQ Selectors
  const $document = $(document);
  const $body = $(document.body);
  const $gameArea = $('.game-area');
  const $messageBox = $('.message-box');
  let $gameBoard;
  let $playAgain;
  let $tile;

  // JS Var Decs
  let boardArr;
  let curPlayer = 'x';
  let isGameOver = false;

  const createBoard = () => {
    boardArr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    $gameArea.append(`<div class="game-board" />`);
    $gameBoard = $('.game-board');
    for (let i = 0; i < 9; i += 1) {
      $tile = `<div class="tile" id="tile-${i}" data-id="${i}" />`;
      $($gameBoard).append($tile);      
    }
  };

  const checkWin = (player) => {
    console.log(boardArr);
    if (
      (boardArr[0] === boardArr[1] && boardArr[1] === boardArr[2]) ||
      (boardArr[3] === boardArr[4] && boardArr[4] === boardArr[5]) ||
      (boardArr[6] === boardArr[7] && boardArr[7] === boardArr[8]) ||
      (boardArr[0] === boardArr[3] && boardArr[3] === boardArr[6]) ||
      (boardArr[1] === boardArr[4] && boardArr[4] === boardArr[7]) ||
      (boardArr[2] === boardArr[5] && boardArr[5] === boardArr[8]) ||
      (boardArr[0] === boardArr[4] && boardArr[4] === boardArr[8]) ||
      (boardArr[2] === boardArr[4] && boardArr[4] === boardArr[6])
      ) {
      updateMsg(`Player ${player.toUpperCase()} Wins!`);
      isGameOver = true;
      $body.append(`<div class="play-again noselect">Play Again?</div>`);
      $playAgain = $('.play-again');
      $($playAgain).on('click', () => initBoard());
    } else {
      player === 'x' ? curPlayer = 'o' : curPlayer = 'x';
      updateMsg(`Player ${curPlayer.toUpperCase()}'s move`);
    }
  };

  const handleTileClick = (e) => {
    if (!isGameOver) {
      let tileNum = e.target.dataset.id;

      if (typeof boardArr[tileNum] === 'number' ) {
        $(`#tile-${tileNum}`).append(`<div class="player-mark noselect">${curPlayer}</div>`);
        
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

  const updateMsg = (msg, isTemporary = false) => {
    if (!isTemporary) {
      $($messageBox).text(msg);
    } else {
      let prevText = $($messageBox).text();

      $($messageBox).text(msg);
      setTimeout(() => $($messageBox).text(prevText), 1500);
    }
  }

  const initBoard = () => { 
    if ($gameArea.children().length > 0) {
      $gameBoard.remove();
      $playAgain.remove();
    }
    boardArr = [];
    createBoard();
    updateMsg('Player X\'s move');
    isGameOver = false;
    $tile = $('.tile');
    $($tile).on('click', (e) => handleTileClick(e));
  }

  initBoard();





});