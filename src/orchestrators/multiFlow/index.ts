import * as isFunction from "lodash.isfunction";

import filter from "../../operators/filter";

import {
    checkExists,
    checkIs,
    exists,
    hasOrIsIterator,
} from "../../shared";

import * as standardPiper from "../../runtimes/standardPiper";
import { Flow } from "../../types";

export function createFlow(getIterFunc, piper = standardPiper.buildPiper) : Flow {
    checkIs("Function", isFunction(getIterFunc), "getIterFunc");
    checkIs("Function", isFunction(piper), "piper");

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
        return createFlow(piper(getIterFunc, ...modifiers), piper);
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
    };
}
