import bundle from "../../operators/bundle";
import filter from "../../operators/filter";
import flatMap from "../../operators/flatMap";
import flatten from "../../operators/flatten";
import forEach from "../../operators/forEach";
import map from "../../operators/map";
import skip from "../../operators/skip";
import skipWhile from "../../operators/skipWhile";
import take from "../../operators/take";
import takeWhile from "../../operators/takeWhile";

import { checkExists, checkIs, exists, hasOrIsIterator, isArray, isFunction } from "../../shared";
import { Flow, FlowPipe } from "../../types";

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

export function createFlow<T>(getIterFunc: () => Iterable<T>): Flow<T> {
    checkIs("Function", isFunction(getIterFunc), "getIterFunc");

    function _getExternalIterator() {
        const iter = getIterFunc();
        checkExists(iter);
        checkIs("Iterator", hasOrIsIterator(iter));
        return iter;
    }

    function getGenerator(): () => Generator<T, void, void> {
        const iter = _getExternalIterator();
        return function* fakeGenerator(): Generator<T, void, void> {
            yield* iter;
        };
    }

    function getIterator(): Generator<T, void, void> {
        return getGenerator()();
    }

    const pipe: FlowPipe<T> = function pipe(...modifiers) {
        return createFlow(buildPiper(getIterFunc, ...modifiers));
    };

    function toArray() {
        return Array.from(getIterator());
    }

    function firstOrDefault(defaultVal = null) {
        for (const val of getIterator()) {
            return val;
        }

        return defaultVal;
    }

    function find(predicate: (val: T) => boolean): T | null {
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
        bundle: function _bundle(bundleAmount: number): Flow<T[]> {
            return pipe(bundle(bundleAmount));
        },
        filter: function _filter(predicate): Flow<T> {
            return pipe(filter(predicate));
        },
        flatMap: function _flatMap<TResponse>(predicate): Flow<TResponse> {
            return pipe(flatMap(predicate));
        },
        flatten: function _flatten(): Flow<any> {
            return pipe(flatten());
        },
        forEach: function _forEach(predicate): Flow<T> {
            return pipe(forEach(predicate));
        },
        map: function _map<TResponse>(predicate): Flow<TResponse> {
            return pipe(map(predicate));
        },
        skip: function _skip(count: number): Flow<T> {
            return pipe(skip(count));
        },
        skipWhile: function _skipWhile(predicate): Flow<T> {
            return pipe(skipWhile(predicate));
        },
        take: function _take(count: number): Flow<T> {
            return pipe(take(count));
        },
        takeWhile: function _takeWhile(predicate): Flow<T> {
            return pipe(takeWhile(predicate));
        },
    };
}
