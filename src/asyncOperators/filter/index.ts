export default function filter<T>(predicate: (val: T, idx: number) => Promise<boolean> | boolean) {
    return async function* filterGenerator(iterator: AsyncIterable<T> | Iterable<T>): AsyncGenerator<T, void, void> {
        let index = 0;
        for await (const val of iterator) {
            const res = predicate(val, index);
            index += 1;
            if (res) {
                yield val;
            }
        }
    };
}
