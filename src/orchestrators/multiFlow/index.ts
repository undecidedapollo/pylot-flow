import * as isFunction from "lodash.isfunction";

import filter from "../../operators/filter";

import {
    checkExists,
    checkIs,
    hasOrIsIterator,
} from "../../shared";

import * as standardPiper from "../../runtimes/standardPiper";

export function createFlow(getIterFunc, piper = standardPiper.buildPiper) {
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

    return {
        [Symbol.iterator]: getIterator,
        getIterator,
        getGenerator,
        pipe,
        toArray,
        find,
        firstOrDefault,
    };
}
