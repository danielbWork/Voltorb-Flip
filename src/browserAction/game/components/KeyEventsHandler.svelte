<script>
  import { createEventDispatcher } from "svelte";
  import { settings } from "../Settings";
  import {
    isMemoOpen,
    selectedId,
    game,
    selectedSquare,
    isDialogOpen,
  } from "../stores";

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
    console.log($isDialogOpen);
    if (ignoreOnKeyDown || $isDialogOpen) return;

    const keybindings = $settings.keybindings;

    const key = event.key;

    let isUsed = false;

    switch (key) {
      case keybindings.flipSquare:
        isUsed = true;
        if ($game.board[$selectedId.row][$selectedId.col].isHidden) {
          dispatch("flipSelectedSquare");
        }
        break;

      case keybindings.toggleMemo:
        $isMemoOpen = !$isMemoOpen;
        isUsed = true;
        break;

      default:
        break;
    }

    if (!isUsed) {
      isUsed = handleArrowClick(key);
    }

    if (!isUsed) {
      isUsed = handleNumberKey(key);
    }

    // If key is one of ours prevents code
    if (isUsed) {
      event.preventDefault();
    }
  }

  /**
   * Handles the user pressing one of the arrow keys and updates the selected square
   * @param key The key the user pressed
   * @returns Whether or not the value passed is was a known keybind
   */
  function handleArrowClick(key) {
    let { row, col } = $selectedId;

    const keybindings = $settings.keybindings;

    switch (key) {
      case keybindings.moveUp:
        row--;

        if (row < 0) row = 4;

        break;
      case keybindings.moveDown:
        row++;

        if (row > 4) row = 0;

        break;
      case keybindings.moveLeft:
        col--;

        if (col < 0) col = 4;

        break;
      case keybindings.moveRight:
        col++;

        if (col > 4) col = 0;

        break;

      default:
        return false;
        break;
    }

    $selectedId = { row, col };
    return true;
  }

  /**
   * Handles the user pressing one of the number keys and updates the selected square
   * @param key The key the user pressed
   * @returns Whether or not the value passed is was a known keybind
   */
  function handleNumberKey(key) {
    const memos = $selectedSquare.memos;
    const keybindings = $settings.keybindings;

    switch (key) {
      case keybindings.voltorbMemo:
        memos[0] = !memos[0];
        break;

      case keybindings.oneMemo:
        memos[1] = !memos[1];
        break;

      case keybindings.twoMemo:
        memos[2] = !memos[2];
        break;

      case keybindings.threeMemo:
        memos[3] = !memos[3];
        break;

      default:
        return false;
        break;
    }

    // Needed to refresh
    $game.board = $game.board;
    return true;
  }
</script>

<svelte:window on:keydown={handleOnKeydown} />
