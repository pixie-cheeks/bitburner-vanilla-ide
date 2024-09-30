import repeat from '../utils/repeat.js';

const portOpeners = [
  { methodName: 'brutessh' },
  { methodName: 'ftpcrack' },
  { methodName: 'relaysmtp' },
  { methodName: 'httpworm' },
  { methodName: 'sqlinject' },
];

/** @param {NS} ns */
const nukeServer = (ns, hostname) => {
  repeat(ns.getServerNumPortsRequired(hostname), (i) => {
    ns[portOpeners[i].methodName](hostname);
  });

  ns.nuke(hostname);
};

export default nukeServer;
