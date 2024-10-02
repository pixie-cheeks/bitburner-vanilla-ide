/**
 * @param {NS} ns - The ns module.
 * @param {string[]} serversList - An array of server hostnames.
 * @returns {string} Hostname of the best target server.
 */
const findBestTarget = (ns, serversList) =>
  [...serversList].sort(
    (a, b) => ns.getServerMaxMoney(b) - ns.getServerMaxMoney(a),
  )[0];

export default findBestTarget;
