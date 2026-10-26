const args = process.argv.slice(2);


if (args && args.length > 0) {
    let s = args[0]

    let arr = s.split(" ")
    let ss = ""
    for (let i in arr) {
        let l = arr[i].length
        let half = Math.floor(l / 2)

        if (l % 2 == 0) {
            arr[i] = (arr[i].slice(half, l) + arr[i].slice(0, half));
        } else {
            arr[i] = (arr[i].slice(half + 1, l) + arr[i].slice(0, half + 1));
        }
    }
    console.log(arr.join(" "));

}