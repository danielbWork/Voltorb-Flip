import { getLevelInfo } from "./LevelInfo";
import { BoardSquare, LineSum } from "./types";
// TODO see if this should be store
/**
 * Manages the game state and board
 */
export class GameManager {
  /**
   * The current level the player is on
   */
  level = 0;

  /**
   * The total score from the start of the game
   */
  totalScore = 0;

  /**
   * THe current score of the current game
   */
  currentScore = 0;

  /**
   * The number of valid number still left on the board until we need to go to the next level
   */
  validNumberCount = 0;

  /**
   * How many moves has the player made in this level, used if they fail the level
   */
  moveCount = 0;

  /**
   * The current board of the game
   */
  board: BoardSquare[][] = [];

  /**
   * The sums of values and voltorbs in each row
   */
  rowSums: LineSum[] = [];
  /**
   * The sums of values and voltorbs in each column
   */
  colSums: LineSum[] = [];

  selectedId = { rowIndex: 0, colIndex: 0 };

  constructor() {
    this.updateToLevel(0);
  }

  /**
   *  Updates the level for the board
   * @param wasSuccessful Whether or not the play found all 2s and 3s or not,
   * used to select if going back or forward in levels.
   */
  updateLevel(wasSuccessful: boolean) {
    if (wasSuccessful) {
      // TODO maybe add something for first time bitting level 8

      // 7 since we have 8 difficulty levels and starts at 0
      this.updateToLevel(Math.min(this.level + 1, 7));
    } else {
      this.currentScore = 0;
      this.updateToLevel(Math.min(this.level, Math.max(0, this.moveCount - 1)));
    }
  }

  /**
   * Updates the game state to a new level, updating all related fields
   * @param level The new level the game moved to
   */
  private updateToLevel(level: number) {
    this.level = level;

    this.totalScore += this.currentScore;
    this.currentScore = 0;
    this.moveCount = 0;

    this.board = this.generateBoard();
    this.calculateLineSums();
  }

  /**
   * Reveals teh square content and updates all relevant scores
   * @param row The row of the square
   * @param col  The column of the square
   * @returns undefined if voltorb wasn't selected or there are still 2 and or
   * 3s to find otherwise returns a boolean if was successful or not
   */
  selectSquare(row: number, col: number): any {
    const square = this.board[row][col];
    square.isHidden = false;

    if (square.value > 0) {
      this.moveCount++;

      // Avoids 0 multiplication
      this.currentScore =
        this.currentScore === 0
          ? square.value
          : this.currentScore * square.value;

      if (square.value > 1) {
        this.validNumberCount--;
      }

      if (this.validNumberCount === 0) {
        return true;
      }
    } else {
      return false;
    }
  }

  /**
   * Generates a basic board state
   */
  private generateBoard(): BoardSquare[][] {
    let board = [];

    const levelInfo = getLevelInfo(this.level);

    this.validNumberCount = levelInfo.double + levelInfo.triple;

    let numberSelection = [
      ...Array(levelInfo.double).fill(2),
      ...Array(levelInfo.triple).fill(3),
      ...Array(levelInfo.voltorb).fill(0),
      ...Array(
        25 - (levelInfo.double + levelInfo.triple + levelInfo.voltorb)
      ).fill(1),
    ];

    for (let rowIndex = 0; rowIndex < 5; rowIndex++) {
      const row = [];

      for (let colIndex = 0; colIndex < 5; colIndex++) {
        const removedRandomItemArray = numberSelection.splice(
          Math.floor(Math.random() * numberSelection.length),
          1
        );

        let value = removedRandomItemArray[0];

        // Shiny check
        if (value === 0 && Math.random() * 8192 === 0) {
          value = -1;
        }

        row.push({
          isHidden: true,
          value,
          memos: [false, false, false, false],
        });
      }

      board.push(row);
    }

    return board;
  }

  /**
   * Calculates the sums of the rows and columns on the board
   */
  private calculateLineSums() {
    //TODO check if better to have the calculation for both happen at the same time

    // Calculates the rows
    this.rowSums = this.board.map((row) => {
      let sums = { sum: 0, voltorbCount: 0 };

      row.forEach((element) => {
        if (element.value <= 0) {
          sums.voltorbCount++;
        } else {
          sums.sum += element.value;
        }
      });
      return sums;
    });

    this.colSums = [];

    // Calculation for columns is a bit mor complex
    for (let col = 0; col < this.board[0].length; col++) {
      let sums = { sum: 0, voltorbCount: 0 };

      // Goes over each row
      this.board.forEach((row) => {
        const square = row[col];
        if (square.value <= 0) {
          sums.voltorbCount++;
        } else {
          sums.sum += square.value;
        }
      });

      this.colSums.push(sums);
    }
  }
}
