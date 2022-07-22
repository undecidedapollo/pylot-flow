export default function filter<TInput>(predicate: (x: TInput, idx?: number) => boolean): (iterator: Iterable<TInput>) => IterableIterator<TInput> {
    return function* filterGenerator(iterator: Iterable<TInput>): IterableIterator<TInput> {
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
