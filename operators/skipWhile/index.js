function skipWhile(predicate) {
    return function* skipWhileGenerator(iterator) {
        let predicateReturnedFalse = false;
        let index = -1;
        for (const val of iterator) {
            index += 1;
            const predicateResponse = predicateReturnedFalse || !(predicate(val, index));

            if (predicateResponse) {
                predicateReturnedFalse = true;
                yield val;
            }
        }
    };
}

module.exports = skipWhile;
