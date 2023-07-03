<script>
  import { GameManager } from "../GameManager";
  import { hasFinishedLevel, isExploding } from "../stores";
  import Board from "./Board.svelte";
  import MemoDisplay from "./MemoDisplay.svelte";
  import ScoreDisplay from "./ScoreDisplay.svelte";
  import { isMemoOpen, selectedId } from "../stores";

  let game = new GameManager();

  let midClick = false;

  $: selectedSquareMemos = game.board[$selectedId.row][$selectedId.col].memos;

  /**
   * Utils function for async code to delay for a certain time
   * @param {number} ms How long we need to wait
   */
  async function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Handles user "flipping" a hidden square open ant reacts accordingly
   * @param {import ("../types").SquareId} id The id of the square that was pressed
   */
  async function handleHiddenSquareFlip(id) {
    if (midClick) return;

    midClick = true;

    $selectedId = id;

    const levelEnded = game.selectSquare(id);
    game = game;

    if (levelEnded !== undefined) {
      // First square
      await delay(300);

      if (!levelEnded) {
        $isExploding = true;
        await delay(700);
      }
      $isExploding = false;
      $hasFinishedLevel = true;

      // Other squares update
      await delay(100);

      // TODO make alert look better
      alert(levelEnded ? "Game clear!" : "Oh no! You get 0 Coins!");
      game.updateLevel(levelEnded);

      await delay(50);
      $hasFinishedLevel = false;
      game = game;
    }

    midClick = false;
    $isMemoOpen = false;
  }

  /**
   * Reacts to the user clicking with their mouse on a hidden square
   * @param event Clicking event used mainly for the id of the clicked square
   */
  async function handleHiddenClick(event) {
    if (!$isMemoOpen) {
      handleHiddenSquareFlip(event.detail.id);
    } else {
      $selectedId = event.detail.id;
    }
  }

  /**
   * Reacts to the user clicking with their mouse on a revealed square
   * @param event Clicking event used mainly for the id of the clicked square
   */
  function handleRevealClick(event) {
    if (midClick) return;

    midClick = true;

    $selectedId = event.detail.id;

    midClick = false;
  }

  /**
   * Handles the user pressing one of the arrow keys and updates the selected square
   * @param key The key the user pressed
   */
  function handleArrowClick(key) {
    let { row, col } = $selectedId;
    switch (key) {
      case "ArrowUp":
        row--;

        if (row < 0) row = 4;

        break;
      case "ArrowDown":
        row++;

        if (row > 4) row = 0;

        break;
      case "ArrowLeft":
        col--;

        if (col < 0) col = 4;

        break;
      case "ArrowRight":
        col++;

        if (col > 4) col = 0;

        break;

      default:
        break;
    }

    $selectedId = { row, col };
  }

  /**
   * Handles the user pressing one of the number keys and updates the selected square
   * @param key The key the user pressed
   */
  function handleNumberKey(key) {
    switch (key) {
      case "`":
      case "0":
        selectedSquareMemos[0] = !selectedSquareMemos[0];
        break;
      case "1":
        selectedSquareMemos[1] = !selectedSquareMemos[1];
        break;
      case "2":
        selectedSquareMemos[2] = !selectedSquareMemos[2];
        break;
      case "3":
        selectedSquareMemos[3] = !selectedSquareMemos[3];
        break;

      default:
        break;
    }

    // Needed to refresh
    game.board = game.board;
  }

  // TODO Move all keyboard stuff somewhere else

  /**
   * Handles user pressing a keyboard button and acts accordingly
   * @param event The keyboard event mainly used for the key value
   */
  function handleOnKeydown(event) {
    if (midClick) return;

    key = event.key;
    // TODO maybe enable keybind selection

    if (key.includes("Arrow")) {
      handleArrowClick(key);
      return;
    }

    if (key.match("\\d") || key.includes("`")) {
      handleNumberKey(key);
    }

    if (key === " ") {
      if (game.board[$selectedId.row][$selectedId.col].isHidden) {
        handleHiddenSquareFlip($selectedId);
      }
    }

    if (key === "x") {
      $isMemoOpen = !$isMemoOpen;
    }
  }

  /**
   * Reacts to a user toggle a memo value
   */
  function handleOnMemoToggle() {
    // Needed to refresh
    game.board = game.board;
  }
</script>

<ScoreDisplay
  level={game.level}
  currentScore={game.currentScore}
  totalScore={game.totalScore}
/>

<Board
  {game}
  on:hiddenClick={handleHiddenClick}
  on:revealClick={handleRevealClick}
/>

<!-- TODO add settings and about page -->

<MemoDisplay memos={selectedSquareMemos} on:memoToggled={handleOnMemoToggle} />

<svelte:window on:keydown|preventDefault={handleOnKeydown} />
