function nestedArrayReverser(words) {
    return words
        .toReversed()
        .flatMap(x => x.toReversed())
        .join(" ");
}
