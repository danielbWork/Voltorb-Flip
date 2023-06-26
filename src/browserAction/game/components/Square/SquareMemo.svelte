<script>
  /**
   * @type {boolean[]} The memos that should be displayed
   **/
  export let memos;
  /**
   * @type {boolean} Whether or not pencil icon should be displayed
   */
  export let displayPencil;
</script>

<div class="memo-container">
  {#if memos[0]}
    <img
      alt="0"
      src="/icons/memo_0.svg"
      draggable="false"
      class="memo-image"
      style=" top: 0;
    left: 0;"
    />
  {/if}

  {#if memos[1]}
    <img
      alt="1"
      src="/icons/memo_1.svg"
      draggable="false"
      class="memo-image"
      style=" top: 0;
   right: 0;"
    />
  {/if}

  {#if memos[2]}
    <img
      alt="2"
      src="/icons/memo_2.svg"
      draggable="false"
      class="memo-image"
      style=" bottom: 0;
    left: 0;"
    />
  {/if}

  {#if memos[3]}
    <img
      alt="3"
      src="/icons/memo_3.svg"
      draggable="false"
      class="memo-image"
      style=" bottom: 0;
    right: 0;"
    />
  {/if}

  {#if displayPencil}
    <img
      alt="pencil"
      src="/icons/memo_pencil.png"
      draggable="false"
      class="memo-pencil"
    />
  {/if}
</div>

<style>
  .memo-image {
    margin-bottom: 0px;
    width: 10px;
    height: 10px;
    z-index: 0;
    padding: 3px;
    position: absolute;
  }

  .memo-container {
    position: fixed;
    width: inherit;
    height: inherit;
  }

  .memo-pencil {
    width: 25px;
    height: 25px;
    margin-top: 12px;
    margin-left: 12px;
  }
</style>
