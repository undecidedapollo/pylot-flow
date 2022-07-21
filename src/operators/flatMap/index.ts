import {
    NOOP_PASSTHROUGH,
    hasOrIsIterator,
} from "../../shared";

export type FlatMapPredicate = (val: any, i?: number) => any;

export default function flatMap(predicate : FlatMapPredicate = NOOP_PASSTHROUGH) {
    return function* flatMapGenerator(iterator) {
        let index = 0;
        for (const val of iterator) {
            const mappedVal = predicate(val, index);
            index += 1;
            if (hasOrIsIterator(mappedVal)) {
                yield* mappedVal;
            } else {
                yield mappedVal;
            }
        }
    };
}
