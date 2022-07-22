export default function skip(skipCount) {
    return function* skipGenerator<T>(iterator: Iterable<T>) : IterableIterator<T> {
        let index = 0;
        for (const val of iterator) {
            if (index >= skipCount) {
                yield val;
            }

            index += 1;
        }
    };
}
