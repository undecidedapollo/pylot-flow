export default function map<T, U>(predicate: (x: T, idx?: number) => U): (iterator: Iterable<T>) => IterableIterator<U> {
    return function* mapGenerator(iterator): IterableIterator<U> {
        let index = 0;
        for (const val of iterator) {
            yield predicate(val, index);
            index += 1;
        }
    };
}
