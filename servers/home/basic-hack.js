/** @param {NS} ns */
export async function main(ns) {
  const [server] = ns.args;
  if (!server) {
    ns.tprint('Exiting. No server specified.');
    return;
  }

  if (!ns.serverExists(server)) {
    ns.tprint("Exiting. The specified server doesn't exist.");
    return;
  }

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
