import { flow } from "#index.js";

describe("async library tests", function () {
    const origArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    function asyncSource<T>(origArr: T[]): () => AsyncGenerator<T, void, void> {
        return async function* () {
            for (const val of origArr) {
                yield val;
            }
        };
    }

    describe("explicit pipe", function () {
        describe("fromArray", function () {
            it("should return proper sequence", async function () {
                const res = await flow.fromAsyncGenerator(asyncSource(origArr)).map((x) => x * 2).toArray();
                expect(res).toStrictEqual(origArr.map((x) => x * 2));
            });

            it("should split strings", async function () {
                const res = await flow.fromAsyncGenerator(asyncSource(["ab\nc", "de\ng\n", "h"])).splitMerge("\n").toArray();
                expect(res).toStrictEqual(["ab", "cde", "g", "h"]);
            });
        });
    });
});