import errorLog from '../ns-utils/error-log.js';

/** @param {NS} ns */
const scriptHack = async (ns) => {
  const [target] = ns.args;
  if (!target) {
    errorLog(ns, 'No target provided.');
    return;
  }

  const serverMaxMoney = ns.getServerMaxMoney(target);
  const serverMinSecurityLevel = ns.getServerMinSecurityLevel(target);

  while (true) {
    if (ns.getServerMoneyAvailable(target) < serverMaxMoney) {
      await ns.grow(target);
    } else if (ns.getServerSecurityLevel(target) > serverMinSecurityLevel) {
      await ns.weaken(target);
    } else {
      await ns.hack(target);
    }
  }
};

const main = scriptHack;
export { main, scriptHack };
