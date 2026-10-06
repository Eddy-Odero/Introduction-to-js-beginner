function findExpression(num) {
    const add4 = "+4";
    const mul2 = "*2";

    function search(value, seq) {
        if (value === num) {
            return seq;
        }

        if (value > num) {
            return undefined;
        }

        return search(value + 4, seq + " " + add4) ||
               search(value * 2, seq + " " + mul2);
    }

    return search(1, "1");
}