<script>
  /**
   * @type {string} The title of the setting
   */
  export let title;
  /**
   * @type {string} The value of the setting
   */
  export let value;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="container" on:click>
  <span>{title}:</span>
  <!-- Maybe surround in box or something -->
  <div class="value">
    <span>{value}</span>
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: inherit;
    gap: 40%;
  }

  @font-face {
    font-family: pokemon;
    src: url(/assets/fonts/pokemon-ds-font.ttf);
  }

  span {
    font-family: pokemon;
    padding: 4px;
    font-size: 22px;
    text-align: center;
    margin: 4px;
    color: #505058;
    text-shadow: 1px 1px #a0a0a8, 1px 0px #a0a0a8, 0px 1px #a0a0a8;
  }

  .value {
    padding: 3px;
    margin-top: 2px;
    border-top: #505058 solid 2px;
    border-bottom: #505058 solid 8px;
    border-right: #202023 solid 4px;
    border-left: #202023 solid 4px;
  }
</style>
