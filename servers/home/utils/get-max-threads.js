import { subtract, modulo, divide } from './calculator.js';
/** @param {NS} ns */
const getMaxThreads = (ns, hostname, scriptMemoryUsage) => {
  const unusedServerRam = subtract(
    ns.getServerMaxRam(hostname),
    ns.getServerUsedRam(hostname),
  );

  return divide(
    subtract(unusedServerRam, modulo(unusedServerRam, scriptMemoryUsage)),
    scriptMemoryUsage,
  );
};

export default getMaxThreads;
