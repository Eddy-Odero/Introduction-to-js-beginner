function bubbleSortAnalyzer(arr, comparator) {
    let iterations = 0;
    let swaps = 0;

    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            iterations++;

            if (comparator(arr[j], arr[j + 1]) > 0) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swaps++;
            }
        }
    }

    return {
        sortedArray: arr,
        iterations,
        swaps
    };
}
