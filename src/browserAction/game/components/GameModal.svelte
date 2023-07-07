<script>
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
<!-- TODO add custom fonts -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog bind:this={dialogRef} on:click={hide}>
  <div class="container">
    <div class="dialog-content">
      <textarea readonly class="dialog-text" value={text} />
    </div>
  </div>
</dialog>

<style>
  dialog {
    border: 2px solid #f8d868;
    outline: 4px solid #484040;
    border-radius: 3px;
    background-color: #606068;
    padding-top: 4px;
    padding-bottom: 4px;
    padding-left: 8px;
    padding-right: 2px;

    margin-bottom: 50px;
  }

  .container {
    display: flex;
  }

  .dialog-content {
    background-color: #f8f8f8;
    border: 1px solid #f8f8f8;
    border-radius: 2px;
    margin-right: 10px;
  }

  @font-face {
    font-family: pokemon;
    src: url(/assets/fonts/pokemon-ds-font.ttf);
  }
  .dialog-text {
    width: 400px;
    height: 60px;
    display: block;
    appearance: none;
    color: #505058;
    text-shadow: 1px 1px #a0a0a8;
    background-color: #f8f8f8;
    font-size: 28px;
    border: 0px;
    outline: 0px;
    resize: none;
    line-height: 1;
    font-family: pokemon;
  }
</style>
