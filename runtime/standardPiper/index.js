const {
    checkExists,
    checkIs,
    hasOrIsIterator,
} = require("../../shared");

function buildPiper(getIterFunc, modifiers) {
    return function standardPiper() {
        return modifiers.reduce(function reduceIterator(prevIterator, currentModifier) {
            const iter = currentModifier(prevIterator);
            checkExists(iter);
            checkIs("Iterator", hasOrIsIterator(iter), "modifier");

            return iter;
        }, getIterFunc());
    };
}

module.exports = {
    buildPiper,
};
