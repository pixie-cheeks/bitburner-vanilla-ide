const getClearDecimalPower = (numberOne, numberTwo) => {
  const stringOne = numberOne.toString();
  const stringTwo = numberTwo.toString();
  const decimalsOne = stringOne.includes('.')
    ? stringOne.replace(/^\d*\./, '')
    : '';
  const decimalsTwo = stringTwo.includes('.')
    ? stringTwo.replace(/^\d*\./, '')
    : '';

  return 10 ** Math.max(decimalsOne.length, decimalsTwo.length);
};

const add = (addendOne, addendTwo) => {
  const power = getClearDecimalPower(addendOne, addendTwo);

  return (addendOne * power + addendTwo * power) / power;
};

const subtract = (minuend, subtrahend) => {
  const power = getClearDecimalPower(minuend, subtrahend);

  return (minuend * power - subtrahend * power) / power;
};

const multiply = (factorOne, factorTwo) => {
  const power = getClearDecimalPower(factorOne, factorTwo);

  return (factorOne * power * (factorTwo * power)) / power;
};

const divide = (dividend, divisor) => {
  const power = getClearDecimalPower(dividend, divisor);

  return (dividend * power) / (divisor * power);
};

const modulo = (dividend, divisor) => {
  const power = getClearDecimalPower(dividend, divisor);

  return ((dividend * power) % (divisor * power)) / power;
};

export { add, subtract, multiply, divide, modulo };
