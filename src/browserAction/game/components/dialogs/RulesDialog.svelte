<script>
  import { isDialogOpen } from "../../stores";

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
    if (isOpen()) {
      e.preventDefault();
      hide();
    }
  }}
/>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog bind:this={dialogRef} on:click={hide}>
  <div class="container">
    <span>Flip the Cards and Collect Points!</span>
    <span> Once you find all x2 and x3 you finish the level!</span>
    <img src="/assets/icons/rules.png" alt="rules" />
  </div>
</dialog>

<style>
  dialog {
    background-color: #28a068;
  }

  .container {
    display: flex;
    flex-direction: column;
  }

  @font-face {
    font-family: pokemon;
    src: url(/assets/fonts/pokemon-ds-font.ttf);
  }
  img {
    width: 100%;
    height: 100%;
  }

  span {
    font-family: pokemon;
    padding: 6px;
    font-size: 33px;
    text-align: center;
    margin: 6px;
    color: #f7f7f7;
    text-shadow: 1px 0px #373737, 0px 1px #373737, -1px 0px #373737,
      0px -1px #373737;
  }
</style>
