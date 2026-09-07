function divisors(n) {
  n = Math.abs(n);

  if (n <= 1) {
    return [];
  }

  const result = [];

  for (let i = 1; i < n; i++) {
    if (n % i === 0) {
      result.push(i);
    }
  }

  return result;
}
