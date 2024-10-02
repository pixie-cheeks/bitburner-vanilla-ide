import getAnsi from '../utils/get-ansi.js';

/**
 * @param {NS} ns - The ns module.
 * @param {string} errorMessage - An error message.
 */
const errorLog = (ns, errorMessage) => {
  ns.tprint(`${getAnsi('1;31')}Error: ${errorMessage}`);
};

export default errorLog;
