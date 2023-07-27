<script>
  import { tabs } from "webextension-polyfill";
  import { settings } from "../../../Settings";
  import { isDialogOpen, isInTab } from "../../../stores";
  import KeyboardSetting from "./KeyboardSetting.svelte";
  import UpdateKeybindingDialog from "./UpdateKeybindingDialog.svelte";
  import { delay } from "../../../../utils";
  import { parseTitle, parseValue } from "./KeybindingsParser";

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
    updateValue = parseValue(keybindings[action]);

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

    // TODO Add replace logic here
    hide();
  }
</script>

<!-- TODO add close button maybe other close buttons -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog bind:this={dialogRef}>
  <span>Settings</span>
  <div class="settings-container" class:settings-container-popup={!$isInTab}>
    <div>
      <!-- TODO add shiny charm code here -->
    </div>

    <div class="keybindings-container">
      <span class="keybindings-title">Keybindings:</span>

      {#each Object.entries(keybindings) as [key, value]}
        <KeyboardSetting
          title={parseTitle(key)}
          value={parseValue(value)}
          on:click={() => {
            handleKeybindingSelect(key);
          }}
        />
      {/each}
    </div>
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
  <UpdateKeybindingDialog bind:this={updateModal} value={updateValue} />
</dialog>

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

  .keybindings-container {
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    width: inherit;
    margin-top: 30px;
  }

  .keybindings-title {
    position: sticky;
    top: 0;
    margin-left: 20px;
    text-align: start;
    margin-top: 0px;
    background-color: rgb(248, 248, 248);
    border-bottom: 4px solid #505058;
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
</style>
