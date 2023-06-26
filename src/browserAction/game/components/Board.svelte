<script>
  import InfoSquare from "./InfoSquare.svelte";
  import ScoreDisplay from "./ScoreDisplay.svelte";
  import Square from "./Square.svelte";

  const infoColors = ["#e07050", "#40a840", "#e8a038", "#3090f8", "#c060e0"];

  export let game;
  export let finishedLevel;
  export let explosionId;

  let isMemoOpen = false;

  $: board = game.board;

  $: rowSums = game.rowSums;

  $: colSums = game.colSums;

  $: selectedId = game.selectedId;

  function toggleIsMemoOpen() {
    isMemoOpen = !isMemoOpen;
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

  <!-- TODO add animation for open close and onkeydown -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <img
    alt="memo"
    src={isMemoOpen ? "/icons/close_memo.png" : "/icons/open_memo.png"}
    draggable="false"
    class="memo-button"
    on:click={toggleIsMemoOpen}
  />

  <!-- TODO add memo here -->
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
    margin-top: -4px;
  }
</style>
