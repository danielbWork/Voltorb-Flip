<script>
  import { hasFinishedLevel, isExploding } from "../stores";
  import Board from "./Board.svelte";
  import MemoDisplay from "./MemoDisplay.svelte";
  import ScoreDisplay from "./ScoreDisplay.svelte";
  import { isMemoOpen, selectedId, game } from "../stores";
  import KeyEventsHandler from "./KeyEventsHandler.svelte";

  let isMidClick = false;

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
    if (isMidClick) return;

    isMidClick = true;

    $selectedId = id;

    const levelEnded = $game.selectSquare(id);
    $game = $game;

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
      $game.updateLevel(levelEnded);

      await delay(50);
      $hasFinishedLevel = false;
      $game = $game;
    }

    isMidClick = false;
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
    if (isMidClick) return;

    isMidClick = true;

    $selectedId = event.detail.id;

    isMidClick = false;
  }
</script>

<ScoreDisplay />

<Board on:hiddenClick={handleHiddenClick} on:revealClick={handleRevealClick} />

<!-- TODO add settings and about page -->

<MemoDisplay />

<KeyEventsHandler
  ignoreOnKeyDown={isMidClick}
  on:flipSelectedSquare={() => {
    handleHiddenSquareFlip($selectedId);
  }}
/>
