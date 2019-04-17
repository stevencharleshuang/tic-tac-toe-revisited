$(document).ready(() => {
  // JQ Selectors
  const $document = $(document);
  const $body = $(document.body);
  const $gameArea = $('.game-area');
  const $messageBox = $('.messageBox');
  let $tile;

  // JS Var Decs
  let boardArr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  let curPlayer = 'x';

  const createBoard = () => {
    for (let i = 0; i < 9; i += 1) {
      $tile = `<div class="tile" id="tile-${i}" data-id="${i}" />`;
      $($gameArea).append($tile);      
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
      console.log(`player ${player} wins`);
    }
  };

  const handleTileClick = (e) => {
    let tileNum = e.target.dataset.id;
    console.log('handling tile click', e.target.dataset.id);
    if (typeof boardArr[tileNum] === 'number' ) {
      $(`#tile-${tileNum}`).append(`<div class="player-mark">${curPlayer}</div>`);

      if (curPlayer === 'x') {
        boardArr[tileNum] = 'x';
        checkWin(curPlayer);
        curPlayer = 'o';
      } else {
        boardArr[tileNum] = 'o';
        checkWin(curPlayer);
        curPlayer = 'x';
      }
    } else {
      console.log('tile is occupied');
    }
  };

  // Init Board
  createBoard();

  $tile = $('.tile');
  $($tile).on('click', (e) => handleTileClick(e));
});