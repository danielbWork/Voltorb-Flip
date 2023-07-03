<script>
  import { game } from "../stores";

  $: currentScoreText = `${$game.currentScore}`.padStart(4, "0");
  $: totalScoreText = `${$game.totalScore}`.padStart(5, "0");
</script>

<div class="container">
  <!-- Adds plus one since level 0 is weird -->
  <span>Level: {$game.level + 1}</span>
  <span>Level Score: {currentScoreText}</span>
  <span>Total Score: {totalScoreText}</span>
</div>

<style>
  span {
    background-color: #f8f8f8;
    outline: 2px solid #404040;
    border: 4px solid #a0c0b0;
    color: #404040;
    border-radius: 3px;
    margin-right: 6px;
    font-size: 17px;
    padding: 4px;
  }

  .container {
    padding-top: 15px;
    padding-left: 20px;
  }
</style>
