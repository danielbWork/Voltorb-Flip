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

  let explosionId = undefined;

  let selectedId = { rowIndex: 0, colIndex: 0 };

  function compareIds(a, b) {
    return (
      a === b || (a?.rowIndex === b?.rowIndex && a?.colIndex === b?.colIndex)
    );
  }

  async function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function handleSquareSelection(id) {
    if (midClick) return;

    midClick = true;

    const { rowIndex, colIndex } = id;

    selectedId = id;

    const levelEnded = game.selectSquare(rowIndex, colIndex);
    game = game;

    if (levelEnded !== undefined) {
      // First square
      await delay(300);

      if (!levelEnded) {
        explosionId = event.detail.id;
        await delay(700);
      }
      explosionId = undefined;
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

  async function handleHiddenClick(event) {
    handleSquareSelection(event.detail.id);
  }

  function handleRevealClick(event) {
    if (midClick) return;

    midClick = true;

    selectedId = event.detail.id;

    midClick = false;
  }

  function handleOnKeydown(event) {
    key = event.key;
    console.log(event);
    console.log(key);

    let { rowIndex, colIndex } = selectedId;
    // TODO maybe enable keybind selection
    switch (key) {
      case "ArrowUp":
        rowIndex--;

        if (rowIndex < 0) rowIndex = 4;

        break;
      case "ArrowDown":
        rowIndex++;

        if (rowIndex > 4) rowIndex = 0;

        break;
      case "ArrowLeft":
        colIndex--;

        if (colIndex < 0) colIndex = 4;

        break;
      case "ArrowRight":
        colIndex++;

        if (colIndex > 4) colIndex = 0;

        break;

      case " ":
        if (board[rowIndex][colIndex].isHidden) {
          handleSquareSelection(selectedId);
        }

        break;

      default:
        break;
    }

    selectedId = { colIndex, rowIndex };
  }
</script>

<ScoreDisplay
  level={game.level}
  currentScore={game.currentScore}
  totalScore={game.totalScore}
/>
<!-- TODO Check first explosion being weird -->
<div class="grid-container">
  {#each board as row, rowIndex}
    {#each row as square, colIndex}
      <Square
        id={{ rowIndex, colIndex }}
        value={square.value}
        isHidden={square.isHidden && !finishedLevel}
        rowGapColor={infoColors[rowIndex]}
        colGapColor={infoColors[colIndex]}
        hasExploded={compareIds(explosionId, { rowIndex, colIndex })}
        selected={compareIds(selectedId, { rowIndex, colIndex })}
        on:hiddenClick={handleHiddenClick}
        on:revealClick={handleRevealClick}
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

<svelte:window on:keydown|preventDefault={handleOnKeydown} />

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
