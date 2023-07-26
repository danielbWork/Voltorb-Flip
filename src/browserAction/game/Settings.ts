import { writable } from "svelte/store";
import { storage } from "webextension-polyfill";

/**
 * Default settings for the user to follow
 */
export const defaultSettings = {
  hasBeatenLastLevel: false,
  usingShinyBell: false,
  keybindings: {
    toggleMemo: "x",
    flipSquare: " ",
    voltorbMemo: "`",
    oneMemo: "1",
    twoMemo: "2",
    threeMemo: "3",
    moveUp: "ArrowUp",
    moveDown: "ArrowDown",
    moveLeft: "ArrowLeft",
    moveRight: "ArrowRight",
  },
};

/**
 * Creates setting store for the application
 */
function createSettings() {
  const { subscribe, set } = writable<Record<string, any>>(defaultSettings);

  storage.local.get().then((value) => {
    // Initializes settings
    if (!value?.keybindings) {
      storage.local.set(defaultSettings);
      return;
    }

    set(value);
  });

  return {
    subscribe,
    set: (newValue: Record<string, any>) => {
      set(newValue);
      storage.local.set(newValue);
    },
  };
}

/**
 * The settings object
 */
export const settings = createSettings();
