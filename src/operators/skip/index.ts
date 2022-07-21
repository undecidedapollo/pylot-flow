export default function skip(skipCount) {
    return function* skipGenerator(iterator) {
        let index = 0;
        for (const val of iterator) {
            if (index >= skipCount) {
                yield val;
            }

            index += 1;
        }
    };
}
