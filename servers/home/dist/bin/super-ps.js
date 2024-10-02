import allServers from 'servers/home/data/all-servers.js';
import createProcessLog from 'servers/home/ns-utils/create-process-log.js';

/** @param {NS} ns - ns module */
const superPs = (ns) => {
  /** @type {string[]} */
  const messages = [];

  allServers.forEach((hostname) => {
    const processes = ns.ps(hostname);
    if (processes.length === 0) return;

    processes.forEach((process) =>
      messages.push(createProcessLog(hostname, process)),
    );
  });

  if (messages.length === 0) {
    ns.tprint('No processes running in non-pservers.');
  } else {
    ns.tprint(`\n${messages.join('\n')}`);
  }
};

export { superPs as main, superPs };
