const portOpeners = [
  { filename: 'BruteSSH.exe' },
  { filename: 'FTPCrack.exe' },
  { filename: 'relaySMTP.exe' },
  { filename: 'HTTPWorm.exe' },
  { filename: 'SQLInject.exe' },
];

/** @param {NS} ns */
const canOpenRequiredPorts = (ns, hostname) => {
  const numberOfPortOpeners = portOpeners.filter(({ filename }) =>
    ns.fileExists(filename),
  ).length;

  return ns.getServerNumPortsRequired(hostname) <= numberOfPortOpeners;
};

/** @param {NS} ns */
const hasRequiredHackLevel = (ns, hostname) =>
  ns.getServerRequiredHackingLevel(hostname) <= ns.getHackingLevel();

/** @param {NS} ns */
const isHackable = (ns, hostname) =>
  canOpenRequiredPorts(ns, hostname) && hasRequiredHackLevel(ns, hostname);

export { canOpenRequiredPorts, hasRequiredHackLevel, isHackable };
