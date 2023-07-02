<script>
  import { createEventDispatcher } from "svelte";

  import InfoSquare from "./InfoSquare.svelte";
  import Square from "./Square/Square.svelte";

  const infoColors = ["#e07050", "#40a840", "#e8a038", "#3090f8", "#c060e0"];

  /**
   * @type {import ("../GameManager.js").GameManager} The game manger we get the info from
   */
  export let game;

  // TODO Move to game manager (probably after changing it to store)

  /**
   * @type {boolean} Whether or not we finished the current level or not so we can display all hidden squares
   */
  export let finishedLevel;

  /**
   * @type {{rowIndex:number colIndex:number}} The id of the selected voltorb that should explode
   */
  export let explosionId;

  /**
   * @type {boolean} Whether or not in memo mode or not
   */
  export let isMemoOpen;

  $: board = game.board;

  $: rowSums = game.rowSums;

  $: colSums = game.colSums;

  $: selectedId = game.selectedId;

  const dispatch = createEventDispatcher();

  /**
   * Notifies the the parent so it can update the toggle in other children
   */
  function onToggleIsMemoOpen() {
    dispatch("toggleMemoOpen");
  }

  function compareIds(a, b) {
    return (
      a === b || (a?.rowIndex === b?.rowIndex && a?.colIndex === b?.colIndex)
    );
  }
</script>

<!-- TODO Check first explosion being weird -->
<div class="grid-container">
  {#each board as row, rowIndex}
    {#each row as square, colIndex}
      <Square
        id={{ rowIndex, colIndex }}
        value={square.value}
        isHidden={square.isHidden && !finishedLevel}
        rowGapColor={infoColors[rowIndex]}
        colGapColor={infoColors[colIndex]}
        hasExploded={compareIds(explosionId, { rowIndex, colIndex })}
        selected={compareIds(selectedId, { rowIndex, colIndex })}
        memos={square.memos}
        {isMemoOpen}
        on:hiddenClick
        on:revealClick
      />
    {/each}

    <InfoSquare
      sum={rowSums[rowIndex].sum}
      voltorbCount={rowSums[rowIndex].voltorbCount}
      color={infoColors[rowIndex]}
    />
  {/each}

  {#each colSums as { sum, voltorbCount }, index}
    <InfoSquare {sum} {voltorbCount} color={infoColors[index]} />
  {/each}

  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <img
    alt="memo"
    src={isMemoOpen ? "/icons/close_memo.png" : "/icons/open_memo.png"}
    draggable="false"
    class="memo-button"
    on:click={onToggleIsMemoOpen}
  />
</div>

<!-- TODO find why padding is needed here -->
<style>
  .grid-container {
    user-select: none;

    display: grid;
    grid-template-columns: auto auto auto auto auto auto;
    gap: 0px;
    padding: 30px;
  }

  .memo-button {
    margin-top: -8px;
    margin-left: -2px;
    width: 60px;
    height: 64px;
  }
</style>
