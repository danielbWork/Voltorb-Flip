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
    if (Object.values(keybindings.movement).includes(key)) {
      handleArrowClick(key);
      return;
    }

    if (keybindings.memos.includes(key)) {
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

    const keybindings = settings.keybindings.movement;

    switch (key) {
      case keybindings.up:
        row--;

        if (row < 0) row = 4;

        break;
      case keybindings.down:
        row++;

        if (row > 4) row = 0;

        break;
      case keybindings.left:
        col--;

        if (col < 0) col = 4;

        break;
      case keybindings.right:
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
    const keybindings = settings.keybindings.memos;

    memos[keybindings.indexOf(key)] = !memos[keybindings.indexOf(key)];

    // Needed to refresh
    $game.board = $game.board;
  }
</script>

<svelte:window on:keydown|preventDefault={handleOnKeydown} />
