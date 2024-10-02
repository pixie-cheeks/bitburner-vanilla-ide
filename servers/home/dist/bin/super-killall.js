import allServers from 'servers/home/data/all-servers.js';

/** @param {NS} ns - The ns module */
const superKillAll = (ns) => {
  allServers.forEach((hostname) => {
    const processes = ns.ps(hostname);
    if (processes.length === 0) return;

    ns.killall(hostname);
    ns.tprint(`\n\nOn ${hostname}, killed:\n${JSON.stringify(processes)}\n\n`);
  });
};

export { superKillAll as main, superKillAll };
