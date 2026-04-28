import { checkHas, hasOrIsIterator, hasOrIsAsyncIterator, getAsyncIterator } from "#shared.js";

import { createAsyncFlow } from "#orchestrators/async/index.js";

export default function fromAsyncIterable<T>(arr: AsyncIterable<T> | Iterable<T>) {
    checkHas("Iterator", hasOrIsAsyncIterator(arr) || hasOrIsIterator(arr));

    return createAsyncFlow(function getIterFromArr(): AsyncIterable<T> {
        return getAsyncIterator(arr);
    });
}
