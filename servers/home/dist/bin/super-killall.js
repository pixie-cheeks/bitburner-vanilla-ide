import flatHostnamesList from '../../data/non-pservers.js';

/** @param {NS} ns */
const superKillAll = (ns) => {
  flatHostnamesList.forEach((hostname) => {
    const processes = ns.ps(hostname);
    if (processes.length === 0) return;

    ns.killall(hostname);
    ns.tprint(`\n\nOn ${hostname}, killed:\n${JSON.stringify(processes)}\n\n`);
  });
};

export { superKillAll as main, superKillAll };
