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

  const dispatch = createEventDispatcher();

  function onHiddenClick() {
    dispatch("hiddenClick", { id });
  }
</script>

<!-- TODO add red overlay for last selected should work the same with memo -->

<div class="flip-box">
  <div class="flip-box-inner" class:flip-it={!isHidden}>
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

    <div class="flip-box-back">
      <!-- TODO maybe choose better images -->
      {#if value === -1}
        <img alt="0" src="/icons/shiny_voltorb.png" draggable="false" />
      {:else if value === 0}
        <img alt="0" src="/icons/voltorb.png" draggable="false" />
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

<style>
  img {
    margin-bottom: -2px;
    width: inherit;
    height: inherit;
  }

  /* The flip box container - set the width and height to whatever you want. We have added the border property to demonstrate that the flip itself goes out of the box on hover (remove perspective if you don't want the 3D effect */
  .flip-box {
    width: 54px;
    height: 54px;
    border-radius: 1px;
    outline: 4px solid #d0e8e0;
    background-color: #d0e8e0;
    perspective: 1000px; /* Remove this if you don't want the 3D effect */
    display: block;
  }

  /* This container is needed to position the front and back side */
  .flip-box-inner {
    transition: transform 0.3s;
    transform-style: preserve-3d;
    border: 2px solid #282828;
    width: 50px;
    height: 50px;
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
