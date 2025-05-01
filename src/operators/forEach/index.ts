export default function forEach<T>(predicate: (val: T, idx: number) => void) {
    return function* forEachGenerator(iterator: Iterable<T>): Generator<T, void, void> {
        let index = 0;
        for (const val of iterator) {
            predicate(val, index);
            index += 1;
            yield val;

        }
    };
}
