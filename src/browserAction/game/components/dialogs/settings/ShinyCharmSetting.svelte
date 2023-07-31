<script>
  import { settings } from "../../../Settings";
  /**
   * Toggles the shiny charm setting
   */
  function toggleShinyCharmSetting() {
    $settings = { ...$settings, usingShinyCharm: !$settings.usingShinyCharm };
  }
</script>

{#if $settings.hasBeatenLastLevel}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="container" on:click={toggleShinyCharmSetting}>
    <img
      src="/assets/icons/shiny_charm.png"
      alt="shinyCharm"
      class="icon"
      class:img-off={!$settings.usingShinyCharm}
    />
    <span class="title">Shiny Charm</span>
  </div>
{/if}

<style>
  .container {
    justify-content: center;
    align-items: start;
    display: flex;
    padding-top: 10px;
  }
  .icon {
    width: 70px;
    height: 70px;
  }

  .img-off {
    filter: grayscale(100%);
  }

  @font-face {
    font-family: pokemon;
    src: url(/assets/fonts/pokemon-ds-font.ttf);
  }

  .title {
    font-family: pokemon;
    padding: 6px;
    font-size: 33px;
    text-align: center;
    margin: 6px;
    color: #505058;
    text-shadow: 1px 1px #a0a0a8, 1px 0px #a0a0a8, 0px 1px #a0a0a8;
    margin-top: 13px;
  }
</style>
