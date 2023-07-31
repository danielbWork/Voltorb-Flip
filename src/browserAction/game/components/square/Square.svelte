<script>
  import { createEventDispatcher } from "svelte";
  import SquareMemo from "./SquareMemo.svelte";
  import RevealedSquareImage from "./RevealedSquareImages.svelte";
  import {
    hasFinishedLevel,
    isChangingLevels,
    isExploding,
    isInTab,
    isMemoOpen,
  } from "../../stores";

  /**
   * @type {import ("../../types.js").BoardSquare} The Square this represents
   */
  export let square;

  /**
   * @type The id of the square to notify events
   */
  export let id;

  /**
   * @type {number} The color used for the line between this square and the one to the right of it
   */
  export let rowGapColor;

  /**
   * @type {number} The color used for the line between this square and the one below it
   */
  export let colGapColor;

  /**
   * @type {boolean} Marks this square as the last one selected by the user
   */
  export let selected;

  const dispatch = createEventDispatcher();

  function onHiddenClick() {
    dispatch("hiddenClick", { id });
  }

  function onRevealClick() {
    dispatch("revealClick", { id });
  }
</script>

<div class="grided-square">
  <div
    class="flip-box"
    class:flip-box-selected={selected}
    class:flip-box-selected-memo={selected && $isMemoOpen}
  >
    <div
      class="flip-box-inner"
      class:flip-it={(!square.isHidden || $hasFinishedLevel) &&
        !$isChangingLevels}
      class:flip-box-inner-selected={selected}
      class:flip-box-inner-selected-memo={selected && $isMemoOpen}
    >
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="flip-box-front" on:click={onHiddenClick}>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <img
          class="square-image"
          alt="hidden"
          src="/assets/icons/hidden_square.png"
          draggable="false"
        />

        <SquareMemo
          memos={square.memos}
          displayPencil={$isMemoOpen && selected}
        />
      </div>

      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="flip-box-back" on:click={onRevealClick}>
        <RevealedSquareImage
          value={square.value}
          hasExploded={selected && $isExploding}
        />
      </div>
    </div>
  </div>

  <div
    class="row-line"
    style="background-color: {rowGapColor};"
    class:row-line-popup={!$isInTab}
  />
  <div class="col-line" style="background-color: {colGapColor};" />
</div>

<style>
  .grided-square {
    display: grid;
    grid-template-columns: auto auto;
    gap: 0px;
  }

  .row-line {
    width: 21px;
    height: 12px;
    border-top: 6px solid #d0e8e0;
    border-bottom: 6px solid #d0e8e0;
    margin-top: 28px;
    z-index: 0;
  }

  /* For pop up display specifically */
  .row-line-popup {
    width: 30px;
  }

  .col-line {
    width: 12px;
    height: 18px;
    border: 6px solid #d0e8e0;
    margin-left: 28px;
    z-index: 0;
  }

  .square-image {
    margin-bottom: -3px;
    width: inherit;
    height: inherit;
    z-index: -1;
  }

  /* The flip box container - set the width and height to whatever you want. We have added the border property to demonstrate that the flip itself goes out of the box on hover (remove perspective if you don't want the 3D effect */
  .flip-box {
    width: 81px;
    height: 81px;
    border-radius: 1px;
    outline: 6px solid #d0e8e0;
    background-color: #404040;
    perspective: 1000px; /* Remove this if you don't want the 3D effect */
    display: block;
    z-index: 1;
  }

  .flip-box-selected {
    outline: 6px solid #683028;
    z-index: 3;
  }

  .flip-box-selected-memo {
    outline: 6px solid #785820;
  }

  /* This container is needed to position the front and back side */
  .flip-box-inner {
    transition: transform 0.3s;
    transform-style: preserve-3d;
    border: 3px solid #282828;
    width: 75px;
    height: 75px;
  }

  .flip-box-inner-selected {
    border-radius: 3px;
    outline: 6px solid #f84030;
    border-spacing: 0px;
    border: 3px solid #f84030;
    outline-offset: -3px;
  }

  .flip-box-inner-selected-memo {
    outline: 6px solid #f8b830;
    border: 3px solid #f8b830;
  }

  /* Do an horizontal flip when you move the mouse over the flip box container */
  .flip-it {
    transform: rotateY(-180deg);
  }

  /* Position the front and back side */
  .flip-box-front,
  .flip-box-back {
    position: fixed;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
  }

  .flip-box-front {
    display: flex;
  }

  /* Style the back side */
  .flip-box-back {
    display: inline;
    transform: rotateY(-180deg);
  }
</style>
