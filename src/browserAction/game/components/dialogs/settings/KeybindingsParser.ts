/**
 * Parses the value to be displayed properly if it's something like an arrow or space
 * @param value The value we parse
 * @returns The updated icon for the value or just value it self if no change was needed
 */
export function parseValue(value: string) {
  let newValue;

  switch (value) {
    case "ArrowUp":
      newValue = "\u2191";
      break;

    case "ArrowDown":
      newValue = "\u2193";
      break;
    case "ArrowLeft":
      newValue = "\u2190";
      break;
    case "ArrowRight":
      newValue = "\u2192";
      break;

    case " ":
      newValue = "␣";
      break;

    case "Control":
      newValue = "ctrl";
      break;

    case "Enter":
      newValue = "⏎";
      break;

    default:
      newValue = value;
      break;
  }

  return newValue;
}

/**
 * Parses the keybinding to get the appropriate title
 * @param keybinding The keybinding we parse
 * @returns The title for the keybinding to be displayed
 */
export function parseTitle(keybinding: string) {
  switch (keybinding) {
    case "toggleMemo":
      return "Toggle Memo Mode";
    case "flipSquare":
      return "Flip Square";
    case "voltorbMemo":
      return "Voltorb Memo";
    case "oneMemo":
      return "One Memo";
    case "twoMemo":
      return "Two Memo";
    case "threeMemo":
      return "Three Memo";
    case "moveUp":
      return "Move Up";
    case "moveDown":
      return "Move Down";
    case "moveLeft":
      return "Move Left";
    case "moveRight":
      return "Move Right";

    default:
      break;
  }

  return "Unknown keybinding";
}
