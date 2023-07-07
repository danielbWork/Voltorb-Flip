<script>
  import { game } from "../stores";

  $: currentScoreText = `${$game.currentScore}`.padStart(4, "0");
  $: totalScoreText = `${$game.totalScore}`.padStart(5, "0");
</script>

<div class="container">
  <!-- Adds plus one since level 0 is weird -->
  <span class="title">Level: {$game.level + 1}</span>
  <span class="title">
    Level Score: <span class="score">{currentScoreText}</span>
  </span>
  <span class="title"
    >Total Score: <span class="score">{totalScoreText}</span></span
  >
</div>

<style>
  @font-face {
    font-family: pokemon;
    src: url(/assets/fonts/pokemon-ds-font.ttf);
  }

  @font-face {
    font-family: score;
    src: url(/assets/fonts/voltorb-flip-score.ttf);
  }

  .title {
    background-color: #f8f8f8;
    outline: 2px solid #404040;
    border: 4px solid #a0c0b0;
    color: #404040;
    border-radius: 3px;
    margin-right: 6px;
    padding: 4px;
    font-size: 22px;

    text-shadow: 1px 1px #a0a0a8;
    font-family: pokemon;
  }

  .score {
    font-family: score;
    text-shadow: 1px 1px #a5c6b5, -1px 1px #a5c6b5, 1px -1px #a5c6b5,
      -1px -1px #a5c6b5;
    font-size: 18px;
  }

  .container {
    padding-top: 15px;
    padding-left: 20px;
  }
</style>
