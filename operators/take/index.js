function take(takeCount) {
    return function* forEachGenerator(iterator) {
        if (takeCount <= 0) {
            return;
        }

        let index = 0;
        for (const val of iterator) {
            yield val;

            index += 1;
            if (index >= takeCount) {
                return;
            }
        }
    };
}

module.exports = take;
