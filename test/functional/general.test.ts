import filter from "../../src/operators/filter";
import map from "../../src/operators/map";
import skip from "../../src/operators/skip";
import take from "../../src/operators/take";

import * as flow from "../../src";
import tap from "../../src/operators/tap";

describe("general library tests", function () {
    const origArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const resArr = [8, 12, 16];

    describe("explicit pipe", function () {
        describe("fromArray", function () {
            it("should return proper sequence", function () {
                const initialStub = jest.fn();
                const preFilterStub = jest.fn();
                const postFilterStub = jest.fn();
                const postMapStub = jest.fn();
                const res = flow
                    .fromArray(origArr)
                    .pipe(tap(initialStub), skip(2))
                    .pipe(tap(preFilterStub), filter((x) => x % 2 === 0), tap(postFilterStub))
                    .pipe(map(x => x * 2), take(3), tap(postMapStub))
                    .toArray();

                expect(res).toStrictEqual(resArr);

                expect(initialStub).toHaveBeenCalledTimes(8);
                expect(preFilterStub).toHaveBeenCalledTimes(6);
                expect(postFilterStub).toHaveBeenCalledTimes(3);
                expect(postMapStub).toHaveBeenCalledTimes(3);
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
                    .pipe(tap(initialStub), skip(2))
                    .pipe(tap(preFilterStub), filter((x) => x % 2 === 0), tap(postFilterStub))
                    .pipe(map(x => x * 2), take(3), tap(postMapStub))
                    .toArray();

                expect(res).toStrictEqual(resArr);

                expect(initialStub).toHaveBeenCalledTimes(8);
                expect(preFilterStub).toHaveBeenCalledTimes(6);
                expect(postFilterStub).toHaveBeenCalledTimes(3);
                expect(postMapStub).toHaveBeenCalledTimes(3);
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
                    .pipe(tap(initialStub), skip(2))
                    .pipe(tap(preFilterStub), filter((x) => x % 2 === 0), tap(postFilterStub))
                    .pipe(map(x => x * 2), take(3), tap(postMapStub))
                    .toArray();

                expect(res).toStrictEqual(resArr);

                expect(initialStub).toHaveBeenCalledTimes(8);
                expect(preFilterStub).toHaveBeenCalledTimes(6);
                expect(postFilterStub).toHaveBeenCalledTimes(3);
                expect(postMapStub).toHaveBeenCalledTimes(3);
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
                    .pipe(tap(initialStub), skip(2))
                    .pipe(tap(preFilterStub), filter((x) => x % 2 === 0), tap(postFilterStub))
                    .pipe(map(x => x * 2), take(3), tap(postMapStub));
                let i = 0;
                for (const val of res) {
                    expect(val).toBe(resArr[i]);
                    i++;
                }

                expect(i).toBe(resArr.length);
                expect(initialStub).toHaveBeenCalledTimes(8);
                expect(preFilterStub).toHaveBeenCalledTimes(6);
                expect(postFilterStub).toHaveBeenCalledTimes(3);
                expect(postMapStub).toHaveBeenCalledTimes(3);
            });

            it("should return proper sequence in Array.from", function () {
                const initialStub = jest.fn();
                const preFilterStub = jest.fn();
                const postFilterStub = jest.fn();
                const postMapStub = jest.fn();
                const res = Array.from(flow
                    .fromArray(origArr)
                    .pipe(tap(initialStub), skip(2))
                    .pipe(tap(preFilterStub), filter((x) => x % 2 === 0), tap(postFilterStub))
                    .pipe(map(x => x * 2), take(3), tap(postMapStub)));

                expect(Array.from(res)).toStrictEqual(resArr);

                expect(initialStub).toHaveBeenCalledTimes(8);
                expect(preFilterStub).toHaveBeenCalledTimes(6);
                expect(postFilterStub).toHaveBeenCalledTimes(3);
                expect(postMapStub).toHaveBeenCalledTimes(3);
            });
        });
    });

    describe("interior pipe", function () {
        describe("fromArray", function () {
            it("should return proper sequence", function () {
                const initialStub = jest.fn();
                const preFilterStub = jest.fn();
                const postFilterStub = jest.fn();
                const postMapStub = jest.fn();
                const res = flow
                    .fromArray(origArr)
                    .tap(initialStub)
                    .skip(2)
                    .tap(preFilterStub)
                    .filter((x) => x % 2 === 0)
                    .tap(postFilterStub)
                    .map(x => x * 2)
                    .take(3)
                    .tap(postMapStub)
                    .toArray();

                expect(res).toStrictEqual(resArr);

                expect(initialStub).toHaveBeenCalledTimes(8);
                expect(preFilterStub).toHaveBeenCalledTimes(6);
                expect(postFilterStub).toHaveBeenCalledTimes(3);
                expect(postMapStub).toHaveBeenCalledTimes(3);
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
                    .tap(initialStub)
                    .skip(2)
                    .tap(preFilterStub)
                    .filter((x) => x % 2 === 0)
                    .tap(postFilterStub)
                    .map(x => x * 2)
                    .take(3)
                    .tap(postMapStub)
                    .toArray();

                expect(res).toStrictEqual(resArr);

                expect(initialStub).toHaveBeenCalledTimes(8);
                expect(preFilterStub).toHaveBeenCalledTimes(6);
                expect(postFilterStub).toHaveBeenCalledTimes(3);
                expect(postMapStub).toHaveBeenCalledTimes(3);
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
                    .tap(initialStub)
                    .skip(2)
                    .tap(preFilterStub)
                    .filter((x) => x % 2 === 0)
                    .tap(postFilterStub)
                    .map(x => x * 2)
                    .take(3)
                    .tap(postMapStub)
                    .toArray();

                expect(res).toStrictEqual(resArr);

                expect(initialStub).toHaveBeenCalledTimes(8);
                expect(preFilterStub).toHaveBeenCalledTimes(6);
                expect(postFilterStub).toHaveBeenCalledTimes(3);
                expect(postMapStub).toHaveBeenCalledTimes(3);
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
                    .tap(initialStub)
                    .skip(2)
                    .tap(preFilterStub)
                    .filter((x) => x % 2 === 0)
                    .tap(postFilterStub)
                    .map(x => x * 2)
                    .take(3)
                    .tap(postMapStub);
                let i = 0;
                for (const val of res) {
                    expect(val).toBe(resArr[i]);
                    i++;
                }

                expect(i).toBe(resArr.length);
                expect(initialStub).toHaveBeenCalledTimes(8);
                expect(preFilterStub).toHaveBeenCalledTimes(6);
                expect(postFilterStub).toHaveBeenCalledTimes(3);
                expect(postMapStub).toHaveBeenCalledTimes(3);
            });

            it("should return proper sequence in Array.from", function () {
                const initialStub = jest.fn();
                const preFilterStub = jest.fn();
                const postFilterStub = jest.fn();
                const postMapStub = jest.fn();
                const res = Array.from(flow
                    .fromArray(origArr)
                    .tap(initialStub)
                    .skip(2)
                    .tap(preFilterStub)
                    .filter((x) => x % 2 === 0)
                    .tap(postFilterStub)
                    .map(x => x * 2)
                    .take(3)
                    .tap(postMapStub));

                expect(Array.from(res)).toStrictEqual(resArr);

                expect(initialStub).toHaveBeenCalledTimes(8);
                expect(preFilterStub).toHaveBeenCalledTimes(6);
                expect(postFilterStub).toHaveBeenCalledTimes(3);
                expect(postMapStub).toHaveBeenCalledTimes(3);
            });
        });
    });
});
