import { checkHas, hasOrIsIterator, getIterator } from "#shared.js";

import { createFlow } from "#orchestrators/sync/index.js";

export default function fromArray<T>(arr: Iterable<T>) {
    checkHas("Iterator", hasOrIsIterator(arr));

    return createFlow(function getIterFromArr(): Iterable<T> {
        return getIterator(arr);
    });
}
