import errorLog from '../utils/error-log.js';

/** @param {NS} ns */
export async function main(ns) {
  const [server] = ns.args;
  if (!server) {
    errorLog(ns, 'No hostname provided.');
    return;
  }

  const serverMaxMoney = ns.getServerMaxMoney(server);
  const serverMinSecurityLevel = ns.getServerMinSecurityLevel(server);

  while (true) {
    if (ns.getServerMoneyAvailable(server) < serverMaxMoney) {
      await ns.grow(server);
    } else if (ns.getServerSecurityLevel(server) > serverMinSecurityLevel) {
      await ns.weaken(server);
    } else {
      await ns.hack(server);
    }
  }
}
