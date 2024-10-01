import flatHostnamesList from '../../data/non-pservers.js';

const createMessage = (hostname, { filename, threads, pid, args }) =>
  `(T - ${threads}) (PID - ${pid}) ${hostname}:${filename} ${args.join(' ')}`;

/** @param {NS} ns */
const superPs = (ns) => {
  const messages = [];

  flatHostnamesList.forEach((hostname) => {
    const processes = ns.ps(hostname);
    if (processes.length === 0) return;

    processes.forEach((process) =>
      messages.push(createMessage(hostname, process)),
    );
  });

  if (messages.length === 0) {
    ns.tprint('No processes running in non-pservers.');
  } else {
    ns.tprint(`\n${messages.join('\n')}`);
  }
};

const main = superPs;
export { main, superPs };
