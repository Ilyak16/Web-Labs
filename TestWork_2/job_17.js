function f(s1, s2) {
  if (!s1 || !s2) return '';
  
  const m = s1.length, n = s2.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  
  let maxLen = 0, endIndex = 0;
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
        if (s1[i-1] === s2[j-1]) {
            dp[i][j] = dp[i-1][j-1] + 1;
            if (dp[i][j] > maxLen) {
                maxLen = dp[i][j];
                endIndex = i;
                }
            }
        }
    }
    return s1.slice(endIndex - maxLen, endIndex);
}
const result = f("abc1234def", "ghij123klm")
console.log(`при первой строке abc1234def и второй строке ghij123klm ответ ${result}`)