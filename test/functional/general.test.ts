import { jest } from "@jest/globals";
import filter from "#operators/filter/index.js";
import map from "#operators/map/index.js";
import skip from "#operators/skip/index.js";
import take from "#operators/take/index.js";

import * as flow from "#index.js";
import tap from "#operators/tap/index.js";

describe("general library tests", function () {
    const origArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const resArr = [8, 12, 16];

    describe("explicit pipe", function () {
        describe("fromArray", function () {
            it("should return proper sequence", function () {
                const initialStub = jest.fn<(val: number, idx: number) => void>();
                const preFilterStub = jest.fn<(val: number, idx: number) => void>();
                const postFilterStub = jest.fn<(val: number, idx: number) => void>();
                const postMapStub = jest.fn<(val: number, idx: number) => void>();
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
                const initialStub = jest.fn<(val: number, idx: number) => void>();
                const preFilterStub = jest.fn<(val: number, idx: number) => void>();
                const postFilterStub = jest.fn<(val: number, idx: number) => void>();
                const postMapStub = jest.fn<(val: number, idx: number) => void>();
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
                const initialStub = jest.fn<(val: number, idx: number) => void>();
                const preFilterStub = jest.fn<(val: number, idx: number) => void>();
                const postFilterStub = jest.fn<(val: number, idx: number) => void>();
                const postMapStub = jest.fn<(val: number, idx: number) => void>();
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
                const initialStub = jest.fn<(val: number, idx: number) => void>();
                const preFilterStub = jest.fn<(val: number, idx: number) => void>();
                const postFilterStub = jest.fn<(val: number, idx: number) => void>();
                const postMapStub = jest.fn<(val: number, idx: number) => void>();
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
                const initialStub = jest.fn<(val: number, idx: number) => void>();
                const preFilterStub = jest.fn<(val: number, idx: number) => void>();
                const postFilterStub = jest.fn<(val: number, idx: number) => void>();
                const postMapStub = jest.fn<(val: number, idx: number) => void>();
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
                const initialStub = jest.fn<(val: number, idx: number) => void>();
                const preFilterStub = jest.fn<(val: number, idx: number) => void>();
                const postFilterStub = jest.fn<(val: number, idx: number) => void>();
                const postMapStub = jest.fn<(val: number, idx: number) => void>();
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
                const initialStub = jest.fn<(val: number, idx: number) => void>();
                const preFilterStub = jest.fn<(val: number, idx: number) => void>();
                const postFilterStub = jest.fn<(val: number, idx: number) => void>();
                const postMapStub = jest.fn<(val: number, idx: number) => void>();
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
                const initialStub = jest.fn<(val: number, idx: number) => void>();
                const preFilterStub = jest.fn<(val: number, idx: number) => void>();
                const postFilterStub = jest.fn<(val: number, idx: number) => void>();
                const postMapStub = jest.fn<(val: number, idx: number) => void>();
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
                const initialStub = jest.fn<(val: number, idx: number) => void>();
                const preFilterStub = jest.fn<(val: number, idx: number) => void>();
                const postFilterStub = jest.fn<(val: number, idx: number) => void>();
                const postMapStub = jest.fn<(val: number, idx: number) => void>();
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
                const initialStub = jest.fn<(val: number, idx: number) => void>();
                const preFilterStub = jest.fn<(val: number, idx: number) => void>();
                const postFilterStub = jest.fn<(val: number, idx: number) => void>();
                const postMapStub = jest.fn<(val: number, idx: number) => void>();
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
