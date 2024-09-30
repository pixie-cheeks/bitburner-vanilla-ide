/** @param {NS} ns */
const getMaxThreads = (ns, hostname, scriptMemoryUsage) => {
  const unusedServerRam =
    ns.getServerMaxRam(hostname) - ns.getServerUsedRam(hostname);

  return Math.floor(unusedServerRam / scriptMemoryUsage);
};

export default getMaxThreads;
