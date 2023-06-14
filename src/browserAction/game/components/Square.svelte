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

<div class="container">
  <div class="overlay" />

  <!-- TODO Fix outline to match actual ui -->
  <!-- TODO maybe choose better images -->
  {#if isHidden}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <img
      on:click={onHiddenClick}
      alt="hidden"
      src="/icons/hidden_square.png"
      draggable="false"
    />
  {:else if value === -1}
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

<style>
  .container {
    display: flex;
  }
  .overlay {
    position: fixed;
    width: 53px;
    height: 53px;
    z-index: 1;
    border-radius: 1px;
    outline: 4px solid #d0e8e0;
  }
  img {
    margin-bottom: -2px;
    z-index: 2;
    width: 50px;
    height: 50px;
    border: 2px solid #282828;
  }
</style>
