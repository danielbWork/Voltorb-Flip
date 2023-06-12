/**
 * The info regarding what values can appear in each level
 */
const levelInfo = [
  [
    { double: 3, triple: 1, voltorb: 6 },
    { double: 0, triple: 3, voltorb: 6 },
    { double: 5, triple: 0, voltorb: 6 },
    { double: 2, triple: 2, voltorb: 6 },
    { double: 4, triple: 1, voltorb: 6 },
  ],
  [
    { double: 1, triple: 3, voltorb: 7 },
    { double: 6, triple: 0, voltorb: 7 },
    { double: 3, triple: 2, voltorb: 7 },
    { double: 0, triple: 4, voltorb: 7 },
    { double: 5, triple: 1, voltorb: 7 },
  ],
  [
    { double: 2, triple: 3, voltorb: 8 },
    { double: 7, triple: 0, voltorb: 8 },
    { double: 4, triple: 2, voltorb: 8 },
    { double: 1, triple: 4, voltorb: 8 },
    { double: 6, triple: 1, voltorb: 8 },
  ],
  [
    { double: 3, triple: 3, voltorb: 8 },
    { double: 0, triple: 5, voltorb: 8 },
    { double: 8, triple: 0, voltorb: 10 },
    { double: 5, triple: 2, voltorb: 10 },
    { double: 2, triple: 4, voltorb: 10 },
  ],
  [
    { double: 7, triple: 1, voltorb: 10 },
    { double: 4, triple: 3, voltorb: 10 },
    { double: 1, triple: 5, voltorb: 10 },
    { double: 9, triple: 0, voltorb: 10 },
    { double: 6, triple: 2, voltorb: 10 },
  ],
  [
    { double: 3, triple: 4, voltorb: 10 },
    { double: 0, triple: 6, voltorb: 10 },
    { double: 8, triple: 1, voltorb: 10 },
    { double: 5, triple: 3, voltorb: 10 },
    { double: 2, triple: 5, voltorb: 10 },
  ],
  [
    { double: 7, triple: 2, voltorb: 10 },
    { double: 4, triple: 4, voltorb: 10 },
    { double: 1, triple: 6, voltorb: 13 },
    { double: 9, triple: 1, voltorb: 13 },
    { double: 6, triple: 3, voltorb: 10 },
  ],
  [
    { double: 0, triple: 7, voltorb: 10 },
    { double: 8, triple: 2, voltorb: 10 },
    { double: 5, triple: 4, voltorb: 10 },
    { double: 2, triple: 6, voltorb: 10 },
    { double: 7, triple: 3, voltorb: 10 },
  ],
];

/**
 * Selects the level info to use for the board
 * @param level The level we want to select from
 * @returns One of the optional level value selection to put on the board
 */
export function getLevelInfo(level: number) {
  return levelInfo[level][Math.floor(Math.random() * 5)];
}
