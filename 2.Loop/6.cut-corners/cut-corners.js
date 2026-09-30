function trunc(n) {
    if (n === 0) return 0
    const sign = n < 0 ? -1 : 1
    n = n < 0 ? -n : n

    let i = 1
    while (i <= n) i += i 
    i = i / 2  

    let result = 0
    while (i >= 1) {
        if (result + i <= n) result += i
        i = i / 2 
    }
    return sign < 0 ? -result : result
}

function floor(n) {
    const t = trunc(n)
    if (n < 0 && n !== t) return t - 1
    return t
}

function ceil(n) {
    const t = trunc(n)
    if (n > 0 && n !== t) return t + 1
    return t
}

function round(n) {
    return floor(n + 0.5)
}