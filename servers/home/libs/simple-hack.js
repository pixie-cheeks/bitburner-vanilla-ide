import errorLog from '../ns-utils/error-log.js';

/** @param {NS} ns - The ns module. */
const scriptHack = async (ns) => {
  const [target] = ns.args;
  if (typeof target !== 'string') {
    errorLog(ns, 'Invalid string for target hostname.');
    return;
  }

  const serverMaxMoney = ns.getServerMaxMoney(target);
  const serverMinSecurityLevel = ns.getServerMinSecurityLevel(target);

  while (true) {
    if (ns.getServerSecurityLevel(target) > serverMinSecurityLevel) {
      await ns.weaken(target);
    } else if (ns.getServerMoneyAvailable(target) < serverMaxMoney) {
      await ns.grow(target);
    } else {
      await ns.hack(target);
    }
  }
};

export { scriptHack as main, scriptHack };
