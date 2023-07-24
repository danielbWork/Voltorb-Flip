<script>
  import { isDialogOpen, isInTab } from "../../stores";

  /**
   * @type {HTMLDialogElement} Reference to the dialog to be used
   */
  let dialogRef;

  /**
   * The text displayed in the dialog
   */
  export let text = "";

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
</script>

<svelte:window
  on:keydown={(e) => {
    hide();
  }}
/>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog bind:this={dialogRef} on:click={hide}>
  <div class="container">
    <div class="dialog-content">
      <textarea
        readonly
        class="dialog-text"
        class:dialog-text-popup={!$isInTab}
        value={text}
      />
    </div>
  </div>
</dialog>

<style>
  dialog {
    border: 3px solid #f8d868;
    outline: 6px solid #484040;
    border-radius: 4px;
    background-color: #606068;
    padding-top: 6px;
    padding-bottom: 6px;
    padding-left: 12px;
    padding-right: 3px;

    margin-bottom: 75px;
  }

  .container {
    display: flex;
  }

  .dialog-content {
    background-color: #f8f8f8;
    border: 1px solid #f8f8f8;
    border-radius: 3px;
    margin-right: 15px;
  }

  @font-face {
    font-family: pokemon;
    src: url(/assets/fonts/pokemon-ds-font.ttf);
  }
  .dialog-text {
    width: 600px;
    height: 90px;
    display: block;
    appearance: none;
    color: #505058;
    text-shadow: 1px 1px #a0a0a8;
    background-color: #f8f8f8;
    font-size: 42px;
    border: 0px;
    outline: 0px;
    resize: none;
    line-height: 1;
    font-family: pokemon;
    text-shadow: 1px 1px #a0a0a8, 1px 0px #a0a0a8, 0px 1px #a0a0a8;
  }

  .dialog-text-popup {
    width: 450px;
    height: 60px;
    font-size: 28px;
  }
</style>
