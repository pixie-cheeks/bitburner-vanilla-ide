/**
 * Repeat the execution of a callback n times.
 * @param {number} times - Number of times to repeat.
 * @param {(iteration: number) => any} callback - Callback to execute on each iteration.
 */
const repeat = (times, callback) => {
  for (let iteration = 0; iteration < times; iteration++) {
    callback(iteration);
  }
};

export default repeat;
