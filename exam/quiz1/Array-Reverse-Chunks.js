
function reverseChunks(arr, chunkSize) {
  for (let i = 0; i < arr.length; i += chunkSize) {
    let left = i;
    let right = Math.min(i + chunkSize, arr.length) - 1;

    while (left < right) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
      right--;
    }
  }

  return arr;
}

console.log(reverseChunks([1, 2, 3, 4, 5, 6, 7], 3));
console.log(reverseChunks([10, 20, 30, 40, 50], 2));
console.log(reverseChunks([1, 2, 3, 4, 5], 4));
