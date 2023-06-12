<script>
  /**
   * @param {number} sum The sum of values of the row/column, 0 if only voltorbs
   */
  export let sum;
  /**
   * @param {number} voltorbCount The number of voltorbs in the row/column
   */
  export let voltorbCount; //TODO see how should update
</script>

<!-- TODO update the ui here to match game -->

<div class="square">
  <span class="sum-display">
    {sum}
  </span>

  <div style="display: table;">
    <!-- TODO find smaller image -->
    <!-- <img alt="voltorb" src="/icons/voltorb_48x48.png" /> -->
    <span>
      {voltorbCount}
    </span>
  </div>
</div>

<style>
  .sum-display {
    outline: 4px solid #d0e8e0;
  }
  .square {
    width: 50px;
    height: 50px;
    border: 2px solid #282828;
    outline: 4px solid #d0e8e0;
  }
</style>
