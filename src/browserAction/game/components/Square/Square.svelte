<script>
  import { createEventDispatcher } from "svelte";
  import SquareMemo from "./SquareMemo.svelte";
  import RevealedSquareImage from "./RevealedSquareImages.svelte";
  import { hasFinishedLevel, isExploding, isMemoOpen } from "../../stores";

  // TODO decide if should add slots for ui in this and info squares

  /**
   * @type {import ("../../types.js").BoardSquare} The Square this represents
   */
  export let square;

  // TODO update ids to have type (row, col)
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

<!-- TODO Create better quality versions of current pictures as they look bad-->

<div class="grided-square">
  <div
    class="flip-box"
    class:flip-box-selected={selected}
    class:flip-box-selected-memo={selected && $isMemoOpen}
  >
    <div
      class="flip-box-inner"
      class:flip-it={!square.isHidden || $hasFinishedLevel}
      class:flip-box-inner-selected={selected}
      class:flip-box-inner-selected-memo={selected && $isMemoOpen}
    >
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="flip-box-front" on:click={onHiddenClick}>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <img
          class="square-image"
          alt="hidden"
          src="/icons/hidden_square.png"
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

  <div class="row-line" style="background-color: {rowGapColor};" />
  <div class="col-line" style="background-color: {colGapColor};" />
</div>

<style>
  .grided-square {
    display: grid;
    grid-template-columns: auto auto;
    gap: 0px;
  }

  .row-line {
    width: 14px;
    height: 10px;
    border-top: 4px solid #d0e8e0;
    border-bottom: 4px solid #d0e8e0;
    margin-top: 17px;
    z-index: 2;
  }

  .col-line {
    width: 10px;
    height: 14px;
    border: 4px solid #d0e8e0;
    margin-left: 17px;
    z-index: 2;
  }

  .square-image {
    margin-bottom: -2px;
    width: inherit;
    height: inherit;
    z-index: -1;
  }

  /* The flip box container - set the width and height to whatever you want. We have added the border property to demonstrate that the flip itself goes out of the box on hover (remove perspective if you don't want the 3D effect */
  .flip-box {
    width: 54px;
    height: 54px;
    border-radius: 1px;
    outline: 4px solid #d0e8e0;
    background-color: #404040;
    perspective: 1000px; /* Remove this if you don't want the 3D effect */
    display: block;
    z-index: 1;
  }

  /* TODO see if selected overlay can look better/ fix the stupid lines not being equal */
  .flip-box-selected {
    outline: 4px solid #683028;
    z-index: 3;
  }

  .flip-box-selected-memo {
    outline: 4px solid #785820;
  }

  /* This container is needed to position the front and back side */
  .flip-box-inner {
    transition: transform 0.3s;
    transform-style: preserve-3d;
    border: 2px solid #282828;
    width: 50px;
    height: 50px;
  }

  .flip-box-inner-selected {
    border-radius: 2px;
    outline: 4px solid #f84030;
    border-spacing: 0px;
    border: 2px solid #f84030;
    outline-offset: -2px;
  }

  .flip-box-inner-selected-memo {
    outline: 4px solid #f8b830;
    border: 2px solid #f8b830;
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
