<script>
  /**
   * @param {number} sum The sum of values of the row/column, 0 if only voltorbs
   */
  export let sum;
  /**
   * @param {number} voltorbCount The number of voltorbs in the row/column
   */
  export let voltorbCount;

  /**
   * @param {string} color The color hex for the info square background
   */
  export let color;
</script>

<!-- TODO update the ui here to match game specifically text font and voltorb image-->

<div class="grid-container" style="background-color: {color};">
  <span class="sum-item">
    {#if sum < 10}0{/if}{sum}
  </span>

  <img
    class="voltorb-image-item"
    alt="voltorb"
    src="/assets/icons/voltorb_48x48.png"
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

  @font-face {
    font-family: numbers;
    src: url(/assets/fonts/voltorb-flip-info-numbers.ttf);
  }
  span {
    text-align: right;
    color: #404040;
    font-family: numbers;
    line-height: 1.3;
    letter-spacing: 2px;
    font-size: 19px;
  }

  .sum-item {
    grid-row: 1;
    grid-column: 1 / span 2;
    height: 22px;
    margin-top: -3px;
    margin-right: -3px;
    border-bottom: 4px solid #d0e8e0;
  }

  .voltorb-image-item {
    height: 31px;
    width: 31px;
    margin-top: -10px;
    padding-left: 2px;
  }

  .voltorbs-item {
    margin-top: -7px;
    margin-right: -2px;
  }
</style>
