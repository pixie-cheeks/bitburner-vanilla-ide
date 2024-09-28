import errorLog from './utils/error-log.js';

/** @param {NS} ns */
export async function main(ns) {
  const source = 'home';
  const hackScript = 'basic-hack.js';
  const scriptMemoryUsage = ns.getScriptRam(hackScript, source);
  const adjacentHosts = ns.scan(source);

  const checkHost = (host) => {
    let errorMessage;
    if (ns.getServerNumPortsRequired(host) > 0) {
      errorMessage = 'The number of ports required is too high.';
    } else if (!ns.scp(hackScript, host, source)) {
      errorMessage = `Couldn't copy ${hackScript} from ${source} to ${host}`;
    }

    if (!errorMessage) return true;

    errorLog(ns, errorMessage);
    return false;
  };

  adjacentHosts.forEach((host) => {
    if (!checkHost(host)) return;

    const unusedServerRam =
      ns.getServerMaxRam(host) - ns.getServerUsedRam(host);
    const maxNumberOfThreads = Math.floor(unusedServerRam / scriptMemoryUsage);

    ns.exec(hackScript, host, maxNumberOfThreads, host);
  });
}
