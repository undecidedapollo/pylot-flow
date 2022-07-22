import * as isInteger from "lodash.isinteger";

import {
    hasOrIsIterator,
    checkIs,
} from "../../shared";

type SelfArrNested<T> = T | SelfArrNested<T>[];

export default function flatten(maxDepth = Number.POSITIVE_INFINITY) {
    checkIs("Integer", maxDepth === Number.POSITIVE_INFINITY || isInteger(maxDepth), "maxDepth");
    checkIs("Greater than or equal to 0", maxDepth >= 0, "maxDepth");

    return function* flattenGenerator<T>(iterator: Iterable<SelfArrNested<T>>, currentDepth = 0) : IterableIterator<T> {
        if (currentDepth >= maxDepth) {
            yield* iterator as T[];
            return;
        }

        for (const val of iterator) {
            if (hasOrIsIterator(val)) {
                const newDepth = currentDepth + 1;
                yield* flattenGenerator(val as T[], newDepth) as any;
            } else {
                yield val as T;
            }
        }
    };
}
