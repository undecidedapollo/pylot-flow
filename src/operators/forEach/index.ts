export default function forEach(predicate) {
    return function* forEachGenerator(iterator) {
        let index = 0;
        for (const val of iterator) {
            predicate(val, index);
            index += 1;
            yield val;

        }
    };
}
