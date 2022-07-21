import filter from "../../src/operators/filter";
import forEach from "../../src/operators/forEach";
import map from "../../src/operators/map";
import skip from "../../src/operators/skip";
import take from "../../src/operators/take";

import * as flow from "../../src";

describe("general library tests", function () {
    const origArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const resArr = [8, 12, 16];

    describe("fromArray", function () {
        it("should return proper sequence", function () {
            const initialStub = jest.fn();
            const preFilterStub = jest.fn();
            const postFilterStub = jest.fn();
            const postMapStub = jest.fn();
            const res = flow
                .fromArray(origArr)
                .pipe(forEach(initialStub), skip(2))
                .pipe(forEach(preFilterStub), filter((x) => x % 2 === 0), forEach(postFilterStub))
                .pipe(map(x => x * 2), take(3), forEach(postMapStub))
                .toArray();

            expect(res.length).toBe(resArr.length);
            expect(res.every((x, i) => x === resArr[i])).toBe(true);

            expect(initialStub).toBeCalledTimes(8);
            expect(preFilterStub).toBeCalledTimes(6);
            expect(postFilterStub).toBeCalledTimes(3);
            expect(postMapStub).toBeCalledTimes(3);
        });
    });

    describe("fromGenerator", function () {
        it("should return proper sequence", function () {
            const initialStub = jest.fn();
            const preFilterStub = jest.fn();
            const postFilterStub = jest.fn();
            const postMapStub = jest.fn();
            const res = flow
                .fromGenerator(function* myGenerator() {
                    yield* origArr;
                })
                .pipe(forEach(initialStub), skip(2))
                .pipe(forEach(preFilterStub), filter((x) => x % 2 === 0), forEach(postFilterStub))
                .pipe(map(x => x * 2), take(3), forEach(postMapStub))
                .toArray();

            expect(res.length).toBe(resArr.length);
            expect(res.every((x, i) => x === resArr[i])).toBe(true);

            expect(initialStub).toBeCalledTimes(8);
            expect(preFilterStub).toBeCalledTimes(6);
            expect(postFilterStub).toBeCalledTimes(3);
            expect(postMapStub).toBeCalledTimes(3);
        });
    });

    describe("range", function () {
        it("should return proper sequence", function () {
            const initialStub = jest.fn();
            const preFilterStub = jest.fn();
            const postFilterStub = jest.fn();
            const postMapStub = jest.fn();
            const res = flow
                .range(1, 11, 1)
                .pipe(forEach(initialStub), skip(2))
                .pipe(forEach(preFilterStub), filter((x) => x % 2 === 0), forEach(postFilterStub))
                .pipe(map(x => x * 2), take(3), forEach(postMapStub))
                .toArray();

            expect(res.length).toBe(resArr.length);
            expect(res.every((x, i) => x === resArr[i])).toBe(true);

            expect(initialStub).toBeCalledTimes(8);
            expect(preFilterStub).toBeCalledTimes(6);
            expect(postFilterStub).toBeCalledTimes(3);
            expect(postMapStub).toBeCalledTimes(3);
        });
    });

    describe("Symbol.iterator", function () {
        it("should return proper sequence in for loop", function () {
            const initialStub = jest.fn();
            const preFilterStub = jest.fn();
            const postFilterStub = jest.fn();
            const postMapStub = jest.fn();
            const res = flow
                .fromArray(origArr)
                .pipe(forEach(initialStub), skip(2))
                .pipe(forEach(preFilterStub), filter((x) => x % 2 === 0), forEach(postFilterStub))
                .pipe(map(x => x * 2), take(3), forEach(postMapStub));
            let i = 0;
            for (const val of res) {
                expect(val).toBe(resArr[i]);
                i++;
            }

            expect(i).toBe(resArr.length);
            expect(initialStub).toBeCalledTimes(8);
            expect(preFilterStub).toBeCalledTimes(6);
            expect(postFilterStub).toBeCalledTimes(3);
            expect(postMapStub).toBeCalledTimes(3);
        });

        it("should return proper sequence in Array.from", function () {
            const initialStub = jest.fn();
            const preFilterStub = jest.fn();
            const postFilterStub = jest.fn();
            const postMapStub = jest.fn();
            const res = Array.from(flow
                .fromArray(origArr)
                .pipe(forEach(initialStub), skip(2))
                .pipe(forEach(preFilterStub), filter((x) => x % 2 === 0), forEach(postFilterStub))
                .pipe(map(x => x * 2), take(3), forEach(postMapStub)));

            expect(res.length).toBe(resArr.length);
            expect(res.every((x, i) => x === resArr[i])).toBe(true);

            expect(initialStub).toBeCalledTimes(8);
            expect(preFilterStub).toBeCalledTimes(6);
            expect(postFilterStub).toBeCalledTimes(3);
            expect(postMapStub).toBeCalledTimes(3);
        });
    });
});
