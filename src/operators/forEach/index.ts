export default function forEach<T>(predicate: (x: T, idx?: number) => void) : (iterator: Iterable<T>) => IterableIterator<T> {
    return function* forEachGenerator(iterator: Iterable<T>) : IterableIterator<T> {
        let index = 0;
        for (const val of iterator) {
            predicate(val, index);
            index += 1;
            yield val;

        }
    };
}
