export default function filter(predicate) {
    return function* filterGenerator(iterator) {
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
