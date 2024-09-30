import flatHostnamesList from '../data/flat-hostnames-list.js';
/** @param {NS} ns */
export async function main(ns) {
  flatHostnamesList.forEach(
    (hostname) => ns.ps(hostname).length > 0 && ns.killall(hostname),
  );
}
