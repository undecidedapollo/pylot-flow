export default function map<T, TResponse>(predicate: (val: T, idx: number) => TResponse) {
    return function* mapGenerator(iterator: Iterable<T>): Generator<TResponse, void, void> {
        let index = 0;
        for (const val of iterator) {
            yield predicate(val, index);
            index += 1;
        }
    };
}
