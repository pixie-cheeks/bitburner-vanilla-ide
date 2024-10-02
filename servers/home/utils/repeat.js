/**
 * @param {number} times - Number of times to repeat.
 * @param {(iteration: number) => any} callback - Callback to execute on each iteration.
 */
function repeat(times, callback) {
  for (let iteration = 0; iteration < times; iteration++) {
    callback(iteration);
  }
}

export default repeat;
