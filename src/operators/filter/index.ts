export default function filter<T>(predicate: (val: T, idx: number) => boolean) {
    return function* filterGenerator(iterator: Iterable<T>): Generator<T, void, void> {
        let index = 0;
        for (const val of iterator) {
            const res = predicate(val, index);
            index += 1;
            if (res) {
                yield val;
            }
        }
    };
}
