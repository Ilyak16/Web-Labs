function f(N) {
  const result = [];
  
  for (let i = 0; i < N; i++) {
    result.push(
      new Promise(resolve => {
        setTimeout(() => resolve(i), i * 1000);
      })
    );
  }
  
  return result;
}

(async () => {
  const promises = f(4);
  console.log('Запущено 4 промиса...');
  const results = await Promise.all(promises);
  console.log('✅ Результаты:', results);
})();

module.exports = f;