import { checkIs, checkHas, hasOrIsIterator, getIteratorFromArray, isArray } from "../../shared";

import { createFlow } from "../../orchestrators/multiFlow";

export default function fromArray<T>(arr: T[]) {
    checkIs("Array", isArray(arr), "arr");
    checkHas("Iterator", hasOrIsIterator(arr));

    return createFlow(function getIterFromArr(): Iterable<T> {
        return getIteratorFromArray(arr);
    });
}
