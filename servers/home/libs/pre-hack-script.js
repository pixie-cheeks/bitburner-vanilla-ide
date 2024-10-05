import nonPservers from '../data/non-pservers.js';
import { isHackable } from '../ns-utils/is-hackable.js';
import findBestScriptHost from '../ns-utils/find-best-script-host.js';
import findBestTarget from '../ns-utils/find-best-target.js';
import errorLog from '../ns-utils/error-log.js';
import nukeServer from '../ns-utils/nuke-server.js';
import getMaxThreads from '../ns-utils/get-max-threads.js';

/**
 * Check whether the input is valid for the hack script.
 * @param {object} inputs - Inputs for this function.
 * @param {NS} inputs.ns - The ns module.
 * @param {string} inputs.scriptHost - Name of the host that will run the script.
 * @param {string} inputs.target - Name of the target host that will get hacked.
 * @param {string} inputs.hackScript - Name of the script that will do the hacking.
 * @returns {boolean} True if any errors else false.
 */
const checkForError = ({ ns, scriptHost, target, hackScript }) => {
  let errorMessage;
  if (!ns.serverExists(scriptHost)) {
    errorMessage = 'Given script host does not exist.';
  } else if (!isHackable(ns, scriptHost)) {
    errorMessage = 'Cannot run scripts on given script host.';
  } else if (!ns.serverExists(target)) {
    errorMessage = 'Given target does not exist.';
  } else if (!isHackable(ns, target)) {
    errorMessage = 'Given target is not hackable.';
  } else if (!ns.fileExists(hackScript)) {
    errorMessage = `${hackScript} was not found.`;
  }

  if (errorMessage) {
    errorLog(ns, errorMessage);
    return true;
  }
  return false;
};

/**
 * Prepare everything for the hack-script and execute it.
 * @param {NS} ns - The ns module.
 */
const preHackScript = (ns) => {
  const hackableServers = nonPservers.filter((hostname) =>
    isHackable(ns, hostname),
  );
  const shouldDoMaxThreads = ns.args[0] || false;
  const scriptHost = ns.args[1] || findBestScriptHost(ns, hackableServers);
  const target = ns.args[2] || findBestTarget(ns, hackableServers);
  const hackScript = 'libs/hack-script.js';

  if (
    typeof shouldDoMaxThreads !== 'boolean' ||
    typeof scriptHost !== 'string' ||
    typeof target !== 'string'
  ) {
    errorLog(ns, 'One or more provided arguments have an invalid type.');
    return;
  }

  if (checkForError({ ns, scriptHost, target, hackScript })) return;
  if (!ns.hasRootAccess(target)) nukeServer(ns, target);

  const serverMaxMoney = ns.getServerMaxMoney(target);
  const serverMinSecurityLevel = ns.getServerMinSecurityLevel(target);
  /**
   * Script execution command for brevity.
   * @param {number} threads - Number of threads for the script.
   * @returns {number} Any number greater than 0 if successful else 0.
   */
  const runScript = (threads) =>
    ns.exec(
      hackScript,
      scriptHost,
      threads,
      target,
      serverMaxMoney,
      serverMinSecurityLevel,
    );

  if (shouldDoMaxThreads) {
    runScript(getMaxThreads(ns, scriptHost, ns.getScriptRam(hackScript)));
  } else {
    runScript(1);
  }
};

export { preHackScript as main, preHackScript };
