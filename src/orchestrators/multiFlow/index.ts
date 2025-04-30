import filter from "../../operators/filter";

import {
    checkExists,
    checkIs,
    exists,
    hasOrIsIterator,
    isArray,
    isFunction,
} from "../../shared";

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


export function createFlow(getIterFunc) {
    checkIs("Function", isFunction(getIterFunc), "getIterFunc");

    function _getExternalIterator() {
        const iter = getIterFunc();
        checkExists(iter);
        checkIs("Iterator", hasOrIsIterator(iter));
        return iter;
    }

    function getGenerator() {
        const iter = _getExternalIterator();
        return function* fakeGenerator() {
            yield* iter;
        };
    }

    function getIterator() {
        return getGenerator()();
    }

    function pipe(...modifiers) {
        return createFlow(buildPiper(getIterFunc, ...modifiers));
    }

    function toArray() {
        return Array.from(getIterator());
    }

    function firstOrDefault(defaultVal = null) {
        for (const val of getIterator()) {
            return val;
        }

        return defaultVal;
    }

    function find(predicate) {
        return pipe(filter(predicate)).firstOrDefault();
    }

    function reduce(predicate, initialValue?) {
        let index = -1;
        let accumulator = initialValue;
        const iter = getIterator();

        for (const val of iter) {
            index += 1;
            if (index === 0 && !exists(accumulator)) {
                accumulator = val;
                continue;
            }

            accumulator = predicate(accumulator, val, index);
        }

        if (index === -1 && !exists(initialValue)) {
            // This is added for compatibility with the array implementation of reduce.
            throw new TypeError("Reduce of empty array with no initial value");
        }

        return accumulator;
    }

    return {
        [Symbol.iterator]: getIterator,
        getIterator,
        getGenerator,
        pipe,
        toArray,
        find,
        firstOrDefault,
        reduce,
        filter: filter,
    };
}
