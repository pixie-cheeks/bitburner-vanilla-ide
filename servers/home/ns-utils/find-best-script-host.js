/** @param {NS} ns */
const findBestScriptHost = (ns, serversList) =>
  [...serversList].sort(
    (a, b) => ns.getServerMaxRam(b) - ns.getServerMaxRam(a),
  )[0];

export default findBestScriptHost;
