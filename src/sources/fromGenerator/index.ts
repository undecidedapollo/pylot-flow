import {
    checkExists,
    checkIs,
    isFunction,
} from "../../shared";

import {
    createFlow,
} from "../../orchestrators/multiFlow";

export default function fromGenerator(getIterFunc) {
    checkExists(getIterFunc);
    checkIs("Function", isFunction(getIterFunc));
    return createFlow(getIterFunc);
}
