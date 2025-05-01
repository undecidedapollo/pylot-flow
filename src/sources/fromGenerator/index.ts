import { checkExists, checkIs, isFunction } from "../../shared";

import { createFlow } from "../../orchestrators/multiFlow";

export default function fromGenerator<T>(getIterFunc: () => Iterable<T>) {
    checkExists(getIterFunc);
    checkIs("Function", isFunction(getIterFunc));
    return createFlow(getIterFunc);
}
