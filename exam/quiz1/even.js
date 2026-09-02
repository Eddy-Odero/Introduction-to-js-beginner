function evenSum(n) {
    let sum = 0;
    for (let i = 0; i <= n; i += 2) {
        sum += i;
    }
    
    return sum;
}

console.log(evenSum(5)); 
console.log(evenSum(1));
