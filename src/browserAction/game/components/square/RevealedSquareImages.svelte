<script>
  /**
   * @type {number} The value of the square to select an image
   */
  export let value;

  /**
   * @type {boolean} Should this voltorb display the explosion animation or not
   */
  export let hasExploded;

  /**
   * Explosion transition used to update the frames for the explosion
   * @param {*} node The image node we update
   */
  function explosion(node) {
    if (!node instanceof HTMLImageElement) {
      throw new Error("This transition is only used for images");
    }

    const frames = [
      "explosion-0",
      "explosion-1",
      "explosion-2",
      "explosion-3",
      "explosion-4",
      "explosion-5",
      "explosion-6",
      "explosion-7",
      "explosion-8",
    ];

    return {
      duration: frames.length * 100,
      tick: (t) => {
        const index = Math.floor(frames.length * t);

        // Only does this on the start of the animation
        if (index < frames.length) {
          const frame = frames[index];
          node.src = `/assets/icons/${frame}.gif`;
        }
      },
    };
  }
</script>

{#if value === -1}
  <div class="voltorb-parent">
    {#if hasExploded}
      <img
        alt="0"
        in:explosion
        src=""
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
        in:explosion
        alt="0"
        src=""
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
