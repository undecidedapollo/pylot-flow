import {
    NOOP_PASSTHROUGH,
    hasOrIsIterator,
} from "../../shared";

type SelfArrNested<T> = T | SelfArrNested<T>[];

export type FlatMapPredicate<T, U> = (val: T, i?: number) => SelfArrNested<U>;

export default function flatMap<T, U>(predicate : FlatMapPredicate<T, U> = NOOP_PASSTHROUGH) {
    return function* flatMapGenerator(iterator: Iterable<T>) : IterableIterator<U> {
        let index = 0;
        for (const val of iterator) {
            const mappedVal = predicate(val, index);
            index += 1;
            if (hasOrIsIterator(mappedVal)) {
                yield* mappedVal as U[];
            } else {
                yield mappedVal as U;
            }
        }
    };
}
