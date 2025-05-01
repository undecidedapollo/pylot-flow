import { checkHas, hasOrIsIterator, hasOrIsAsyncIterator, getAsyncIterator } from "../../shared";

import { createAsyncFlow } from "../../orchestrators/async";

export default function fromAsyncIterable<T>(arr: AsyncIterable<T> | Iterable<T>) {
    checkHas("Iterator", hasOrIsAsyncIterator(arr) || hasOrIsIterator(arr));

    return createAsyncFlow(function getIterFromArr(): AsyncIterable<T> {
        return getAsyncIterator(arr);
    });
}
