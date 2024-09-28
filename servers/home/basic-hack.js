/** @param {NS} ns */
import checkServer from './utils/check-server.js';

export async function main(ns) {
  const [server] = ns.args;

  if (!checkServer(ns, server)) return;
  if (!ns.hasRootAccess(server)) ns.nuke(server);

  const alwaysTrue = true;
  const serverMaxMoney = ns.getServerMaxMoney(server);
  const serverMinSecurityLevel = ns.getServerMinSecurityLevel(server);

  while (alwaysTrue) {
    if (ns.getServerMoneyAvailable(server) < serverMaxMoney) {
      await ns.grow(server);
    } else if (ns.getServerSecurityLevel(server) > serverMinSecurityLevel) {
      await ns.weaken(server);
    } else {
      await ns.hack(server);
    }
  }
}
