<script>
  import { onMount } from "svelte";
  import Game from "./game/components/Game.svelte";
  import { browserAction, tabs } from "webextension-polyfill";
  import { isInTab } from "./game/stores";

  // TODO update all pixal values by 1.5 since zoom api sucks

  onMount(async () => {
    if ($isInTab) {
      const tab = (await tabs.query({ active: true }))[0];
      browserAction.disable(tab.id);
    }
  });
</script>

<div>
  <Game />
</div>

<!-- TODO Mention the following: Thefontsmagazine.com, https://www.1001fonts.com/,
    www.pentacom.jp, pokemon, smogon.com, https://voltorbflip.brandon-stein.com/-->
<!-- bulbapedia.bulbagarden.net/,https://www.pentacom.jp/pentacom/bitfontmaker2/, pokemon infinitefusions-->
<style>
  div {
    height: 600px;
    width: 500px;
    padding: 8px;
    background-color: #309f6a;
  }
</style>
