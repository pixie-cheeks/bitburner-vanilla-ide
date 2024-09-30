import errorLog from '../utils/error-log.js';
import flatHostnamesList from '../utils/flat-hostnames-list.js';
import { isHackable } from '../utils/is-hackable.js';
import getMaxThreads from '../utils/get-max-threads.js';
import findBestTarget from '../utils/find-best-target.js';
import setupForHack from './setup-for-hack.js';

/** @param {NS} ns */
export async function main(ns) {
  const source = 'home';
  const hackScript = 'libs/basic-hack.js';
  const scriptMemoryUsage = ns.getScriptRam(hackScript, source);
  const hackableServers = flatHostnamesList.filter((hostname) =>
    isHackable(ns, hostname),
  );
  const bestTarget = findBestTarget(ns, hackableServers);
  const execResults = [];

  hackableServers.forEach((hostname) => {
    if (!ns.scp(hackScript, hostname, source)) {
      errorLog(`Couldn't copy ${hackScript} from ${source} to ${hostname}`);
      return;
    }

    const maxNumberOfThreads = getMaxThreads(ns, hostname, scriptMemoryUsage);
    if (maxNumberOfThreads <= 0) return;

    if (!ns.hasRootAccess(hostname)) setupForHack(ns, hostname);
    execResults.push([
      hostname,
      ns.exec(hackScript, hostname, maxNumberOfThreads, bestTarget),
    ]);
  });

  execResults.forEach(([hostname, result]) =>
    ns.tprint(`execResult for ${hostname}: ${result}`),
  );
}
