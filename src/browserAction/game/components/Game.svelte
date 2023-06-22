<script>
  import { GameManager } from "../GameManager";
  import Board from "./Board.svelte";
  import ScoreDisplay from "./ScoreDisplay.svelte";

  let game = new GameManager();

  let finishedLevel = false;

  let explosionId = undefined;

  let midClick = false;

  /**
   * Utils function for async code to delay for a certain time
   * @param ms How long we need to wait
   */
  async function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // TODO decide if this best way to handle this

  /**
   * Handles user "flipping" a hidden square open ant reacts accordingly
   * @param id The id of the square that was pressed
   */
  async function handleHiddenSquareFlip(id) {
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

  /**
   * Reacts to the user clicking with their mouse on a hidden square
   * @param event Clicking event used mainly for the id of the clicked square
   */
  async function handleHiddenClick(event) {
    handleHiddenSquareFlip(event.detail.id);
  }

  /**
   * Reacts to the user clicking with their mouse on a revealed square
   * @param event Clicking event used mainly for the id of the clicked square
   */
  function handleRevealClick(event) {
    if (midClick) return;

    midClick = true;

    game.selectedId = event.detail.id;

    midClick = false;
  }

  /**
   * Handles the user pressing one of the arrow keys and updates the selected square
   * @param key The key the user pressed
   */
  function handleArrowClick(key) {
    let { rowIndex, colIndex } = game.selectedId;
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

      default:
        break;
    }

    game.selectedId = { colIndex, rowIndex };
  }

  /**
   * Handles user pressing a keyboard button and acts accordingly
   * @param event The keyboard event mainly used for the key value
   */
  function handleOnKeydown(event) {
    key = event.key;
    // TODO maybe enable keybind selection

    if (key.includes("Arrow")) {
      handleArrowClick(key);
      return;
    }

    if (key === " ") {
      if (game.board[rowIndex][colIndex].isHidden) {
        handleHiddenSquareFlip(game.selectedId);
      }
    }
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
