import flatHostnamesList from '../data/flat-hostnames-list.js';

/** @param {NS} ns */
const superKillAll = (ns) => {
  flatHostnamesList.forEach(
    (hostname) => ns.ps(hostname).length > 0 && ns.killall(hostname),
  );
};

const main = superKillAll;
export { main, superKillAll };
