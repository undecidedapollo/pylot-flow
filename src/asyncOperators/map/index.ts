export default function map<T, TResponse>(predicate: (val: T, idx: number) => Promise<TResponse> | TResponse) {
    return async function* mapGenerator(
        iterator: AsyncIterable<T> | Iterable<T>,
    ): AsyncGenerator<TResponse, void, void> {
        let index = 0;
        for await (const val of iterator) {
            yield predicate(val, index);
            index += 1;
        }
    };
}
