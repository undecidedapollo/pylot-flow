import { hasOrIsIterator, checkIs } from "#shared.js";
import { Flatten } from "#types.js";

export default function flat(maxDepth: number = 1) {
    checkIs("Integer", maxDepth === Number.POSITIVE_INFINITY || Number.isSafeInteger(maxDepth), "maxDepth");
    checkIs("Greater than or equal to 0", maxDepth >= 0, "maxDepth");

    return function* flatGenerator<T>(iterator: Iterable<T>, currentDepth = 0): Generator<Flatten<T>, void, void> {
        if (currentDepth >= maxDepth) {
            yield* iterator;
            return;
        }

        for (const val of iterator) {
            if (hasOrIsIterator(val)) {
                const newDepth = currentDepth + 1;
                yield* flatGenerator(val as Iterable<T>, newDepth);
            } else {
                yield val;
            }
        }
    };
}
