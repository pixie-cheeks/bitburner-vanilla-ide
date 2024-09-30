import flatHostnamesList from '../data/flat-hostnames-list.js';
import { isHackable } from '../ns-utils/is-hackable.js';
import findBestScriptHost from '../ns-utils/find-best-script-host.js';
import findBestTarget from '../ns-utils/find-best-target.js';
import errorLog from '../ns-utils/error-log.js';
import nukeServer from '../ns-utils/nuke-server.js';
import getMaxThreads from '../ns-utils/get-max-threads.js';

/** @param {NS} ns */
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

/** @param {NS} ns */
const preHackScript = (ns) => {
  const hackableServers = flatHostnamesList.filter((hostname) =>
    isHackable(ns, hostname),
  );
  const doMaxThreads = ns.args[0] || false;
  const scriptHost = ns.args[1] || findBestScriptHost(ns, hackableServers);
  const target = ns.args[2] || findBestTarget(ns, hackableServers);
  const hackScript = 'libs/hack-script.js';

  if (checkForError({ ns, scriptHost, target, hackScript })) return;
  if (!ns.hasRootAccess(target)) nukeServer(ns, target);

  const serverMaxMoney = ns.getServerMaxMoney(target);
  const serverMinSecurityLevel = ns.getServerMinSecurityLevel(target);
  const runScript = (threads) =>
    ns.exec(
      hackScript,
      scriptHost,
      threads,
      target,
      serverMaxMoney,
      serverMinSecurityLevel,
    );

  if (doMaxThreads) {
    runScript(getMaxThreads(ns, scriptHost, ns.getScriptRam(hackScript)));
  } else {
    runScript(1);
  }
};

const main = preHackScript;

export { main, preHackScript };
