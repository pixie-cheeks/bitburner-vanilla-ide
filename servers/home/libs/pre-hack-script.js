import flatHostnamesList from '../data/flat-hostnames-list.js';
import { isHackable } from '../ns-utils/is-hackable.js';
import findBestTarget from '../ns-utils/find-best-target.js';
import errorLog from '../ns-utils/error-log.js';
import nukeServer from '../ns-utils/nuke-server.js';
import getMaxThreads from '../ns-utils/get-max-threads.js';

/** @param {NS} ns */
const preHackScript = (ns) => {
  const hackableServers = flatHostnamesList.filter((hostname) =>
    isHackable(ns, hostname),
  );
  const target = ns.args[0] || findBestTarget(ns, hackableServers);
  const doMaxThreads = ns.args[1] || false;

  if (!hackableServers.includes(target)) {
    errorLog(ns, 'The target provided is not hackable.');
    return;
  }

  if (!ns.hasRootAccess(target)) nukeServer(ns, target);

  const hackScript = 'libs/hack-script.js';

  if (!ns.fileExists(hackScript)) {
    errorLog(ns, `${hackScript} was not found.`);
    return;
  }

  const serverMaxMoney = ns.getServerMaxMoney(target);
  const serverMinSecurityLevel = ns.getServerMinSecurityLevel(target);
  const runScript = (threads) =>
    ns.run(hackScript, threads, target, serverMaxMoney, serverMinSecurityLevel);

  if (doMaxThreads) {
    runScript(getMaxThreads(ns, ns.getHostname(), ns.getScriptRam(hackScript)));
  } else {
    runScript(1);
  }
};

const main = preHackScript;

export { main, preHackScript };
