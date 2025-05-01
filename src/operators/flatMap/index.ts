import {
    NOOP_PASSTHROUGH,
    hasOrIsIterator,
} from "../../shared";
import { FlatMapPredicate } from "../../types";

export default function flatMap<T, TResponse>(predicate : FlatMapPredicate<T, TResponse> = NOOP_PASSTHROUGH) {
    return function* flatMapGenerator(iterator): Generator<TResponse, void, void> {
        let index = 0;
        for (const val of iterator) {
            const mappedVal = predicate(val, index);
            index += 1;
            if (hasOrIsIterator(mappedVal)) {
                yield* (mappedVal as Iterable<TResponse>);
            } else {
                yield mappedVal as TResponse;
            }
        }
    };
}
