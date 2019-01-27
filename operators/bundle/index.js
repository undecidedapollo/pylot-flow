const isInteger = require("lodash/isInteger");
const {
    checkIs,
} = require("../../shared");

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
