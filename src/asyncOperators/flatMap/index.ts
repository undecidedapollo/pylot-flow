import { NOOP_PASSTHROUGH, hasOrIsAsyncIterator, hasOrIsIterator } from "#shared.js";
import { AsyncFlatMapPredicate } from "#types.js";

export default function flatMap<T, TResponse>(predicate: AsyncFlatMapPredicate<T, TResponse> = NOOP_PASSTHROUGH) {
    return async function* flatMapGenerator(
        iterator: AsyncIterable<T> | Iterable<T>,
    ): AsyncGenerator<TResponse, void, void> {
        let index = 0;
        for await (const val of iterator) {
            const mappedVal = await predicate(val, index);
            index += 1;
            if (hasOrIsAsyncIterator(mappedVal) || hasOrIsIterator(mappedVal)) {
                yield* mappedVal as Iterable<TResponse>;
            } else {
                yield mappedVal as TResponse;
            }
        }
    };
}
