const isInteger = require("lodash/isInteger");

const {
    hasOrIsIterator,
    checkIs,
} = require("../../shared");

function flatten(maxDepth = Number.POSITIVE_INFINITY) {
    checkIs("Integer", maxDepth === Number.POSITIVE_INFINITY || isInteger(maxDepth), "maxDepth");
    checkIs("Greater than or equal to 0", maxDepth >= 0, "maxDepth");

    return function* flattenGenerator(iterator, currentDepth = 0) {
        if (currentDepth >= maxDepth) {
            yield* iterator;
            return;
        }

        for (const val of iterator) {
            if (hasOrIsIterator(val)) {
                const newDepth = currentDepth + 1;
                yield* flattenGenerator(val, newDepth);
            } else {
                yield val;
            }
        }
    };
}

module.exports = flatten;
