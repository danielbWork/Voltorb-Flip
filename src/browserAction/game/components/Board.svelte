<script>
  import InfoSquare from "./InfoSquare.svelte";
  import Square from "./Square/Square.svelte";
  import { isMemoOpen, selectedId } from "../stores";

  const infoColors = ["#e07050", "#40a840", "#e8a038", "#3090f8", "#c060e0"];

  /**
   * @type {import ("../GameManager").GameManager} The game manger we get the info from
   */
  export let game;

  // TODO Move to game manager (probably after changing it to store)

  /**
   * @type {import ("../types").SquareId} The id of the selected voltorb that should explode
   */
  export let explosionId;

  $: board = game.board;

  $: rowSums = game.rowSums;

  $: colSums = game.colSums;
</script>

<!-- TODO Check first explosion being weird -->
<div class="grid-container">
  {#each board as squaresRow, row}
    {#each squaresRow as square, col}
      <Square
        {square}
        id={{ row, col }}
        rowGapColor={infoColors[row]}
        colGapColor={infoColors[col]}
        hasExploded={explosionId?.row === row && explosionId?.col === col}
        selected={$selectedId.row === row && $selectedId.col === col}
        on:hiddenClick
        on:revealClick
      />
    {/each}

    <InfoSquare
      sum={rowSums[row].sum}
      voltorbCount={rowSums[row].voltorbCount}
      color={infoColors[row]}
    />
  {/each}

  {#each colSums as { sum, voltorbCount }, index}
    <InfoSquare {sum} {voltorbCount} color={infoColors[index]} />
  {/each}

  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <img
    alt="memo"
    src={$isMemoOpen ? "/icons/close_memo.png" : "/icons/open_memo.png"}
    draggable="false"
    class="memo-button"
    on:click={() => {
      $isMemoOpen = !$isMemoOpen;
    }}
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
