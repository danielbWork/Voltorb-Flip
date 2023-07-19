<script>
  import { delay } from "../../../../utils";

  /**
   * @type {HTMLDialogElement} Reference to the dialog to be used
   */
  let dialogRef;

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

  async function onKeySelect(event) {
    const key = event.key;

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

    <span>{value}</span>
  </div>
</dialog>

<style>
  .container {
    width: 150px;
    height: 100px;
    display: flex;
    flex-direction: column;
    background-image: url("/assets/icons/settings_background.svg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
    align-items: center;
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
</style>
