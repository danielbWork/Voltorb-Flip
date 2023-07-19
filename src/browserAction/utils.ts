/**
 * Utils function for async code to delay for a certain time
 * @param {number} ms How long we need to wait
 */
export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
