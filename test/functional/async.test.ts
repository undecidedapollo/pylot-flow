import { flow } from "../../src/index";

describe("async library tests", function () {
    const origArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const resArr = [8, 12, 16];

    function asyncSource() {
        return async function* () {
            for (const val of origArr) {
                yield val;
            }
        };
    }

    describe("explicit pipe", function () {
        describe("fromArray", function () {
            it("should return proper sequence", async function () {
                const initialStub = jest.fn();
                const preFilterStub = jest.fn();
                const postFilterStub = jest.fn();
                const postMapStub = jest.fn();
                const res = await flow.async(asyncSource()).map((x) => x * 2).toArray();
                    // .fromArray(origArr)
                    // .pipe(tap(initialStub), skip(2))
                    // .pipe(tap(preFilterStub), filter((x) => x % 2 === 0), tap(postFilterStub))
                    // .pipe(map(x => x * 2), take(3), tap(postMapStub))
                    // .toArray();

                expect(res).toStrictEqual(resArr);

                // expect(initialStub).toHaveBeenCalledTimes(8);
                // expect(preFilterStub).toHaveBeenCalledTimes(6);
                // expect(postFilterStub).toHaveBeenCalledTimes(3);
                // expect(postMapStub).toHaveBeenCalledTimes(3);
            });
        });
    });
});