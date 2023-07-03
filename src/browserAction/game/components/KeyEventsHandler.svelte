<script>
  import { createEventDispatcher } from "svelte";
  import { settings } from "../Settings";
  import { isMemoOpen, selectedId, game, selectedSquare } from "../stores";

  /**
   * Flag to notify that key events should be ignored
   */
  export let ignoreOnKeyDown = false;

  const dispatch = createEventDispatcher();

  /**
   * Handles user pressing a keyboard button and acts accordingly
   * @param event The keyboard event mainly used for the key value
   */
  function handleOnKeydown(event) {
    if (ignoreOnKeyDown) return;

    const keybindings = settings.keybindings;

    key = event.key;
    // TODO  enable keybind selection
    // TODO update this to match settings code
    if (key.includes("Arrow")) {
      handleArrowClick(key);
      return;
    }

    if (key.match("\\d") || key.includes("`")) {
      handleNumberKey(key);
    }

    switch (key) {
      case keybindings.flipSquare:
        if ($game.board[$selectedId.row][$selectedId.col].isHidden) {
          dispatch("flipSelectedSquare");
        }
        break;

      case keybindings.toggleMemo:
        $isMemoOpen = !$isMemoOpen;
        break;

      default:
        break;
    }
  }

  /**
   * Handles the user pressing one of the arrow keys and updates the selected square
   * @param key The key the user pressed
   */
  function handleArrowClick(key) {
    let { row, col } = $selectedId;
    switch (key) {
      case "ArrowUp":
        row--;

        if (row < 0) row = 4;

        break;
      case "ArrowDown":
        row++;

        if (row > 4) row = 0;

        break;
      case "ArrowLeft":
        col--;

        if (col < 0) col = 4;

        break;
      case "ArrowRight":
        col++;

        if (col > 4) col = 0;

        break;

      default:
        break;
    }

    $selectedId = { row, col };
  }

  /**
   * Handles the user pressing one of the number keys and updates the selected square
   * @param key The key the user pressed
   */
  function handleNumberKey(key) {
    const memos = $selectedSquare.memos;

    switch (key) {
      case "`":
      case "0":
        memos[0] = !memos[0];
        break;
      case "1":
        memos[1] = !memos[1];
        break;
      case "2":
        memos[2] = !memos[2];
        break;
      case "3":
        memos[3] = !memos[3];
        break;

      default:
        break;
    }

    // Needed to refresh
    $game.board = $game.board;
  }
</script>

<svelte:window on:keydown|preventDefault={handleOnKeydown} />
