import errorLog from '../ns-utils/error-log.js';

/** @param {NS} ns - The ns module. */
const scriptHack = async (ns) => {
  const [target, serverMaxMoney, serverMinSecurityLevel] = ns.args;
  if (
    typeof target !== 'string' ||
    typeof serverMaxMoney !== 'number' ||
    typeof serverMinSecurityLevel !== 'number'
  ) {
    errorLog(ns, 'One or more arguments have an invalid type.');
    return;
  }

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
