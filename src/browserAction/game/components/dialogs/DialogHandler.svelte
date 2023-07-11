<!-- TODO move dialogs here -->

<script>
  import { isDialogOpen } from "../../stores";
  import LevelDialog from "./LevelDialog.svelte";
  import RulesDialog from "./RulesDialog.svelte";

  let levelDialogModel;
  let levelDialogText = "";

  let rulesModal;

  /**
   * Displays the finish dialog level dialog
   * @param text The text displayed in the dialog
   */
  export function showLevelDialog(text) {
    $isDialogOpen = true;

    levelDialogText = text;
    levelDialogModel.show();
  }

  export function showRules() {
    $isDialogOpen = true;
    rulesModal.show();
  }
</script>

<LevelDialog bind:this={levelDialogModel} text={levelDialogText} />

<RulesDialog bind:this={rulesModal} />
