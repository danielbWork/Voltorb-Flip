<script>
  import { GameManager } from "../GameManager";
  import Board from "./Board.svelte";
  import ScoreDisplay from "./ScoreDisplay.svelte";

  let game = new GameManager();

  let finishedLevel = false;

  let explosionId = undefined;

  let midClick = false;

  async function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // TODO decide if this best way to handle this

  async function handleSquareSelection(id) {
    if (midClick) return;

    midClick = true;

    const { rowIndex, colIndex } = id;

    game.selectedId = id;

    const levelEnded = game.selectSquare(rowIndex, colIndex);
    game = game;

    if (levelEnded !== undefined) {
      // First square
      await delay(300);

      if (!levelEnded) {
        explosionId = id;
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

    game.selectedId = event.detail.id;

    midClick = false;
  }

  function handleOnKeydown(event) {
    key = event.key;
    console.log(event);
    console.log(key);

    let { rowIndex, colIndex } = game.selectedId;
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
        if (game.board[rowIndex][colIndex].isHidden) {
          handleSquareSelection(game.selectedId);
        }

        break;

      default:
        break;
    }

    game.selectedId = { colIndex, rowIndex };
  }
</script>

<ScoreDisplay
  level={game.level}
  currentScore={game.currentScore}
  totalScore={game.totalScore}
/>

<Board
  {game}
  {explosionId}
  {finishedLevel}
  on:hiddenClick={handleHiddenClick}
  on:revealClick={handleRevealClick}
/>

<svelte:window on:keydown|preventDefault={handleOnKeydown} />
