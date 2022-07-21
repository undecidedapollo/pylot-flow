import * as isArray from "lodash.isarray";

import {
    checkIs,
    checkHas,
    hasOrIsIterator,
    getIteratorFromArray,
} from "../../shared";

import {
    createFlow,
} from "../../orchestrators/multiFlow";

export default function fromArray(arr) {
    checkIs("Array", isArray(arr));
    checkHas("Iterator", hasOrIsIterator(arr));

    return createFlow(function getIterFromArr() {
        return getIteratorFromArray(arr);
    });
}
