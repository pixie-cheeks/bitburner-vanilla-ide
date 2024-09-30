/** @param {NS} ns */
const findAllServers = (ns) => {
  const servers = {};
  const scriptHome = ns.getHostname();
  servers[scriptHome] = { visited: false };

  const visitServer = (currentHost) => {
    servers[currentHost].visited = true;

    ns.scan(currentHost).forEach((hostName) => {
      if (!servers[hostName]) servers[hostName] = { visited: false };

      if (servers[hostName].visited) return;
      visitServer(hostName);
    });
  };

  visitServer(scriptHome);
  return Object.keys(servers);
};

export default findAllServers;
