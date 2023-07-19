<script>
  import { browserAction, tabs } from "webextension-polyfill";
  import { settings } from "../../../Settings";
  import { isDialogOpen } from "../../../stores";
  import KeyboardSetting from "./KeyboardSetting.svelte";
  import UpdateKeybindingDialog from "./UpdateKeybindingDialog.svelte";
  import { delay } from "../../../../utils";

  /**
   * @type {HTMLDialogElement} Reference to the dialog to be used
   */
  let dialogRef;

  let updateModal;

  $: keybindings = $settings.keybindings;

  let updateValue;

  /**
   * Opens the dialog to be displayed
   */
  export function show() {
    dialogRef.showModal();
  }

  /**
   * Closes the dialog
   */
  export function hide() {
    // $isDialogOpen = false;
    // dialogRef.close();
  }

  /**
   *  true if the dialog is displayed false otherwise
   */
  export function isOpen() {
    return dialogRef.open;
  }

  /**
   * Reacts to user selecting a key binding to update
   * @param action The action the user wants to update
   */
  async function handleKeybindingSelect(action) {
    updateValue = keybindings[action];

    // Updates inner dialog
    await delay(200);

    updateModal.show();

    while (updateModal.isOpen()) {
      await delay(200);
    }

    let tempSettings = { ...$settings };
    tempSettings["keybindings"][action] = updateModal.getValue();

    console.log(tempSettings);

    $settings = tempSettings;

    console.log($settings);

    updateValue = undefined;

    // TODO add apply logic here instead
    dialogRef.close();
  }

  // TODO update ui
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog bind:this={dialogRef} on:click={hide}>
  <span>Settings</span>
  <div class="container">
    <div>
      <!-- TODO add shiny charm code here -->
    </div>
    <span>Keybindings:</span>
    <KeyboardSetting
      title="Toggle Memo"
      value={keybindings.toggleMemo}
      on:click={() => {
        // TODO maybe find some better way of doing this
        handleKeybindingSelect("toggleMemo");
      }}
    />
  </div>
  <!-- TODO make sure the button doesn't appear if in screen -->
  <button
    on:click={() => {
      //TODO clean this up  and maybe move this button
      tabs
        .create({ url: "src/browserAction/index.html", active: true })
        .then((tab) => {
          // TODO fix this maybe with content page for apps pages
          tabs.setZoom(tab.id, 1.5);
          // tabs.setZoomSettings(tab.id, {
          //   defaultZoomFactor: 1.5,
          //   mode: "disabled",
          //   scope: "per-tab",
          // });
        });
    }}>Open in a webpage</button
  >

  <UpdateKeybindingDialog bind:this={updateModal} value={updateValue} />
</dialog>

<!-- TODO Add page button -->

<style>
  dialog {
    background-color: #c0c8d0;
    border: 1px solid #c0c8d0;
    border-radius: 2px;
    padding: 2px;
  }

  .container {
    width: 400px;
    height: 300px;
    display: flex;
    flex-direction: column;
    background-image: url("/assets/icons/settings_background.svg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
    align-items: start;
    padding-left: 4px;
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

  /* TODO change names */
  .selected {
    color: #c07800;
    text-shadow: 1px 1px #f8b050, 1px 0px #f8b050, 0px 1px #f8b050;
  }

  .selected2 {
    color: #f83018;
    text-shadow: 1px 1px #f88880, 1px 0px #f88880, 0px 1px #f88880;
  }
</style>
