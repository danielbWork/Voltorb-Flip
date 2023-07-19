<script>
  import {
    hasFinishedLevel,
    isDialogOpen,
    isExploding,
    selectedSquare,
  } from "../stores";
  import Board from "./Board.svelte";
  import MemoDisplay from "./MemoDisplay.svelte";
  import ScoreDisplay from "./ScoreDisplay.svelte";
  import { isMemoOpen, selectedId, game } from "../stores";

  import KeyEventsHandler from "./KeyEventsHandler.svelte";
  import DialogHandler from "./dialogs/DialogHandler.svelte";

  let isMidClick = false;

  let dialogHandlerModal;

  let rulesModal;

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
        await delay(1000);
      }
      $isExploding = false;

      const message = levelEnded
        ? `Game clear!\nYou received ${$game.currentScore} Coin(s)!`
        : "Oh no! You get 0 Coins!";

      dialogHandlerModal.showLevelDialog(message);

      // waits until the dialog is closed
      while ($isDialogOpen) {
        await delay(100);
      }

      $hasFinishedLevel = true;

      // Other squares update
      await delay(600);

      $game.updateLevel(levelEnded);

      await delay(200);
      $hasFinishedLevel = false;

      $game = $game;
      $selectedId = { row: 0, col: 0 };
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
<div class="footer">
  <button
    on:click={() => {
      dialogHandlerModal.showSettings();
    }}>Settings</button
  >
  <button
    on:click={() => {
      dialogHandlerModal.showRules();
    }}>Rules</button
  >

  <MemoDisplay />
</div>
<KeyEventsHandler
  ignoreOnKeyDown={isMidClick || rulesModal?.isOpen()}
  on:flipSelectedSquare={() => {
    handleHiddenSquareFlip($selectedId);
  }}
/>

<DialogHandler bind:this={dialogHandlerModal} />

<style>
  .footer {
    display: flex;
    flex-direction: row;
    padding-left: 15px;
    margin-top: -20px;
  }

  @font-face {
    font-family: pokemon;
    src: url(/assets/fonts/pokemon-ds-font.ttf);
  }
  button {
    background-image: url("/assets/icons/button_background.svg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
    font-family: pokemon;
    width: 150px;
    height: 40px;
    padding: 4px;
    font-size: 22px;
    text-align: center;
    margin: 4px;
    margin-top: 10px;
    margin-left: 10px;
    color: #f7f7f7;
    text-shadow: 1px 0px #373737, 0px 1px #373737, -1px 0px #373737,
      0px -1px #373737;
    outline: 0px;
    border: 0px;
  }
</style>
