/**
 * The info of a square on the board
 */
export type BoardSquare = {
  isHidden: boolean;
  value: number;
  memos: boolean[];
};

/**
 * The info of a row/col on the board
 */
export type LineSum = {
  sum: number;
  voltorbCount: number;
};

/**
 * And id marking the placement of square on the board
 */
export type SquareId = {
  row: number;
  col: number;
};
