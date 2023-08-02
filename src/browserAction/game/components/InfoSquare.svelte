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

<div class="grid-container" style="background-color: {color};">
  <span class="sum-item" style="background-color: {color};">
    {#if sum < 10}0{/if}{sum}
  </span>

  <img
    style="background-color: {color};"
    class="voltorb-image-item"
    alt="voltorb"
    src="/assets/icons/voltorb_48x48.png"
    draggable="false"
  />
  <span class="voltorbs-item" style="background-color: {color};">
    {voltorbCount}
  </span>
</div>

<style>
  .grid-container {
    user-select: none;

    width: 81px;
    height: 81px;
    display: grid;
    row-gap: 15px;
    outline: 6px solid #d0e8e0;
    border-radius: 1px;
    z-index: 2;
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
    letter-spacing: 3px;
    font-size: 28px;
  }

  .sum-item {
    grid-row: 1;
    grid-column: 1 / span 2;
    height: 33px;
    margin-top: -4px;
    margin-right: -4px;
    border-bottom: 6px solid #d0e8e0;
  }

  .voltorb-image-item {
    height: 46px;
    width: 46px;
    margin-top: -15px;
    padding-left: 3px;
  }

  .voltorbs-item {
    margin-top: -10px;
    margin-right: -3px;
  }
</style>
