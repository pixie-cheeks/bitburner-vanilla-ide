/** @param {NS} ns */
function repeat(times, function_) {
  for (let i = 0; i < times; i++) {
    function_(i);
  }
}

export default repeat;
