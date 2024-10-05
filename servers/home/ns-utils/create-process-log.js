/**
 * Create a process log given the required information about it.
 * @param {string} hostname - Name of host running the process.
 * @param {import('NetscriptDefinitions.js').ProcessInfo} process - A ProcessInfo object.
 * @returns {string} A message describing the process
 */
const createProcessLog = (hostname, { filename, threads, pid, args }) =>
  `(T - ${threads}) (PID - ${pid}) ${hostname}:${filename} ${args.join(' ')}`;

export default createProcessLog;
