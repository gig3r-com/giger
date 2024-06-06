import Minesweeper from "..";

const keyMap: { [key: number]: (event: KeyboardEvent) => void } = {
  13: enter,
  37: leftArrow,
  38: upArrow,
  39: rightArrow,
  40: downArrow,
  67: c,
  70: f,
};

const listener = (event: KeyboardEvent) => {
  const keyAction = keyMap[event.keyCode];
  if (!keyAction || typeof keyAction!== 'function') return;
  keyAction(event);
}

export function setupWindowListener() {
  window.addEventListener('keydown', listener);
}

export function unregisterWindowListener() {
  window.removeEventListener('keydown', listener);
}

function enter(event: KeyboardEvent) {
  event.preventDefault();
  Minesweeper.enterSelect();
}

function leftArrow(event: KeyboardEvent) {
  event.preventDefault();
  Minesweeper.moveLeft();
}

function upArrow(event: KeyboardEvent) {
  event.preventDefault();
  Minesweeper.moveUp();
}

function rightArrow(event: KeyboardEvent) {
  event.preventDefault();
  Minesweeper.moveRight();
}

function downArrow(event: KeyboardEvent) {
  event.preventDefault();
  Minesweeper.moveDown();
}

function f(event: KeyboardEvent) {
  event.preventDefault();
  Minesweeper.toggleFlag();
}

function c(event: KeyboardEvent) {
  event.preventDefault();
  Minesweeper.gameCanceled();
}
