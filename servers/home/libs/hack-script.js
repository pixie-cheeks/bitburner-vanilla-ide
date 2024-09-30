import errorLog from '../ns-utils/error-log.js';

const isUndefined = (variable) => variable === undefined;

/** @param {NS} ns */
export async function main(ns) {
  const [target, serverMaxMoney, serverMinSecurityLevel] = ns.args;
  if (
    [target, serverMaxMoney, serverMinSecurityLevel].some((argument) =>
      isUndefined(argument),
    )
  ) {
    errorLog(ns, 'One or more arguments are undefined.');
    return;
  }

  while (true) {
    if (ns.getServerMoneyAvailable(target) < serverMaxMoney) {
      await ns.grow(target);
    } else if (ns.getServerSecurityLevel(target) > serverMinSecurityLevel) {
      await ns.weaken(target);
    } else {
      await ns.hack(target);
    }
  }
}
