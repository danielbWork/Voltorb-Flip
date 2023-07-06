<script>
  import InfoSquare from "./InfoSquare.svelte";
  import Square from "./Square/Square.svelte";
  import { isMemoOpen, selectedId, game } from "../stores";

  const infoColors = ["#e07050", "#40a840", "#e8a038", "#3090f8", "#c060e0"];

  $: board = $game.board;

  $: rowSums = $game.rowSums;

  $: colSums = $game.colSums;
</script>

<div class="grid-container">
  {#each board as squaresRow, row}
    {#each squaresRow as square, col}
      <Square
        {square}
        id={{ row, col }}
        rowGapColor={infoColors[row]}
        colGapColor={infoColors[col]}
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
    src={$isMemoOpen
      ? "/assets/icons/close_memo.png"
      : "/assets/icons/open_memo.png"}
    draggable="false"
    class="memo-button"
    on:click={() => {
      $isMemoOpen = !$isMemoOpen;
    }}
  />
</div>

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
