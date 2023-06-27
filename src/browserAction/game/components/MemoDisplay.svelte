<script>
  import { createEventDispatcher } from "svelte";
  import { fly } from "svelte/transition";

  /**
   * @type {boolean} Whether or not the buttons should be displayed or not
   */
  export let isMemoOpen;

  /**
   * @type {boolean[]} The selected memos of the selected block
   */
  export let memos;

  const dispatch = createEventDispatcher();

  /**
   * Notifies parent that a memo was toggled
   */
  function onToggleMemo() {
    dispatch("memoToggled");
  }
</script>

{#if isMemoOpen}
  <div class="container" transition:fly={{ x: 50, duration: 500 }}>
    <input type="checkbox" bind:checked={memos[0]} on:change={onToggleMemo} />
    <input type="checkbox" bind:checked={memos[1]} on:change={onToggleMemo} />
    <input type="checkbox" bind:checked={memos[2]} on:change={onToggleMemo} />
    <input type="checkbox" bind:checked={memos[3]} on:change={onToggleMemo} />
  </div>
{/if}

<!-- TODO remove left margin after adding other buttons -->
<style>
  .container {
    height: 68px;
    width: 68px;
    margin-top: -20px;
    margin-left: 386px;
    outline: 3px solid #404040;
    border: 3px solid #906860;
    background-color: #e89880;
    border-radius: 1px;
    display: grid;
    grid-template-columns: auto auto;
    gap: 0px;
  }

  /* .memo-button-shown {
  }

  .memo-button-disabled {
  } */
</style>
