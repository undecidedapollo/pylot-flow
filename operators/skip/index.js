function skip(skipCount) {
    return function* forEachGenerator(iterator) {
        let index = 0;
        for (const val of iterator) {
            if (index >= skipCount) {
                yield val;
            }

            index += 1;
        }
    };
}

module.exports = skip;
