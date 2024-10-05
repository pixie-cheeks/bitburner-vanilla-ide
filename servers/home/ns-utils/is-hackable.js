const portOpeners = [
  { filename: 'BruteSSH.exe' },
  { filename: 'FTPCrack.exe' },
  { filename: 'relaySMTP.exe' },
  { filename: 'HTTPWorm.exe' },
  { filename: 'SQLInject.exe' },
];

/**
 * Check if the player ha the required number of port openers for a server.
 * @param {NS} ns - The ns module.
 * @param {string} hostname - Hostname of the server to check.
 * @returns {boolean} True if required ports can be opened else false.
 */
const canOpenRequiredPorts = (ns, hostname) => {
  const numberOfPortOpeners = portOpeners.filter(({ filename }) =>
    ns.fileExists(filename),
  ).length;

  return ns.getServerNumPortsRequired(hostname) <= numberOfPortOpeners;
};

/**
 * Check if the player has the required hacking level for a server.
 * @param {NS} ns - The ns module.
 * @param {string} hostname - Hostname of the server to check with.
 * @returns {boolean} True if player has required hacking level else false.
 */
const hasRequiredHackLevel = (ns, hostname) =>
  ns.getServerRequiredHackingLevel(hostname) <= ns.getHackingLevel();

/**
 * Check if the provided server can be hacked by the player.
 * @param {NS} ns - The ns module.
 * @param {string} hostname - Hostname of the server to check with.
 * @returns {boolean} - True if server is hackable else false.
 */
const isHackable = (ns, hostname) =>
  canOpenRequiredPorts(ns, hostname) && hasRequiredHackLevel(ns, hostname);

export { canOpenRequiredPorts, hasRequiredHackLevel, isHackable };
