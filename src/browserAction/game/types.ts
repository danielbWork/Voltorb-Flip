/**
 * The info of a square on the board
 */
export type BoardSquare = {
  isHidden: boolean;
  value: number;
};

/**
 * The info of a row/col on the board
 */
export type LineSum = {
  sum: number;
  voltorbCount: number;
};
