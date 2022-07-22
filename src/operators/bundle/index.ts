import * as isInteger from "lodash.isinteger";
import {
    checkIs,
} from "../../shared";

export default function bundle(bundleAmount: number) {
    checkIs("integer", isInteger(bundleAmount), "bundleAmount");
    checkIs("greater than or equal to 1", bundleAmount >= 1, "bundleAmount");
    return function* bundleGenerator<T>(iterator: Iterable<T>): IterableIterator<T[]> {
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
