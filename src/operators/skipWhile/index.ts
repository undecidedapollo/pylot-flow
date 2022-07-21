export default function skipWhile(predicate: (val: any, index: number) => boolean) {
    return function* skipWhileGenerator(iterator: Iterable<any>) {
        let predicateReturnedFalse = false;
        let index = -1;
        for (const val of iterator as Iterable<any>) {
            index += 1;
            const predicateResponse: boolean = predicateReturnedFalse || !(predicate(val, index));

            if (predicateResponse) {
                predicateReturnedFalse = true;
                yield val;
            }
        }
    };
}
