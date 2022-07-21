export default function takeWhile(predicate) {
    return function* takeWhileGenerator(iterator) {
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
