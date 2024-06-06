import moment from 'moment';
import Console from '../../Console';
import { LineType } from '../../Console/components/Output';
import {
  setupWindowListener,
  unregisterWindowListener,
} from './utils/keyEvents';

export default class Minesweeper {
  private readonly MAX_RATE = 2500;

  private drawCell: number = 0;

  private cols: number | undefined;

  private rows: number | undefined;

  private numberOfBombs: number | undefined;

  private numberOfCells: number | undefined;

  private rate: number | undefined;

  private gridData: any[] = [];

  private selectedFlags: number = 0;

  private startTime: number | undefined;

  private endTime: number | undefined;

  private time: number | undefined = 0;

  private timer;

  private isGameWon: boolean = false;

  private isGameOver: boolean = false;

  private gameNr: number = 0;

  private selectedRow: number = 1;

  private selectedCol: number = 1;

  init(cols, rows, numberOfBombs) {
    this.cols = Number(cols);
    this.rows = Number(rows);
    this.numberOfBombs = Number(numberOfBombs);
    this.numberOfCells = cols * rows;
    this.rate = numberOfBombs / this.numberOfCells;

    if (this.numberOfBombs > this.MAX_RATE) {
      Console.addLines(
        `Too big to handle, please have less than ${this.MAX_RATE} cells.`,
      );
      return false;
    }
    if (this.numberOfCells <= this.numberOfBombs) {
      Console.addLines('more bombs than cells not allowed!');
      return false;
    }
    this.gameNr++;
    this.gridData = this.getGridData();
    this.drawUI();
    this.drawMap();
    this.startTimer();
    Console.setInputHidden(true);
    setupWindowListener();
  }

  startTimer() {
    this.startTime = new Date().getTime();
    this.timer = setInterval(() => {
      this.time = Math.floor((new Date().getTime() - this.startTime) / 1000);
      this.reDrawUI();
      this.checkWin();
    }, 100);
  }

  getGridData() {
    const gridData = new Array(this.rows);
    for (let i = 0; i < this.rows; i++) {
      gridData[i] = [];
    }

    this.bombArray().forEach((isBomb: boolean, index: number) => {
      const x = Math.floor((index + 1) % this.cols) || this.cols;
      const y = Math.ceil((index + 1) / this.cols);
      const cell = {
        isBomb,
        x,
        y,
        mineCount: 0,
        isRevealed: false,
        isFlagged: false,
        neighborsCords: [],
      };
      gridData[y - 1].push(cell);
    });
    gridData.forEach((row) => {
      row.forEach((cell) => {
        const { x, y, isBomb, mineCount } = cell;
        const neighborsCords = [
          [x, y - 1],
          [x, y + 1],
          [x - 1, y - 1],
          [x - 1, y],
          [x - 1, y + 1],
          [x + 1, y - 1],
          [x + 1, y],
          [x + 1, y + 1],
        ];
        neighborsCords.forEach(([nx, ny]) => {
          if (nx < 1 || nx > this.cols || ny < 1 || ny > this.rows) {
            return;
          }
          gridData[y - 1][x - 1].neighborsCords.push({ nx, ny });
          if (isBomb) {
            gridData[ny - 1][nx - 1].mineCount += 1;
          }
        });
      });
    });
    return gridData;
  }

  clearMap() {
    Console.removeLine(`minesweeper-${this.gameNr}-row-border-up`);
    Console.removeLine(`minesweeper-${this.gameNr}-row-border-down`);
    for (let i = 0; i < this.rows; i++) {
      const y = i + 1;
      Console.removeLine(`minesweeper-${this.gameNr}-row-${y}`);
    }
  }

  reDrawMap() {
    this.clearMap();
    this.drawMap();
  }

  getUILine = () => {
    return `<span class="secondary-color minesweeper-title">Minesweeper</span><span class="minesweeper-bombs">Bombs: ${
      this.selectedFlags
    } / ${
      this.numberOfBombs
    }</span><span class="minesweeper-time">Time: ${moment
      .utc(this.time * 1000)
      .format('mm:ss')}s</span>`;
  };

  reDrawUI = () => {
    Console.changeLine(`minesweeper-${this.gameNr}-ui`, {
      id: `minesweeper-${this.gameNr}-ui`,
      html: this.getUILine(),
      className: 'minesweeper-ui',
      tag: 'div',
    });
  };

  drawUI = () => {
    Console.addLines([
      `<br />`,
      `<br />`,
      {
        id: `minesweeper-${this.gameNr}-ui`,
        html: this.getUILine(),
        tag: 'div',
      },
      `<br />`,
    ]);
  };

