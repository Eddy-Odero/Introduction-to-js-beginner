function createCurriedCharacterCreator(initialCharacter) {
    let c = structuredClone(initialCharacter);

    function merge(a, b) {
        for (let k in b) {
            if (
                typeof b[k] === "object" &&
                b[k] !== null &&
                !Array.isArray(b[k]) &&
                typeof a[k] === "object" &&
                a[k] !== null
            ) {
                merge(a[k], b[k]);
            } else {
                a[k] = b[k];
            }
        }
        return a;
    }

    return function f(...args) {
        if (args.length === 0) return c;

        for (let x of args) {
            if (typeof x === "function")
                c = x(c);
            else
                c = merge(c, x);
        }

        return f;
    };
}
