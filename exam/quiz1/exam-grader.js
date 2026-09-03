function examGrader(timeout, exercises) {
    return (async () => {
        let grade = 0;
        let start = Date.now();

        for (let ex of exercises) {
            let left = timeout - (Date.now() - start);

            if (left <= 0) break;

            try {
                let r = await Promise.race([
                    ex(),
                    new Promise((_, rej) =>
                        setTimeout(() => rej(), left)
                    )
                ]);

                grade += r.note;
            } catch {
                break;
            }
        }

        return grade;
    })();
}
