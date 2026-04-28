import { jest } from "@jest/globals";
import tap from "#operators/tap/index.js";

describe("tap", () => {
    const boolsArr = [true, false, true, false, true, true, false, false];
    const numArr = [1, 2, 3, 4, 5, 6, 7, 8];

    it("should return boolean items unchanged", () => {
        const stub = jest.fn((x: boolean) => !x);
        const res = Array.from(tap(stub)(boolsArr));
        expect(stub).toHaveBeenCalledTimes(8);
        expect(res).toHaveLength(8);
        expect(res).toEqual(boolsArr);
    });

    it("should return number items unchanged", () => {
        const stub = jest.fn((x: number) => x * 2);
        const res = Array.from(tap(stub)(numArr));
        expect(stub).toHaveBeenCalledTimes(8);
        expect(res).toHaveLength(8);
        expect(res).toEqual(numArr);
    });
});