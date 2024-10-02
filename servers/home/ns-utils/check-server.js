import errorLog from './error-log.js';

/**
 * @param {NS} ns - The ns module.
 * @param {string} server - Hostname of the server.
 * @returns {boolean} True if hackable else false.
 */
const checkServer = (ns, server) => {
  let errorMessage;
  if (!server) {
    errorMessage = 'No server specified.';
  } else if (!ns.serverExists(server)) {
    errorMessage = `Server ${server} doesn't exist`;
  } else if (ns.getHackingLevel() < ns.getServerRequiredHackingLevel(server)) {
    errorMessage = `Hack level is lower than required for ${server}`;
  } else if (server === 'home') {
    errorMessage = 'Cannot hack your own machines.';
  }

  if (!errorMessage) return true;

  errorLog(ns, errorMessage);
  return false;
};

export default checkServer;
