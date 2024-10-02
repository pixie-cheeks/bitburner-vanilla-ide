import repeat from '../utils/repeat.js';

/**
 * @param {NS} ns - The ns module.
 * @param {string} hostname - Hostname of the server to nuke.
 */
const nukeServer = (ns, hostname) => {
  const portOpeners = [
    ns.brutessh,
    ns.ftpcrack,
    ns.relaysmtp,
    ns.httpworm,
    ns.sqlinject,
  ];

  repeat(ns.getServerNumPortsRequired(hostname), (i) =>
    portOpeners[i](hostname),
  );

  ns.nuke(hostname);
};

export default nukeServer;
