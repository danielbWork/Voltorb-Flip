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

<!-- TODO Fix out line to match actual ui -->
<!-- TODO maybe choose better images -->
{#if isHidden}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <img on:click={onHiddenClick} alt="hidden" src="/icons/hidden_square.png" />
{:else if value === -1}
  <img alt="0" src="/icons/shiny_voltorb.png" />
{:else if value === 0}
  <img alt="0" src="/icons/voltorb.png" />
{:else if value === 1}
  <img alt="1" src="/icons/square_1.png" />
{:else if value === 2}
  <img alt="2" src="/icons/square_2.png" />
{:else if value === 3}
  <img alt="3" src="/icons/square_3.png" />
{/if}

<style>
  img {
    width: 50px;
    height: 50px;
    border: 2px solid #282828;
    outline: 4px solid #d0e8e0;
  }
</style>
