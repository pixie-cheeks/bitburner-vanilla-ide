import errorLog from '../utils/error-log.js';

/** @param {NS} ns */
export async function main(ns) {
  const source = 'home';
  const hackScript = 'basic-hack.js';
  const scriptMemoryUsage = ns.getScriptRam(hackScript, source);
  const adjacentHosts = ns
    .scan(source)
    .filter((host) => ns.getServerNumPortsRequired(host) < 1);

  const checkHost = (host) => {
    let errorMessage;
    if (!ns.scp(hackScript, host, source)) {
      errorMessage = `Couldn't copy ${hackScript} from ${source} to ${host}`;
    }

    if (!errorMessage) return true;

    errorLog(ns, errorMessage);
    return false;
  };

  const execResults = [];
  adjacentHosts.forEach((host) => {
    if (!checkHost(host)) return;

    const unusedServerRam =
      ns.getServerMaxRam(host) - ns.getServerUsedRam(host);
    const maxNumberOfThreads = Math.round(
      (unusedServerRam - (unusedServerRam % scriptMemoryUsage)) /
        scriptMemoryUsage,
    );

    if (maxNumberOfThreads <= 0) return;
    if (!ns.hasRootAccess(host)) ns.nuke(host);
    execResults.push([
      ns.exec(hackScript, host, maxNumberOfThreads, host),
      host,
    ]);
  });

  if (execResults.length === 0) {
    ns.tprint("Didn't run any scripts.");
    return;
  }

  execResults.forEach(([result, host]) =>
    ns.tprint(`execResult for ${host}: ${result}`),
  );
}
