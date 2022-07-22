export default function takeWhile<T>(predicate: (val: T, index: number) => boolean) {
    return function* takeWhileGenerator(iterator: Iterable<T>) : IterableIterator<T> {
        let index = -1;
        for (const val of iterator) {
            index += 1;

            const result = predicate(val, index);

            if (!result) {
                return;

            }

            yield val;
        }
    };
}
