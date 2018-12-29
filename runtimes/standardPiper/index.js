const isArray = require("lodash/isArray");
const isFunction = require("lodash/isFunction");

const {
    checkIs,
    hasOrIsIterator,
} = require("../../shared");

function buildPiper(getIterFunc, ...modifiers) {
    checkIs("Function", isFunction(getIterFunc), "getIterFunc");
    checkIs("Array", isArray(modifiers), "modifiers");

    modifiers.forEach(function modifierValidator(modifier, index) {
        checkIs("Function", isFunction(modifier), `modifier[${index}]`);
    });

    return function standardPiper() {
        const initialIter = getIterFunc();
        checkIs("Iterator", hasOrIsIterator(initialIter));

        return modifiers.reduce(function reduceIterator(prevIterator, currentModifier, index) {
            checkIs("Function", isFunction(currentModifier), `modifier[${index}]`);
            const iter = currentModifier(prevIterator);
            checkIs("Iterator", hasOrIsIterator(iter), "modifier");

            return iter;
        }, initialIter);
    };
}

module.exports = {
    buildPiper,
};
