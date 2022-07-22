import * as isFunction from "lodash.isfunction";

import {
    checkExists,
    checkIs,
} from "../../shared";

import {
    createFlow,
} from "../../orchestrators/multiFlow";
import { Flow } from "../../types";

export default function fromGenerator<T = any>(getIterFunc: () => Iterable<T>) : Flow<T> {
    checkExists(getIterFunc);
    checkIs("Function", isFunction(getIterFunc));
    return createFlow(getIterFunc);
}
