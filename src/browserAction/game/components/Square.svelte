<script>
  import { createEventDispatcher } from "svelte";

  /**
   * @param {number} value The value of the square of 0 or -1 is a voltorb
   */
  export let value;
  /**
   * @param {boolean} isHidden Whether or not the square should display it's value or not
   */
  export let isHidden; //TODO see how should update

  /**
   * @param id The id of the square to notify events
   */
  export let id;

  /**
   * @param {number} rowGapColor The color used for the line between this square and the one to the right of it
   */
  export let rowGapColor;

  /**
   * @param {number} colGapColor The color used for the line between this square and the one below it
   */
  export let colGapColor;

  /**
   * @param {boolean} hasExploded Whether or not the explosion animation should be displayed here
   */
  export let hasExploded;

  /**
   * @param {boolean} selected Marks this square as the last one selected by the user
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

<!-- TODO add red overlay for last selected should work the same with memo -->

<div class="grided-square">
  <div class="flip-box" class:flip-box-selected={selected}>
    <div
      class="flip-box-inner"
      class:flip-it={!isHidden}
      class:flip-box-inner-selected={selected}
    >
      <div class="flip-box-front">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <img
          on:click={onHiddenClick}
          alt="hidden"
          src="/icons/hidden_square.png"
          draggable="false"
        />
        <div class="overlay" />
      </div>

      <div class="flip-box-back" on:click={onRevealClick}>
        <!-- TODO maybe choose better images -->
        {#if value === -1}
          <img alt="0" src="/icons/shiny_voltorb.png" draggable="false" />
        {:else if value === 0}
          <div class="voltorb-parent">
            {#if hasExploded}
              <img
                alt="0"
                src="/icons/explosion.gif"
                draggable="false"
                class="explosion"
              />
            {/if}
            <img alt="0" src="/icons/voltorb.png" draggable="false" />
          </div>
        {:else if value === 1}
          <img alt="1" src="/icons/square_1.png" draggable="false" />
        {:else if value === 2}
          <img alt="2" src="/icons/square_2.png" draggable="false" />
        {:else if value === 3}
          <img alt="3" src="/icons/square_3.png" draggable="false" />
        {/if}
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
    width: 16px;
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

  .voltorb-parent {
    width: 50px;
    height: 50px;
    position: relative;
  }

  .voltorb-parent > img {
    position: fixed;
  }

  img {
    margin-bottom: -2px;
    width: inherit;
    height: inherit;
    z-index: -1;
  }

  .explosion {
    z-index: 2;
    width: inherit;
    height: inherit;
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

  /* TODO see if selected overlay can look better */
  .flip-box-selected {
    outline: 6px solid #683028;
    z-index: 3;
    outline-offset: -2px;
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
    display: inline;
  }

  /* Style the back side */
  .flip-box-back {
    transform: rotateY(-180deg);
  }
</style>
