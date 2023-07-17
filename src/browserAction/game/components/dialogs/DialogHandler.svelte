<!-- TODO move dialogs here -->

<script>
  import { bind } from "svelte/internal";
  import { isDialogOpen } from "../../stores";
  import LevelDialog from "./LevelDialog.svelte";
  import RulesDialog from "./RulesDialog.svelte";
  import SettingsDialog from "./settings/SettingsDialog.svelte";

  let levelDialogModel;
  let levelDialogText = "";

  let rulesModal;

  let settingsModal;

  /**
   * Displays the finish dialog level dialog
   * @param text The text displayed in the dialog
   */
  export function showLevelDialog(text) {
    $isDialogOpen = true;

    levelDialogText = text;
    levelDialogModel.show();
  }

  /**
   * Displays the rules of the game
   */
  export function showRules() {
    $isDialogOpen = true;
    rulesModal.show();
  }

  /**
   * Displays the settings of the game
   */
  export function showSettings() {
    $isDialogOpen = true;
    settingsModal.show();
  }
</script>

<LevelDialog bind:this={levelDialogModel} text={levelDialogText} />

<RulesDialog bind:this={rulesModal} />

<SettingsDialog bind:this={settingsModal} />
