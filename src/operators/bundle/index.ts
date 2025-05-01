
import {
    checkIs,
} from "../../shared";

export default function bundle(bundleAmount: number) {
    checkIs("integer", Number.isSafeInteger(bundleAmount), "bundleAmount");
    checkIs("greater than or equal to 1", bundleAmount >= 1, "bundleAmount");
    return function* bundleGenerator<TSource>(iterator: Iterable<TSource>): Generator<TSource[], void, void> {
        let curBundle = [];
        for (const val of iterator) {
            curBundle.push(val);
            if (curBundle.length >= bundleAmount) {
                yield curBundle;
                curBundle = [];
            }
        }
        if (curBundle.length) {
            yield curBundle;
        }
    };
}
