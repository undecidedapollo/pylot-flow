import { createAsyncFlow } from "#orchestrators/async/index.js";
import fromArray from "#sources/fromArray/index.js";
import fromAsyncIterable from "#sources/fromAsyncIterator/index.js";
import fromGenerator from "#sources/fromGenerator/index.js";
import range from "#sources/range/index.js";
import type { Flow } from "#types.js";

export { fromArray, fromAsyncIterable, fromGenerator, range, createAsyncFlow as fromAsyncGenerator };
export const fromIterator = fromArray;
export const async = fromAsyncIterable;

function flow<T>(array: T[]): Flow<T> {
    return fromArray(array);
}
flow.fromArray = fromArray;
flow.fromIterator = fromArray;
flow.fromGenerator = fromGenerator;
flow.range = range;
flow.async = fromAsyncIterable;
flow.fromAsyncIterable = fromAsyncIterable;
flow.fromAsyncGenerator = createAsyncFlow;

export { flow };
export default flow;
