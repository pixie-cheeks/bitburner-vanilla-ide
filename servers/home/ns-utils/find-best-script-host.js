/**
 * Find the host for running scripts.
 * The condition for what is best is subject to change.
 * @param {NS} ns - The ns module.
 * @param {string[]} serversList - An array of servers.
 * @returns {string} Hostname of the best script hosting server.
 */
const findBestScriptHost = (ns, serversList) =>
  [...serversList].sort(
    (a, b) => ns.getServerMaxRam(b) - ns.getServerMaxRam(a),
  )[0];

export default findBestScriptHost;
