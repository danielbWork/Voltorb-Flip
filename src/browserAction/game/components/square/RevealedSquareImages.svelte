<script>
  /**
   * @type {number} The value of the square to select an image
   */
  export let value;

  /**
   * @type {boolean} Should this voltorb display the explosion animation or not
   */
  export let hasExploded;
</script>

{#if value === -1}
  <div class="voltorb-parent">
    {#if hasExploded}
      <img
        alt="0"
        src="/assets/icons/explosion.gif"
        draggable="false"
        class="explosion"
        loading="lazy"
      />
    {/if}
    <img
      class="square-image"
      alt="-1"
      src="/assets/icons/shiny_voltorb.png"
      draggable="false"
    />
  </div>
{:else if value === 0}
  <div class="voltorb-parent">
    {#if hasExploded}
      <img
        alt="0"
        src="/assets/icons/explosion.gif"
        draggable="false"
        class="explosion"
        loading="lazy"
      />
    {/if}
    <img
      class="square-image"
      alt="0"
      src="/assets/icons/voltorb.png"
      draggable="false"
    />
  </div>
{:else if value === 1}
  <img
    class="square-image"
    alt="1"
    src="/assets/icons/square_1.png"
    draggable="false"
  />
{:else if value === 2}
  <img
    class="square-image"
    alt="2"
    src="/assets/icons/square_2.png"
    draggable="false"
  />
{:else if value === 3}
  <img
    class="square-image"
    alt="3"
    src="/assets/icons/square_3.png"
    draggable="false"
  />
{/if}

<style>
  .voltorb-parent {
    width: 75px;
    height: 75px;
    position: relative;
  }

  .voltorb-parent > img {
    position: fixed;
  }

  /* TODO fix this */
  .explosion {
    z-index: 2;
    width: inherit;
    height: inherit;
  }

  .square-image {
    margin-bottom: -3px;
    width: inherit;
    height: inherit;
    z-index: -1;
  }
</style>
