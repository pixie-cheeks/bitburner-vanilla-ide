/** @param {NS} ns */
const findBestTarget = (ns, serversList) =>
  [...serversList].sort(
    (a, b) => ns.getServerMaxMoney(b) - ns.getServerMaxMoney(a),
  )[0];

export default findBestTarget;
