import { checkExists, checkIs, isFunction } from "#shared.js";

import { createFlow } from "#orchestrators/sync/index.js";

export default function fromGenerator<T>(getIterFunc: () => Iterable<T>) {
    checkExists(getIterFunc);
    checkIs("Function", isFunction(getIterFunc));
    return createFlow(getIterFunc);
}
