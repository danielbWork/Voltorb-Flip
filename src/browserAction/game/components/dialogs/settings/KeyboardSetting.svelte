<script>
  /**
   * @type {string} The title of the setting
   */
  export let title;
  /**
   * @type {string} The value of the setting
   */
  export let value;

  /**
   * Whether or not the setting is the selected one or not
   */
  export let selected = false;

  /**
   * Whether or not the current value causes an error
   */
  export let error = false;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="container" on:click>
  <span class:selected-title={selected}>{title}</span>
  <!-- Maybe surround in box or something -->
  <div class="value">
    <span class:value-error={error}>{value}</span>
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
    padding: 6px;
    font-size: 33px;
    text-align: center;
    margin: 6px;
    color: #505058;
    text-shadow: 1px 1px #a0a0a8, 1px 0px #a0a0a8, 0px 1px #a0a0a8;
  }

  .value {
    padding: 4px;
    margin-top: 3px;
    border-top: #505058 solid 3px;
    border-bottom: #505058 solid 12px;
    border-right: #202023 solid 6px;
    border-left: #202023 solid 6px;
  }

  .value > span {
    font-size: 28px;
  }

  .selected-title {
    color: #c07800;
    text-shadow: 1px 1px #f8b050, 1px 0px #f8b050, 0px 1px #f8b050;
  }

  .value-error {
    color: #f83018;
    text-shadow: 1px 1px #f88880, 1px 0px #f88880, 0px 1px #f88880;
  }
</style>
