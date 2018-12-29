function map(predicate) {
    return function* mapGenerator(iterator) {
        let index = 0;
        for (const val of iterator) {
            yield predicate(val, index);
            index += 1;
        }
    };
}

module.exports = {
    map,
};
