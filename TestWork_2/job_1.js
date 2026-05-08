function fact(n) {
  if (n < 0) throw new Error('Факториал не определён для отрицательных чисел');
  if (n <= 1) return 1;
  return n * fact(n - 1);
}
console.assert(fact(1) === 1, 'fact(1)');
console.assert(fact(5) === 120, 'fact(5)');
console.assert(fact(10) === 3628800, 'fact(10)');