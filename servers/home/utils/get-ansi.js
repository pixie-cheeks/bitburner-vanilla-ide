/**
 * Get the proper ansi code by only inputting the semicolon-separated number
 * parameters.
 * @param {string} ansiNoBoiler - Ansi string without the boilerplate.
 * @returns {string} Ansi code with the boilerplate.
 */
const getAnsi = (ansiNoBoiler) => `\u001B[${ansiNoBoiler}m`;

export default getAnsi;
