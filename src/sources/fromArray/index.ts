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
import { Flow } from "../../types";

export default function fromArray<T = any>(arr: T[]) : Flow<T> {
    checkIs("Array", isArray(arr));
    checkHas("Iterator", hasOrIsIterator(arr));

    return createFlow(getIteratorFromArray.bind(null, arr));
}
