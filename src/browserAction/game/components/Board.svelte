<script>
  import { GameManager } from "../GameManager";
  import InfoSquare from "./InfoSquare.svelte";
  import ScoreDisplay from "./ScoreDisplay.svelte";
  import Square from "./Square.svelte";

  const game = new GameManager();

  $: board = game.board;

  $: rowSums = game.rowSums;

  $: colSums = game.colSums;

  function handleHiddenClick(event) {
    console.log(event);
    const id = event.detail.id;
    board[id.rowIndex][id.colIndex].isHidden = false;
  }
</script>

<ScoreDisplay />

<div class="grid-container">
  {#each board as row, rowIndex}
    {#each row as square, colIndex}
      <Square
        id={{ rowIndex, colIndex }}
        value={square.value}
        isHidden={square.isHidden}
        on:hiddenClick={handleHiddenClick}
      />
    {/each}

    <InfoSquare
      sum={rowSums[rowIndex].sum}
      voltorbCount={rowSums[rowIndex].voltorbCount}
    />
  {/each}

  {#each colSums as { sum, voltorbCount }}
    <InfoSquare {sum} {voltorbCount} />
  {/each}
</div>

<!-- TODO find why padding is needed here -->
<style>
  .grid-container {
    display: grid;
    grid-template-columns: auto auto auto auto auto auto;
    row-gap: 16px;
    column-gap: 1px;
    padding: 30px;
  }
</style>