  drawMap(): void {
    const lines: (LineType | string)[] = [];
    let border = `<div class="minesweeper-line"></div><span class="minesweeper-border-cell">${' + '}</span>`;
    for (let i = 0; i < this.cols; i++) {
      border += `<span class="minesweeper-border-cell">${' - '}</span>`;
    }
    border += `<span class="minesweeper-border-cell">${' + '}</span></div>`;
    lines.push({
      id: `minesweeper-${this.gameNr}-row-border-up`,
      tag: 'div',
      html: border,
    });

    this.gridData.forEach((row, index) => {
      lines.push({
        id: `minesweeper-${this.gameNr}-row-${index + 1}`,
        tag: 'div',
        html: this.drawRow(row),
        className: `minesweeper-row ${
          this.selectedRow === index + 1 ? `minesweeper-selected` : ``
        }`,
      });
    });

    lines.push({
      id: `minesweeper-${this.gameNr}-row-border-down`,
      tag: 'div',
      html: border,
    });
    Console.addLines(lines);
  }

  drawRow(row: []): string {
    let rowLine = '';
    rowLine += `<span class="minesweeper-border-cell">${' | '}</span>`;
    row.forEach(({ x, y, isBomb, mineCount, isRevealed, isFlagged }) => {
      const selected = this.selectedCol === x;
      const doubleSelected = this.selectedRow === y && this.selectedCol === x;
      const cellInside = getCellInside();
      rowLine += `<span class="minesweeper-cell ${
        selected ? `minesweeper-selected` : ``
      } ${doubleSelected ? `minesweeper-selected-double` : ``} ${
        isRevealed ? 'minesweeper-revealed' : ''
      }" data-x=${x} data-y=${y}>${cellInside}</span>`;
      this.drawCell++;

      function getCellInside() {
        if (isFlagged && doubleSelected) {
          return `[&#9873;]`;
        }
        if (isFlagged) {
          return `&#9873;`;
        }
        if (!isRevealed && doubleSelected) {
          return `[&#183]`;
        }
        if (!isRevealed) {
          return `&#183`;
        }
        if (mineCount && doubleSelected) {
          return `[${mineCount}]`;
        }
        if (mineCount) {
          return `${mineCount}`;
        }
        if (isBomb) {
          return '[X]';
        }
        if (doubleSelected) {
          return `[&#183]`;
        }
        return `&#183`;
      }
    });
    rowLine += `<span class="minesweeper-border-cell">${' | '}</span>`;
    return rowLine;
  }

  bombArray() {
    const chance = Math.floor(this.rate * this.numberOfCells);
    const arr = [];
    for (let i = 0; i < chance; i++) {
      arr.push(true);
    }
    for (let n = 0; n < this.numberOfCells - chance; n++) {
      arr.push(false);
    }
    return this.shuffle(arr);
  }

  shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  moveRight() {
    this.selectedCol++;
    if (this.selectedCol >= this.cols) {
      this.selectedCol = this.cols;
    }
    this.reDrawMap();
  }

  moveLeft() {
    this.selectedCol--;
    if (this.selectedCol <= 1) {
      this.selectedCol = 1;
    }
    this.reDrawMap();
  }

  moveUp() {
    this.selectedRow--;
    if (this.selectedRow <= 1) {
      this.selectedRow = 1;
    }
    this.reDrawMap();
  }

  moveDown() {
    this.selectedRow++;
    if (this.selectedRow >= this.rows) {
      this.selectedRow = this.rows;
    }
    this.reDrawMap();
  }

  enterSelect() {
    this.select(this.selectedRow, this.selectedCol);
  }

  select(row, col) {
    const cell = this.gridData[row - 1][col - 1];
    if (cell.isRevealed) {
      return;
    }
    this.gridData[row - 1][col - 1].isRevealed = true;
    this.gridData[row - 1][col - 1].isFlagged = false;
    if (cell.isBomb) {
      this.gameOver();
    }
    if (cell.mineCount === 0) {
      cell.neighborsCords.forEach(({ nx, ny }) => {
        this.select(ny, nx);
        if (this.gridData[ny - 1][nx - 1].mineCount === 0) {
        }
      });
    }
    this.reDrawMap();
  }

  toggleFlag() {
    const cell = this.gridData[this.selectedRow - 1][this.selectedCol - 1];
    if (!cell.isRevealed) {
      const newValue = !cell.isFlagged;
      this.gridData[this.selectedRow - 1][this.selectedCol - 1].isFlagged =
        newValue;

      if (newValue) {
        this.selectedFlags++;
      } else {
        this.selectedFlags--;
      }
    }
  }

  checkWin() {
    const revealedCells = this.gridData.flat().filter(
      (cell) => cell.isRevealed
    );
    console.log(revealedCells.length, this.numberOfBombs, this.numberOfCells)
    if (revealedCells.length + this.numberOfBombs === this.numberOfCells) {
      this.gameWon();
    }
  }

  gameWon() {
    this.selectedFlags = this.numberOfBombs;
    this.reDrawUI();
    this.end();
    Console.addLines('Game Over - Won');
  }

  gameCanceled() {
    this.end();
    Console.addLines('Game Over - Canceled');
  }

  gameOver() {
    this.end();
    Console.addLines('Game Over - Failed');
  }

  end() {
    clearInterval(this.timer);
    unregisterWindowListener();
    Console.setInputHidden(false);
  }
}
