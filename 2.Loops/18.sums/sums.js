function sums(num) {
    if (num <= 1) {
        return [];
    }

    function generate(remaining, min, current) {
        if (remaining === 0) {
            return [current];
        }

        let result = [];

        for (let i = min; i <= remaining; i++) {
            if (current.length === 0 && i === num) {
                continue;
            }

            result = result.concat(
                generate(remaining - i, i, current.concat(i))
            );
        }

        return result;
    }

    return generate(num, 1, []);
}