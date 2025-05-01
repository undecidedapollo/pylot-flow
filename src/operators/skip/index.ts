export default function skip(skipCount: number) {
    return function* skipGenerator<T>(iterator: Iterable<T>): Generator<T, void, void> {
        let index = 0;
        for (const val of iterator) {
            if (index >= skipCount) {
                yield val;
            }

            index += 1;
        }
    };
}
