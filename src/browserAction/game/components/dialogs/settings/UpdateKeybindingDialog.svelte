<script>
  import { delay } from "../../../../utils";
  import { parseValue } from "./KeybindingsParser";

  /**
   * @type {HTMLDialogElement} Reference to the dialog to be used
   */
  let dialogRef;

  /**
   * @type {string} The value of the character the user wants to update
   */
  export let value;

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
    dialogRef.close();
  }

  /**
   *  true if the dialog is displayed false otherwise
   */
  export function isOpen() {
    return dialogRef.open;
  }

  export function getValue() {
    return value;
  }

  /**
   * Handles user selecting the key
   * @param event The keyboard press
   */
  async function onKeySelect(event) {
    const key = event.key;

    // Close on escape
    if (key === "Escape") {
      hide();
      return;
    }

    value = key;

    await delay(200);

    hide();
  }
</script>

<svelte:window on:keydown={onKeySelect} />

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog bind:this={dialogRef} on:click={hide}>
  <div class="container">
    <span>Please select a new keybinding:</span>

    <span>{parseValue(value)}</span>
  </div>
</dialog>

<style>
  .container {
    width: 225px;
    height: 150px;
    display: flex;
    flex-direction: column;
    background-image: url("/assets/icons/settings_background.svg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
    align-items: center;
    padding-left: 6px;
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
