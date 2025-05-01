export default function takeWhile<T>(predicate: (val: any, index: number) => boolean) {
    return function* takeWhileGenerator(iterator: Iterable<T>): Generator<T, void, void> {
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
