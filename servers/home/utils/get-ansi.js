function getAnsi(value) {
  return `\u001B[${value}m`;
}

export default getAnsi;
