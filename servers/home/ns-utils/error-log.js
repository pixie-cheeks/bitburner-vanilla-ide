import getAnsi from './get-ansi.js';

/** @param {NS} ns */
function errorLog(ns, errorMessage) {
  ns.tprint(`${getAnsi('1;31')}Error: ${errorMessage}`);
}

export default errorLog;
