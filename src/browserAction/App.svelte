<script>
  import Board from "./game/components/Board.svelte";

  let test = "test";
</script>

<div>
  <Board />
</div>

<style>
  /* TODO update background from just pure color */
  div {
    height: 600px;
    width: 500px;
    padding: 8px;
    background-color: #309f6a;
  }
</style>
