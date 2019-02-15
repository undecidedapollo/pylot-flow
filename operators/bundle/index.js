const isInteger = require("lodash/isInteger");
const {
    checkIs,
} = require("../../shared");

/**
 * Bundles items into groups based on bundle amount.
 * @param {number} bundleAmount The number of items you want per resulting collection.
 * @returns {Generator} Flow bundle operator
 */
function bundle(bundleAmount) {
    checkIs("integer", isInteger(bundleAmount), "bundleAmount");
    checkIs("greater than or equal to 1", bundleAmount >= 1, "bundleAmount");
    return function* bundleGenerator(iterator) {
        let curBundle = [];
        for (const val of iterator) {
            curBundle.push(val);
            if (curBundle.length >= bundleAmount) {
                yield curBundle;
                curBundle = [];
            }
        }
        if (curBundle.length) {
            yield curBundle;
        }
    };
}

module.exports = bundle;
