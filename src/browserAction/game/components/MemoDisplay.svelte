<script>
  import { fly } from "svelte/transition";
  import { isMemoOpen, game, selectedSquare, isInTab } from "../stores";

  $: memos = $selectedSquare.isHidden
    ? $selectedSquare.memos
    : [false, false, false, false];

  /**
   * Notifies parent that a memo was toggled
   */
  function onToggleMemo() {
    // Needed to refresh the ui sadly
    $game.board = $game.board;
  }

  const checkedImages = [
    "memo_checked_0",
    "memo_checked_1",
    "memo_checked_2",
    "memo_checked_3",
  ];
  const uncheckedImages = [
    "memo_unchecked_0",
    "memo_unchecked_1",
    "memo_unchecked_2",
    "memo_unchecked_3",
  ];

  // const
</script>

{#if $isMemoOpen}
  <div
    class="container"
    class:container-popup={!$isInTab}
    transition:fly={{ x: 50, duration: 500 }}
  >
    {#each memos as memo, index}
      <input
        type="checkbox"
        bind:checked={memo}
        on:change={onToggleMemo}
        style={`background-image: url("/assets/icons/${
          memo ? checkedImages[index] : uncheckedImages[index]
        }.png");`}
      />
    {/each}
  </div>
{/if}

<style>
  .container {
    height: 102px;
    width: 102px;
    margin-left: 60px;
    outline: 4px solid #404040;
    border: 4px solid #906860;
    background-color: #e89880;
    border-radius: 1px;
    display: grid;
    grid-template-columns: auto auto;
    gap: 0px;
    padding: 3px;
  }

  .container-popup {
    min-height: 102px;
    min-width: 102px;
    margin-right: -176px;
  }

  input[type="checkbox"] {
    appearance: none;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    margin: 0px;
    padding: 0px;
    background-color: #88a8a8;
  }

  input[type="checkbox"]:checked {
    background-color: #188060;
  }
</style>
