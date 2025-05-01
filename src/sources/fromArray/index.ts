import { checkHas, hasOrIsIterator, getIterator } from "../../shared";

import { createFlow } from "../../orchestrators/sync";

export default function fromArray<T>(arr: Iterable<T>) {
    checkHas("Iterator", hasOrIsIterator(arr));

    return createFlow(function getIterFromArr(): Iterable<T> {
        return getIterator(arr);
    });
}
