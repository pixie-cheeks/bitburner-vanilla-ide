/**
 * Find all servers on the network.
 * @param {NS} ns - The ns module.
 * @returns {string[]} An array of all servers' hostnames.
 */
const findAllServers = (ns) => {
  /**
   * @type {{[hostname: string]: {visited: boolean}}}
   */
  const servers = {};

  /**
   * Visit all non-visited servers recursively.
   * @param {string} currentHost - Hostame of the server being visited.
   */
  const visitServer = (currentHost) => {
    servers[currentHost].visited = true;

    ns.scan(currentHost).forEach((hostName) => {
      if (!servers[hostName]) servers[hostName] = { visited: false };

      if (servers[hostName].visited) return;
      visitServer(hostName);
    });
  };

  const scriptHome = ns.getHostname();
  servers[scriptHome] = { visited: false };

  visitServer(scriptHome);

  return Object.keys(servers);
};

export default findAllServers;
