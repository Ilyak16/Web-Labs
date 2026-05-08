function digitsCount(num) {
  const str = Math.abs(num).toString();
  if (!str.length) return 0;
  
  let max = 1, current = 1;
  for (let i = 1; i < str.length; i++) {
    if (str[i] === str[i - 1]) {
      current++;
      max = Math.max(max, current);
    } else {
      current = 1;
    }
  }
  return max;
}

// Тесты
console.assert(digitsCount(1) === 1);
console.assert(digitsCount(2345665553) === 3);
console.assert(digitsCount(11444555566) === 4);