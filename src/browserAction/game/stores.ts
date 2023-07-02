import { writable } from "svelte/store";
import { SquareId } from "./types";

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
