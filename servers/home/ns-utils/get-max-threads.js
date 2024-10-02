/**
 * @param {NS} ns - The ns module.
 * @param {string} hostname - Hostname of the server that will run the script.
 * @param {number} scriptMemoryUsage - The script's memory usage.
 * @returns {number} Max integer number of Threads for given script usage.
 */
const getMaxThreads = (ns, hostname, scriptMemoryUsage) => {
  const unusedServerRam =
    ns.getServerMaxRam(hostname) - ns.getServerUsedRam(hostname);

  return Math.floor(unusedServerRam / scriptMemoryUsage);
};

export default getMaxThreads;
