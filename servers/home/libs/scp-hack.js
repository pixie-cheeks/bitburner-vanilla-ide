import errorLog from '../ns-utils/error-log.js';
import flatHostnamesList from '../data/flat-hostnames-list.js';
import { isHackable } from '../ns-utils/is-hackable.js';
import getMaxThreads from '../ns-utils/get-max-threads.js';
import findBestTarget from '../ns-utils/find-best-target.js';
import nukeServer from '../ns-utils/nuke-server.js';

/** @param {NS} ns */
const scpHack = (ns) => {
  const source = 'home';
  const hackScript = 'libs/hack-script.js';
  const scriptMemoryUsage = ns.getScriptRam(hackScript, source);
  const hackableServers = flatHostnamesList.filter((hostname) =>
    isHackable(ns, hostname),
  );
  const bestTarget = findBestTarget(ns, hackableServers);
  const scriptArguments = [
    bestTarget,
    ns.getServerMaxMoney(bestTarget),
    ns.getServerMinSecurityLevel(bestTarget),
  ];

  let numberOfRunningServers = 0;
  hackableServers.forEach((hostname) => {
    if (!ns.scp(hackScript, hostname, source)) {
      errorLog(`Couldn't copy ${hackScript} from ${source} to ${hostname}`);
      return;
    }

    const maxNumberOfThreads = getMaxThreads(ns, hostname, scriptMemoryUsage);
    if (maxNumberOfThreads <= 0) return;

    if (!ns.hasRootAccess(hostname)) nukeServer(ns, hostname);
    const execPid = ns.exec(
      hackScript,
      hostname,
      maxNumberOfThreads,
      ...scriptArguments,
    );
    if (execPid > 0) numberOfRunningServers++;
  });

  ns.tprint(
    `Number of servers that ran hack-script on "${bestTarget}": ${numberOfRunningServers}`,
  );
};

/** @param {NS} ns */
const main = scpHack;
export { main, scpHack };
