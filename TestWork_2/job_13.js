function sortNumbers(str) {
  if (!str || typeof str !== 'string') return '';
  const numbers = str.trim().split(/\s+/).map(Number).filter(n => !isNaN(n));
  numbers.sort((a, b) => a - b);
  return numbers.join(' ');
}
const inputString = "42 17 8 99 3 55 12 7 105";
const sortedString = sortNumbers(inputString);
console.log("Исходная строка:  ", inputString);
console.log("Отсортированная:  ", sortedString);
