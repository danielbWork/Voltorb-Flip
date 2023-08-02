<script>
  import { onMount } from "svelte";
  import Game from "./game/components/Game.svelte";
  import { browserAction, tabs } from "webextension-polyfill";
  import { game, isInTab } from "./game/stores";
  import { delay } from "./utils";

  onMount(async () => {
    if ($isInTab) {
      const tab = (await tabs.query({ active: true }))[0];
      browserAction.disable(tab.id);
      tabs.setZoom(1);
    }
  });

  /**
   * Loads the game after some delay to make sure settings have been loaded
   */
  async function loadGame() {
    await delay(100);
    $game.updateLevel(false);
    return;
  }
</script>

<div class:popup={!$isInTab}>
  {#await loadGame() then}
    <Game />
  {/await}
</div>

<style>
  div {
    height: 900px;
    width: 750px;
    padding: 12px;
    background-color: #309f6a;
  }

  .popup {
    transform: scale(calc(2 / 3)) translateY(-155px) translateX(-110px);
    height: 600px;
    width: 500px;
  }
</style>
