<script>
  import { GameManager } from "../GameManager";
  import InfoSquare from "./InfoSquare.svelte";
  import ScoreDisplay from "./ScoreDisplay.svelte";
  import Square from "./Square.svelte";

  const infoColors = ["#e07050", "#40a840", "#e8a038", "#3090f8", "#c060e0"];

  let game = new GameManager();

  let finishedLevel = false;

  let midClick = false;

  $: board = game.board;

  $: rowSums = game.rowSums;

  $: colSums = game.colSums;

  async function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function handleHiddenClick(event) {
    if (midClick) return;

    midClick = true;

    console.log(event);
    const { rowIndex, colIndex } = event.detail.id;

    //TODO add animations when possible

    const levelEnded = game.selectSquare(rowIndex, colIndex);
    game = game;

    if (levelEnded !== undefined) {
      // First square
      await delay(300);

      //TODO Add explode animation

      if (!levelEnded) {
        await delay(300);
      }

      finishedLevel = true;

      // Other squares update
      await delay(100);

      // TODO make alert look better
      alert(levelEnded ? "Game clear!" : "Oh no! You get 0 Coins!");
      game.updateLevel(levelEnded);

      await delay(50);
      finishedLevel = false;
      game = game;
    }

    midClick = false;
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
        isHidden={square.isHidden && !finishedLevel}
        rowGapColor={infoColors[rowIndex]}
        colGapColor={infoColors[colIndex]}
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
  <!-- TODO add memo here -->
</div>

<!-- TODO find why padding is needed here -->
<style>
  .grid-container {
    user-select: none;

    display: grid;
    grid-template-columns: auto auto auto auto auto auto;
    gap: 0px;
    padding: 30px;
  }
</style>
