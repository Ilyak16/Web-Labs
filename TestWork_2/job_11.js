function mostCommon(str) {
  if (!str) return null;
  
  const freq = {};
  let maxChar = str[0], maxCount = 0;
  
  for (const char of str) {
    freq[char] = (freq[char] || 0) + 1;
    if (freq[char] > maxCount) {
      maxCount = freq[char];
      maxChar = char;
    }
  }
  
  return maxChar;
}
const result = mostCommon("isefe5i35fiuo34iuq")
console.log(`mostCommon на строчку isefe5i35fiuo34iuq выдал ${result}`);

module.exports = mostCommon;