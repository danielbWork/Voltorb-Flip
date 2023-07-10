import { derived, writable } from "svelte/store";
import { SquareId } from "./types";
import { GameManager } from "./GameManager";

/**
 * Marks when the level is finished and the flip animation should be displayed
 */
export const hasFinishedLevel = writable(false);

/**
 * Whether or not in memo mode or not
 */
export const isMemoOpen = writable(false);

/**
 * The id of the selected square
 */
export const selectedId = writable<SquareId>({ row: 0, col: 0 });

/**
 * Flag for notifying that user selected a voltorb, mostly used for explosion animation
 */
export const isExploding = writable(false);

/**
 * The game manager of the application
 */
export const game = writable<GameManager>(new GameManager());

/**
 * The currently selected square
 */
export const selectedSquare = derived(
  [game, selectedId],
  ([$game, $selectedId]) => {
    return $game.board[$selectedId.row][$selectedId.col];
  }
);

/**
 * Used to mark that a dialog is currently being displayed
 */
export const isDialogOpen = writable(false);
