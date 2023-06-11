<script>
  import { getLevelInfo } from "../LevelInfo";
  import ScoreDisplay from "./ScoreDisplay.svelte";
  import Square from "./Square.svelte";

  // TODO Check if we want this here or maybe in some game manager
  /**
   * Generates a basic board state
   * @param level The level which determines how much of each value can appear in the board
   */
  function generateBoard(level) {
    let board = [];

    const levelInfo = getLevelInfo(level);

    const numberSelection = [
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
        const value =
          numberSelection[Math.floor(Math.random() * numberSelection.length)];

        // TODO Add minus chance for shiny
        row.push({ isHidden: true, value });
      }

      board.push(row);
    }

    return board;
  }

  function handleHiddenClick(event) {
    console.log(event);
    const id = event.detail.id;
    board[id.rowIndex][id.colIndex].isHidden = false;
  }

  let board = generateBoard(0);
  console.log(board);
</script>

<ScoreDisplay />
{#each board as row, rowIndex}
  {#each row as square, colIndex}
    <Square
      id={{ rowIndex, colIndex }}
      value={square.value}
      isHidden={square.isHidden}
      on:hiddenClick={handleHiddenClick}
    />
  {/each}
{/each}

<!-- TODO add squares and memo ast table (plus info squares) -->
