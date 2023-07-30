<script>
  import { isInTab } from "../../../stores";

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
<div class="container" class:container-popup={!$isInTab} on:click>
  <span class="title">{title}</span>
  <div class="value">
    <span>{value}</span>
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: row;
    width: inherit;
    margin-top: 8px;
    margin-bottom: 4px;
    gap: 35%;
  }

  .container-popup {
    gap: 10%;
  }

  @font-face {
    font-family: pokemon;
    src: url(/assets/fonts/pokemon-ds-font.ttf);
  }

  span {
    font-family: pokemon;
    padding: 4px;
    font-size: 33px;
    text-align: center;
    margin: 6px;
    color: #505058;
    text-shadow: 1px 1px #a0a0a8, 1px 0px #a0a0a8, 0px 1px #a0a0a8;
  }

  .title {
    margin-left: 40px;
    width: 200px;
    text-align: start;
  }

  .value {
    padding: 2px;
    margin-top: 3px;
    min-width: 42px;
    min-height: 40px;
    text-align: center;
    border-top: #505058 solid 3px;
    border-bottom: #505058 solid 10px;
    border-right: #202023 solid 6px;
    border-left: #202023 solid 6px;
  }

  .value > span {
    font-size: 30px;
  }
</style>
