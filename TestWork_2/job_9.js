function isPal(num) {
  if (num < 0) return false;
  const str = num.toString();
  return str === str.split('').reverse().join('');
}

console.assert(isPal(123) === false);
console.assert(isPal(1) === true);
console.assert(isPal(12321) === true);
console.assert(isPal(123215) === false);
console.log('isPal() работает');

module.exports = isPal;