function isPrime(n) {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

function prime(limit) {
  let current = 2;
  let count = 0;
  
  const interval = setInterval(() => {
    if (limit !== undefined && count >= limit) {
      clearInterval(interval);
      return;
    }
    
    while (!isPrime(current)) current++;
    console.log(current);
    current++;
    count++;
  }, 1000);
  
  return () => clearInterval(interval); // функция для остановки
}
module.exports = prime;