function createCurriedFilterAndMap(criteria, mapper) {
    return function (obj) {
        let f = {};
        let kept = 0;
        let out = 0;

        for (let k in obj) {
            if (criteria(k, obj[k])) {
                f[k] = mapper(obj[k]);
                kept++;
            } else {
                out++;
            }
        }

        return {
            filteredObject: f,
            keysKept: kept,
            keysFilteredOut: out
        };
    };
}
