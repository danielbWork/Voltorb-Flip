<script>
  import { tabs } from "webextension-polyfill";
  import { settings } from "../../../Settings";
  import { isDialogOpen, isInTab } from "../../../stores";
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
    $isDialogOpen = false;
    dialogRef.close();
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
    hide();
  }

  // TODO update ui
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog bind:this={dialogRef}>
  <span>Settings</span>
  <div class="settings-container" class:settings-container-popup={!$isInTab}>
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
  {#if !$isInTab}
    <button
      on:click={() => {
        //TODO clean this up  and maybe move this button
        tabs
          .create({ url: "src/browserAction/index.html", active: true })
          .then((tab) => {
            window.close();
          });
      }}>Open in a webpage</button
    >
  {/if}
  <div class="info-container">
    <div class="info-container-inner">
      <div class="info-container-content">
        <textarea
          readonly
          class="info-container-text"
          class:info-container-text-popup={!$isInTab}
          value={"test"}
        />
      </div>
    </div>
  </div>

  <UpdateKeybindingDialog bind:this={updateModal} value={updateValue} />
</dialog>

<!-- TODO Add page button -->

<style>
  dialog {
    background-color: #c0c8d0;
    border: 1px solid #c0c8d0;
    border-radius: 3px;
    padding: 3px;
  }

  .settings-container {
    width: 600px;
    height: 450px;
    display: flex;
    flex-direction: column;
    background-image: url("/assets/icons/settings_background.svg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
    align-items: start;
    padding-left: 6px;
  }

  /* For pop up display specifically */
  .settings-container-popup {
    width: 450px;
    height: 400px;
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

  .info-container {
    border: 3px solid #f8d868;
    outline: 6px solid #484040;
    border-radius: 4px;
    background-color: #606068;
    padding-top: 6px;
    padding-bottom: 6px;
    padding-left: 12px;
    padding-right: 3px;
    margin-top: 16px;
    margin-left: 8px;
    margin-right: 8px;
    margin-bottom: 4px;
  }

  .info-container-inner {
    display: flex;
  }

  .info-container-content {
    background-color: #f8f8f8;
    border: 1px solid #f8f8f8;
    border-radius: 3px;
    margin-right: 15px;
  }

  .info-container-text {
    width: 520px;
    height: 90px;
    display: block;
    appearance: none;
    color: #505058;
    text-shadow: 1px 1px #a0a0a8;
    background-color: #f8f8f8;
    font-size: 38px;
    border: 0px;
    outline: 0px;
    resize: none;
    line-height: 1;
    font-family: pokemon;
    text-shadow: 1px 1px #a0a0a8, 1px 0px #a0a0a8, 0px 1px #a0a0a8;
  }

  .info-container-text-popup {
    width: 370px;
    height: 60px;
    font-size: 28px;
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
