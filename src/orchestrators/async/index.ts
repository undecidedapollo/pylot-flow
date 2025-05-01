import filter from "../../asyncOperators/filter";
import flatMap from "../../asyncOperators/flatMap";
import map from "../../asyncOperators/map";

import { checkExists, checkIs, exists, hasOrIsAsyncIterator, hasOrIsIterator, isArray, isFunction } from "../../shared";
import { AsyncFlow, AsyncFlowPipe, InternalAsyncFlow, WritableLike } from "../../types";

function buildPiper(getIterFunc, ...modifiers) {
    checkIs("Function", isFunction(getIterFunc), "getIterFunc");
    checkIs("Array", isArray(modifiers), "modifiers");

    modifiers.forEach(function modifierValidator(modifier, index) {
        checkIs("Function", isFunction(modifier), `modifier[${index}]`);
    });

    return function asyncPiper() {
        const initialIter = getIterFunc();
        checkIs("Iterator", hasOrIsAsyncIterator(initialIter) || hasOrIsIterator(initialIter));

        return modifiers.reduce(function reduceIterator(prevIterator, currentModifier, index) {
            checkIs("Function", isFunction(currentModifier), `modifier[${index}]`);
            const iter = currentModifier(prevIterator);
            checkIs("Iterator", hasOrIsAsyncIterator(iter) || hasOrIsIterator(iter), "modifier");

            return iter;
        }, initialIter);
    };
}

export function createAsyncFlow<T>(getIterFunc: () => AsyncIterable<T> | Iterable<T>): AsyncFlow<T> {
    checkIs("Function", isFunction(getIterFunc), "getIterFunc");

    function _getExternalIterator() {
        const iter = getIterFunc();
        checkExists(iter);
        checkIs("Iterator", hasOrIsAsyncIterator(iter) || hasOrIsIterator(iter));
        return iter;
    }

    function getGenerator(): () => AsyncGenerator<T, void, void> {
        const iter = _getExternalIterator();
        return async function* fakeGenerator(): AsyncGenerator<T, void, void> {
            yield* iter;
        };
    }

    function getIterator(): AsyncGenerator<T, void, void> {
        return getGenerator()();
    }

    const pipe: AsyncFlowPipe<T> = function pipe(...modifiers) {
        return createAsyncFlow(buildPiper(getIterFunc, ...modifiers));
    };

    async function toArray(): Promise<T[]> {
        let values: T[] = [];
        for await (const value of getIterator()) {
            values.push(value);
        }
        return values;
    }

    async function firstOrDefault(defaultVal = null) {
        for await (const val of getIterator()) {
            return val;
        }

        return defaultVal;
    }

    async function find(predicate: (val: T) => boolean | Promise<boolean>): Promise<T | null> {
        return await pipe(filter(predicate)).firstOrDefault();
    }

    async function forEach(predicate: (val: T, idx: number) => any): Promise<void> {
        let index = 0;

        for await (const val of getIterator()) {
            predicate(val, index);
            index += 1;
        }
    }

    async function reduce(predicate, initialValue?) {
        let index = -1;
        let accumulator = initialValue;

        for await (const val of getIterator()) {
            index += 1;
            if (index === 0 && !exists(accumulator)) {
                accumulator = val;
                continue;
            }

            accumulator = await predicate(accumulator, val, index);
        }

        if (index === -1 && !exists(initialValue)) {
            // This is added for compatibility with the array implementation of reduce.
            throw new TypeError("Reduce of empty array with no initial value");
        }

        return accumulator;
    }

    async function pipeToWritable(writable: WritableLike): Promise<void> {
        for await (const chunk of getIterator() as AsyncIterable<string>) {
            if (!writable.write(chunk)) {
                await onceDrain(writable);
            }
        }
        writable.end();
    }

    const internal: InternalAsyncFlow<T> = {
        [Symbol.asyncIterator]: getIterator,
        getIterator,
        getGenerator,
        pipe,
        toArray,
        find,
        firstOrDefault,
        forEach,
        splitMerge: function _splitMerge(delimiter: string): AsyncFlow<string> {
            return (pipe as AsyncFlowPipe<string>)(splitMerge(delimiter));
        },
        reduce: reduce as any,
        filter: function _filter(predicate): AsyncFlow<T> {
            return pipe(filter(predicate));
        },
        map: function _map<TResponse>(predicate): AsyncFlow<TResponse> {
            return pipe(map(predicate));
        },
        flatMap: function _flatMap<TResponse>(predicate): AsyncFlow<TResponse> {
            return pipe(flatMap(predicate));
        },
        pipeToWritable,
    };

    // TODO: This is done to define custom types for certain datatypes (strings). If there is a better way to do this we should change it.
    return internal as unknown as AsyncFlow<T>;
}

function onceDrain(writable: WritableLike): Promise<void> {
    return new Promise((resolve, reject) => {
        const onDrain = () => {
            cleanup();
            resolve();
        };
        const onError = (err: Error) => {
            cleanup();
            reject(err);
        };
        const cleanup = () => {
            writable.removeListener?.("drain", onDrain);
            writable.removeListener?.("error", onError);
        };

        writable.on("drain", onDrain);
        writable.on?.("error", onError); // Optional chaining for compatibility
    });
}

function splitMerge(delimiter: string) {
    return async function* split(
        iterator: AsyncIterable<string> | Iterable<string>,
    ): AsyncGenerator<string, void, void> {
        let buffer = "";
        for await (const val of iterator) {
            const splitLines = val.split(delimiter);
            for (let i = 0; i < splitLines.length - 1; i++) {
                yield buffer + splitLines[i];
                buffer = "";
            }
            buffer += splitLines[splitLines.length - 1];
        }

        if (buffer.length > 0) {
            yield buffer;
        }
        return;
    };
}
