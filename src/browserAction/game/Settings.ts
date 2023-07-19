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
    memos: {
      voltorb: "`",
      one: "1",
      two: "2",
      three: "3",
    },
    movement: {
      up: "ArrowUp",
      down: "ArrowDown",
      left: "ArrowLeft",
      right: "ArrowRight",
    },
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
