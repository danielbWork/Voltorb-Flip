<script>
  import { prevent_default } from "svelte/internal";

  /**
   * @param {number} sum The sum of values of the row/column, 0 if only voltorbs
   */
  export let sum;
  /**
   * @param {number} voltorbCount The number of voltorbs in the row/column
   */
  export let voltorbCount; //TODO see how should update

  /**
   * @param {string} color The color hex for the info square background
   */
  export let color;
</script>

<!-- TODO update the ui here to match game -->

<div class="grid-container" style="background-color: {color};">
  <span class="sum-item">
    {#if sum < 10}0{/if}{sum}
  </span>

  <img
    class="voltorb-image-item"
    alt="voltorb"
    src="/icons/voltorb_48x48.png"
    draggable="false"
  />
  <span class="voltorbs-item">
    {voltorbCount}
  </span>
</div>

<style>
  .grid-container {
    user-select: none;

    width: 54px;
    height: 54px;
    display: grid;
    row-gap: 10px;
    outline: 4px solid #d0e8e0;
    border-radius: 1px;
  }
  span {
    font-size: 20px;
    text-align: right;
    padding-right: 4px;
    color: #404040;
  }

  .sum-item {
    grid-row: 1;
    grid-column: 1 / span 2;
    height: 20px;
    margin-top: -3px;
    border-bottom: 4px solid #d0e8e0;
  }

  .voltorb-image-item {
    height: 33px;
    width: 33px;
    margin-top: -10px;
    padding-left: 0px;
  }

  .voltorbs-item {
    margin-top: -6px;
  }
</style>
