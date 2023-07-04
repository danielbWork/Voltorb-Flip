<script>
  /**
   * @type {HTMLDialogElement} Reference to the dialog to be used
   */
  let dialogRef;

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
      <slot />
    </div>

    <img src="/icons/dialog_arrow.png" alt="arrow" />
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
  }

  .container {
    display: flex;
  }

  .dialog-content {
    background-color: #f8f8f8;
    border: 1px solid #f8f8f8;
    border-radius: 2px;
    padding: 4px;
    margin-right: 10px;
  }

  img {
    width: 20px;
    height: 25px;
    margin-top: 50px;
  }
</style>
