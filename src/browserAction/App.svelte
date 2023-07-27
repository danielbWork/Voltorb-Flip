<script>
  import { onMount } from "svelte";
  import Game from "./game/components/Game.svelte";
  import { browserAction, tabs } from "webextension-polyfill";
  import { isInTab } from "./game/stores";

  onMount(async () => {
    if ($isInTab) {
      const tab = (await tabs.query({ active: true }))[0];
      browserAction.disable(tab.id);
      tabs.setZoom(1);
    }
  });
</script>

<div class:popup={!$isInTab}>
  <Game />
</div>

<!-- TODO Mention the following: Thefontsmagazine.com, https://www.1001fonts.com/,
    www.pentacom.jp, pokemon, smogon.com, https://voltorbflip.brandon-stein.com/-->
<!-- bulbapedia.bulbagarden.net/,https://www.pentacom.jp/pentacom/bitfontmaker2/, pokemon infinitefusions-->
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
