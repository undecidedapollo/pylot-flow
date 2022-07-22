export default function take(takeCount: number) {
    return function* takeGenerator<T>(iterator: Iterable<T>) : IterableIterator<T> {
        if (takeCount <= 0) {
            return;
        }

        let index = 0;
        for (const val of iterator) {
            yield val;

            index += 1;
            if (index >= takeCount) {
                return;
            }
        }
    };
}
