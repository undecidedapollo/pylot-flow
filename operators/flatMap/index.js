const {
    NOOP_PASSTHROUGH,
    hasOrIsIterator,
} = require("../../shared");

function flatMap(predicate = NOOP_PASSTHROUGH) {
    return function* forEachGenerator(iterator) {
        let index = 0;
        for (const val of iterator) {
            const mappedVal = predicate(val, index);
            index += 1;
            if(hasOrIsIterator(mappedVal)) {
                yield* mappedVal;
            } else {
                yield mappedVal;
            }
        }
    };
}

module.exports = flatMap;
