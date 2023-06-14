<script>
  import { GameManager } from "../GameManager";
  import InfoSquare from "./InfoSquare.svelte";
  import ScoreDisplay from "./ScoreDisplay.svelte";
  import Square from "./Square.svelte";

  const infoColors = ["#e07050", "#40a840", "#e8a038", "#3090f8", "#c060e0"];

  let game = new GameManager();

  $: board = game.board;

  $: rowSums = game.rowSums;

  $: colSums = game.colSums;

  function handleHiddenClick(event) {
    console.log(event);
    const { rowIndex, colIndex } = event.detail.id;

    //TODO add animations when possible

    game.selectSquare(rowIndex, colIndex);
    game = game;
  }
</script>

<ScoreDisplay
  level={game.level}
  currentScore={game.currentScore}
  totalScore={game.totalScore}
/>

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
      color={infoColors[rowIndex]}
    />
  {/each}

  {#each colSums as { sum, voltorbCount }, index}
    <InfoSquare {sum} {voltorbCount} color={infoColors[index]} />
  {/each}
</div>

<!-- TODO find why padding is needed here -->
<style>
  .grid-container {
    user-select: none;

    display: grid;
    grid-template-columns: auto auto auto auto auto auto;
    row-gap: 16px;
    column-gap: 1px;
    padding: 30px;
  }
</style>
