/**
 * @param {string} ansiNoBoiler - Ansi string without the boilerplate.
 * @returns {string} Ansi code with the boilerplate.
 */
function getAnsi(ansiNoBoiler) {
  return `\u001B[${ansiNoBoiler}m`;
}

export default getAnsi;
